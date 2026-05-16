import { Metadata } from "next";

import { ForgotPasswordPage } from "@/views/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />;
}
