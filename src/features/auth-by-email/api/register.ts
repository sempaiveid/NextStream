import type { RegisterFormValues } from "../model/types";

import { api } from "@/shared/api/axios";

export async function registerUser(data: RegisterFormValues) {
  const response = await api.post("/auth/register", data);
  return response.data;
}