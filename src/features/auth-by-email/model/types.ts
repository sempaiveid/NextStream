import z from "zod";

import { loginSchema } from "./loginSchema";
import { registerSchema } from "./registerSchema";
import { resetPasswordSchema } from "./resetPasswordSchema";



export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

