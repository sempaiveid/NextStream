"use client";
import { AppProgressBar } from "next-nprogress-bar";

export function NavigationProgress() {
  return (
    <AppProgressBar
      height="3px"
      color="#e50914"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
