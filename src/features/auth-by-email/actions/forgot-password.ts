"use server";

import { randomBytes } from "crypto";

import { transporter } from "@/shared/lib/mailer";
import { resetPasswordTemplate } from "@/shared/lib/mailer/templates/reset-password";
import { prisma } from "@/shared/lib/prisma";

export async function forgotPasswordAction(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: true };
    }

    if (!user.password) {
      return {
        error: "This account uses Google Sign In. Please sign in with Google.",
      };
    }

    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    const token = randomBytes(32).toString("hex");

    await prisma.passwordResetToken.create({
      data: {
        token,
        email,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"NextStream" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: resetPasswordTemplate(email, resetLink),
    });

    return { success: true };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
