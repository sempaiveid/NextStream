"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { resendCodeAction } from "@/features/auth-by-email/actions/resend-code";
import { verifyEmailAction } from "@/features/auth-by-email/actions/verify-email";
import { Button, FormInput, Spinner } from "@/shared/ui";

const COOLDOWN = 30;

const schema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});

type FormValues = z.infer<typeof schema>;

export function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();

  const [countdown, setCountdown] = useState(COOLDOWN);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
    mode: "onTouched",
  });

  const { mutate: onVerify, isPending: isVerifying } = useMutation({
    mutationFn: async ({ code }: FormValues) => {
      const result = await verifyEmailAction({ email, code });
      if (result.error) throw new Error(result.error);

      const signInResult = await signIn("credentials", {
        autoLoginToken: result.autoLoginToken,
        redirect: false,
      });
      if (signInResult?.error) throw new Error("login_failed");
    },
    onError: (error: Error) => {
      if (error.message === "login_failed") {
        router.push("/login");
        return;
      }
      form.setError("code", { message: error.message });
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const { mutate: onResend, isPending: isResending, error: resendError } = useMutation({
    mutationFn: async () => {
      const result = await resendCodeAction(email);
      if (result.error) throw new Error(result.error);
    },
    onSuccess: () => {
      setCountdown(COOLDOWN);
      clearInterval(intervalRef.current!);
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
  });

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Check your email</h1>
          <p className="text-gray-400 mt-1">
            We sent a 6-digit code to{" "}
            <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={form.handleSubmit((data) => onVerify(data))} className="space-y-4">
          <FormInput
            name="code"
            control={form.control}
            label="Verification code"
            placeholder="000000"
            maxLength={6}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full mt-2"
            disabled={!form.formState.isValid || isVerifying}
          >
            {isVerifying && <Spinner />}
            Verify
          </Button>
        </form>

        <div className="mt-6 text-center">
          {resendError && (
            <p className="text-sm text-red-400 mb-3">{resendError.message}</p>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onResend()}
            disabled={countdown > 0 || isResending}
            className="text-sm text-gray-400 hover:text-white disabled:opacity-50"
          >
            {isResending && <Spinner />}
            {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400">
          Wrong email?{" "}
          <Link href="/register" className="text-white font-semibold hover:underline">
            Register again
          </Link>
        </p>
      </div>
    </div>
  );
}
