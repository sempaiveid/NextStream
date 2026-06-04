"use client";
import { useEffect } from "react";

export default function MovieError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Movie page error:", error.message, error.digest);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center text-white gap-6">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-gray-400 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-2.5 bg-brand hover:bg-brand-hover rounded font-semibold text-sm transition-colors cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
