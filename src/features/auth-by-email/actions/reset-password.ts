"use server";

import bcrypt from "bcryptjs";

import { resetPasswordSchema } from "../model/resetPasswordSchema";
import { ResetPasswordValues } from "../model/types";

import { prisma } from "@/shared/lib/prisma";

export async function resetPasswordAction(data: ResetPasswordValues) {
  try {
    const parsed = resetPasswordSchema.safeParse(data);
    if (!parsed.success) {
      return { error: "Invalid data" };
    }
    const { token, password } = parsed.data;

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!resetToken) {
      return { error: "Invalid or expired reset link" };
    }
    if (resetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { token } });
      return { error: "Reset link has expired. Please request a new one." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { email: resetToken.email },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({ where: { token } });

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
