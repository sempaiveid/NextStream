import { Metadata } from "next";
import { Suspense } from "react";

import { ResetPasswordPage } from "@/views/reset-password";


export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordRoute() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}