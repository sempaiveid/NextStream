"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UseFormReturn } from "react-hook-form";

import type { LoginFormValues } from "./types";

export function useLogin(form: UseFormReturn<LoginFormValues>) {
  const router = useRouter();
  const {
    mutate: onLogin,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error("Invalid email or password");
      }
      return result;
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
    onError: (error: Error) => {
      form.setError("password", { message: error.message });
    },
  });
  return { onLogin, isPending, error, isSuccess };
}
