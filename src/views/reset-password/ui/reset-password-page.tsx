import { ResetPasswordForm } from "@/features/auth-by-email";

export function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <ResetPasswordForm />
    </div>
  );
}