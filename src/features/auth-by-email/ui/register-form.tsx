"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { registerSchema } from "../model/registerSchema";
import { RegisterFormValues } from "../model/types";
import { useRegistration } from "../model/useRegistration";

import { GoogleButton } from "./google-button";

import { Button, FieldGroup, FormInput, Spinner } from "@/shared/ui";

export function RegisterForm() {
  const [isOAuthPending, setIsOAuthPending] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const { onRegister, isPending } = useRegistration(form);

  const onSubmit = (values: RegisterFormValues) => {
    onRegister({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <div className="w-full max-w-md bg-black/75 backdrop-blur-sm rounded-lg p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-gray-400 mt-1">
          Join NextStream and start streaming today
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup className="gap-4">
          <FormInput
            name="email"
            control={form.control}
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormInput
            name="password"
            control={form.control}
            label="Password"
            type="password"
            placeholder="Create a password"
          />
          <FormInput
            name="confirmPassword"
            control={form.control}
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />
        </FieldGroup>


        {form.formState.errors.root && (
          <p className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
          disabled={
            !form.formState.isValid || form.formState.isSubmitting || isPending
          }
        >
          {isPending && <Spinner />}
          Create Account
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm text-gray-400">or</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <GoogleButton
        onPendingChange={setIsOAuthPending}
        disabled={isOAuthPending}
      />

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-white font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
