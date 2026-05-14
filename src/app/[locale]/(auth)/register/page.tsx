import { Metadata } from "next";

import { RegisterPage } from "@/views/register";



export const metadata: Metadata = {
  title: "Create Account | NextStream",
  description: "Join NextStream and start streaming today",
};

export default function RegisterRoute() {
  return <RegisterPage />;
}
