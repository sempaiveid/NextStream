import z from "zod";

import { loginSchema } from "./loginSchema";
import { registerSchema } from "./registerSchema";


export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
