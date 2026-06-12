"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle, Loader2, ShoppingCart } from "lucide-react";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image?: string;
  theme?: { color?: string };
  prefill?: { name?: string; email?: string; contact?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void; escape?: boolean };
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayButtonProps {
  productTitle: string;
  priceDisplay: string;
  amountPaise: number;
  productSlug: string;
}

type Status = "idle" | "creating" | "verifying" | "success" | "error";

export function RazorpayButton({
  productTitle,
  priceDisplay,
  amountPaise,
  productSlug,
}: RazorpayButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const scriptReady = useRef(false);

  useEffect(() => {
    if (document.getElementById("rzp-checkout-js")) {
      scriptReady.current = true;
      return;
    }
    const script = document.createElement("script");
    script.id = "rzp-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      scriptReady.current = true;
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay checkout script");
    };
    document.body.appendChild(script);
  }, []);

  async function handlePayment() {
    if (!scriptReady.current) {
      setStatus("error");
      setErrorMsg("Checkout script not yet loaded — please try again.");
      return;
    }

    setStatus("creating");
    setErrorMsg("");

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          receipt: `mpt_${productSlug}_${Date.now()}`,
        }),
      });

      if (!orderRes.ok) {
        const { error } = await orderRes.json();
        throw new Error(error ?? "Could not create order");
      }

      const { order_id, amount, currency } = await orderRes.json();

      setStatus("idle");

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: Number(amount),
        currency,
        order_id,
        name: "Ms Paul Therapies",
        description: productTitle,
        image: "/favicon.ico",
        theme: { color: "#6B8F6B" },
        handler: async (response: RazorpaySuccessResponse) => {
          setStatus("verifying");
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (verifyRes.ok) {
            setStatus("success");
          } else {
            const { error } = await verifyRes.json().catch(() => ({}));
            setStatus("error");
            setErrorMsg(
              error ?? "Payment verification failed. Please email mspaultherapies@gmail.com with your payment ID.",
            );
          }
        },
        modal: {
          escape: true,
          ondismiss: () => {
            if (status !== "success") setStatus("idle");
          },
        },
      });

      rzp.open();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4">
        <CheckCircle className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-green-700">Payment successful!</p>
          <p className="mt-0.5 text-xs text-green-600">
            You will receive access details by email. For any questions, reach us at{" "}
            <a
              href="mailto:mspaultherapies@gmail.com"
              className="underline hover:no-underline"
            >
              mspaultherapies@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const isLoading = status === "creating" || status === "verifying";
  const loadingLabel = status === "verifying" ? "Verifying payment…" : "Preparing checkout…";

  return (
    <div className="mt-6 space-y-2">
      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingLabel}
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            Buy Now · {priceDisplay}
          </>
        )}
      </button>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
