"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { loginSchema } from "../model/loginSchema";
import type { LoginFormValues } from "../model/types";
import { useLogin } from "../model/useLogin";

import { GoogleButton } from "./google-button";

import { Button, FieldGroup, FormInput, Spinner } from "@/shared/ui";

export function LoginForm() {
  const [isOAuthPending, setIsOAuthPending] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });
  const { onLogin, isPending,  } = useLogin(form);

  function handleLogin(data: LoginFormValues) {
    onLogin(data);
  }

  return (
    <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-gray-400 mt-1">Sign in to your NextStream account</p>
      </div>

      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FieldGroup className="gap-4">
          <FormInput
            name="email"
            control={form.control}
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <FormInput
            name="password"
            control={form.control}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-400 hover:text-white"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending && <Spinner />}
          Sign In
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm text-gray-400">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <GoogleButton
        disabled={isOAuthPending}
        onPendingChange={setIsOAuthPending}
      />

      <p className="mt-6 text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-white font-semibold hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
