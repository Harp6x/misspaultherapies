import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay credentials not configured" },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt } = body as {
      amount: number;
      currency?: string;
      receipt?: string;
    };

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least ₹1 (100 paise)" },
        { status: 400 },
      );
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt: receipt ?? `rcpt_${Date.now()}`,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    console.error("Razorpay create-order error:", err);
    const message = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
