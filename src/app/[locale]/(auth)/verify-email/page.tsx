import { Metadata } from "next";
import { Suspense } from "react";

import { PageLoader } from "@/shared/ui/page-loader";
import { VerifyEmailPage } from "@/views/verify-email";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function VerifyEmailRoute() {
  return (
    <Suspense fallback={<PageLoader />}>
      <VerifyEmailPage />
    </Suspense>
  );
}