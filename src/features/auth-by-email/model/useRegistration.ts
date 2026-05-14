"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import { registerUser } from "../api/register";

import type { RegisterFormValues } from "./types";

export function useRegistration() {
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
      console.error("Registration error:", error.message);
    },
  });
  return {
    onRegister,
    isPending,
    error,
  };
}
