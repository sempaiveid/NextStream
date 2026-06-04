"use client";
import { AppProgressBar } from "next-nprogress-bar";
import { Suspense } from "react";

function ProgressBar() {
  return (
    <AppProgressBar
      height="3px"
      color="#e50914"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}

export function NavigationProgress() {
  return (
    <Suspense>
      <ProgressBar />
    </Suspense>
  );
}
