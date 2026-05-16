"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { UseFormReturn } from "react-hook-form";

import { registerUser } from "../api/register";

import type { RegisterFormValues } from "./types";

export function useRegistration(form :UseFormReturn<RegisterFormValues>) {
  const {
    mutate: onRegister,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: RegisterFormValues) => registerUser(data),
    onSuccess: async (_, variables) => {
      await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        callbackUrl: "/",
      });
    },
    onError: (error: Error) => {
      form.setError("confirmPassword",{message:error.message})
    },
  });
  return {
    onRegister,
    isPending,
    error,
  };
}
