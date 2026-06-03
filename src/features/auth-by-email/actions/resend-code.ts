"use server";
import { randomInt } from "crypto";

import { transporter } from "@/shared/lib/mailer";
import { prisma } from "@/shared/lib/prisma";

const COOLDOWN_MS = 30 * 1000;
const OTP_TTL_MS = 15 * 60 * 1000;

export async function resendCodeAction(email: string) {
  try {
    const pendingUser = await prisma.pendingUser.findUnique({ where: { email } });

    if (!pendingUser) return { error: "No pending registration found for this email" };

    const sentAt = pendingUser.expiresAt.getTime() - OTP_TTL_MS;
    const cooldownEndsAt = sentAt + COOLDOWN_MS;
    if (Date.now() < cooldownEndsAt) {
      const secondsLeft = Math.ceil((cooldownEndsAt - Date.now()) / 1000);
      return { error: `Please wait ${secondsLeft}s before requesting a new code` };
    }

    const otp = randomInt(100000, 999999).toString();

    await prisma.pendingUser.update({
      where: { email },
      data: {
        token: otp,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    });

    await transporter.sendMail({
      from: `"NextStream" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your new verification code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #e50914;">NextStream</h1>
          <h2>New Verification Code</h2>
          <p>Here is your new code:</p>
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #e50914; margin: 24px 0;">${otp}</div>
          <p style="color: #666; font-size: 14px;">This code expires in <strong>15 minutes</strong>.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Resend code error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
