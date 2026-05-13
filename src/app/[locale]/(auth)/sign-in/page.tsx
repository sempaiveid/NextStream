import { SignInForm } from "@/features/auth-by-email/ui";

export default function SingInPage() {
  return (
    <div className="bg-black/75 backdrop-blur-sm rounded-lg p-8 md:p-12">
      <SignInForm />
    </div>
  );
}
