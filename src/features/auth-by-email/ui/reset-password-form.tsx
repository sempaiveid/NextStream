"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { resetPasswordAction } from "../actions/reset-password";
import { resetPasswordSchema } from "../model/resetPasswordSchema";
import { ResetPasswordValues } from "../model/types";

import { Button, FormInput, Spinner } from "@/shared/ui";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const form = useForm<ResetPasswordValues>({
     resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: token ?? "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ResetPasswordValues) => resetPasswordAction(data),
    onSuccess: (result) => {
      if (result.error) {
        form.setError("root", { message: result.error });
        return;
      }
      router.push("/login?reset=success");
    },
    onError: (error) => form.setError("root", { message: error.message }),
  });

  if (!token) {
    return (
      <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Invalid Link</h1>
        <p className="text-gray-400">
          This reset link is invalid or has expired.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-gray-400 mt-1">Enter your new password</p>
      </div>

      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-4"
      >
        <FormInput
          name="password"
          control={form.control}
          label="New Password"
          type="password"
          placeholder="Enter new password"
        />
        <FormInput
          name="confirmPassword"
          control={form.control}
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
        />

        {form.formState.errors.root && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending && <Spinner />}
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
