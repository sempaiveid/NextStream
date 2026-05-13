"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerSchema } from "../model/registerSchema";
import type { RegisterFormValues } from "../model/types";

import { Button, FieldGroup, FormInput } from "@/shared/ui";

export function SignInForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
          placeholder="Enter your password"
        />
        <FormInput
          name="confirmPassword"
          control={form.control}
          label="Confirm your password"
          type="password"
          placeholder="Confirm your password"
        />
      </FieldGroup>

      <Button
        type="submit"
        className="w-full mt-4"
        disabled={!form.formState.isValid || form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Loading..." : "Register"}
      </Button>
    </form>
  );
}
