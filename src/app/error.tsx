"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold text-brown">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-brown-light">
        We&apos;re sorry — an unexpected error occurred. Please try again, or
        contact us if the problem persists.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-sage px-6 py-3 font-semibold text-white transition-colors hover:bg-sage-dark"
      >
        Try Again
      </button>
    </div>
  );
}
