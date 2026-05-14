import { Metadata } from "next";

import { LoginPage } from "@/views/login/ui/login-page";



export const metadata: Metadata = {
  title: "Sign In | NextStream",
  description: "Sign in to your NextStream account",
};

export default function LoginRoute() {
  return <LoginPage />;
}
