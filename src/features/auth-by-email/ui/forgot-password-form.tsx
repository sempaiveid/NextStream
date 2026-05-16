"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { forgotPasswordAction } from "../actions/forgot-password";

import { Button, FormInput, Spinner } from "@/shared/ui";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => forgotPasswordAction(email),
    onSuccess: (result) => {
      if (result.error) {
        form.setError("root", { message: result.error });
        return;
      }
      setIsSuccess(true);
    },
    onError: (error) => form.setError("root", { message: error.message }),
  });

  if (isSuccess) {
    return (
      <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Check your email</h1>
        <p className="text-gray-400">
          If an account exists for that email, we sent a password reset link.
          Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
        <p className="text-gray-400 mt-1">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit((data) => mutate(data.email))}
        className="space-y-4"
      >
        <FormInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        {form.formState.errors.root && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={
            !form.formState.isValid || form.formState.isSubmitting || isPending
          }
        >
          {isPending && <Spinner />}
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
