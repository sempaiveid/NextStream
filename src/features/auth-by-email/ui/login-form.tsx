"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema } from "../model/loginSchema";
import { LoginFormValues } from "../model/types";

import { Button, FieldGroup, FormInput } from "@/shared/ui";

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  function handleLogin(data: LoginFormValues) {
    console.log(data);
  }
  return (
    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
      <FieldGroup>
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
          placeholder="Enter you password"
          type="password"
        />
      </FieldGroup>
  <Button type="submit" className="w-full mt-4">
  Login
</Button>
    </form>
  );
}
