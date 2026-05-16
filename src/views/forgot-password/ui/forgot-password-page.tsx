import { ForgotPasswordForm } from "@/features/auth-by-email";

export function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <ForgotPasswordForm />
    </div>
  );
}