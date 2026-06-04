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
    console.error("Browse error:", error.message, error.digest);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center text-white gap-4">
      <p className="text-red-400 text-sm font-mono max-w-xl text-center break-all">
        {error.message || "Unknown error"}
        {error.digest && <span className="block text-gray-500 text-xs mt-1">digest: {error.digest}</span>}
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-brand rounded text-sm font-semibold cursor-pointer hover:bg-brand-hover transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
