"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

import { registerAction } from "../actions/register";

import type { RegisterFormValues } from "./types";

export function useRegistration(form: UseFormReturn<RegisterFormValues>) {
  const router = useRouter();

  const { mutate: onRegister, isPending } = useMutation({
    mutationFn: (data: RegisterFormValues) => registerAction(data),
    onSuccess: (result) => {
      if (result.error) {
        form.setError("root", { message: result.error });
        return;
      }
      router.push(`/verify-email?email=${encodeURIComponent(result.email!)}`);
    },
    onError: () => {
      form.setError("root", { message: "Something went wrong. Please try again." });
    },
  });

  return { onRegister, isPending };
}
