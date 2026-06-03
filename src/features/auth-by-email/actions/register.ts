"use server";
import { randomInt } from "crypto";

import bcrypt from "bcryptjs";

import { registerSchema } from "../model/registerSchema";
import { RegisterFormValues } from "../model/types";

import { transporter } from "@/shared/lib/mailer";
import { prisma } from "@/shared/lib/prisma";

export async function registerAction(data: RegisterFormValues) {
  try {
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) return { error: "Invalid data" };

    const { email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "User with this email already exists" };

    await prisma.pendingUser.deleteMany({ where: { email } });

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = randomInt(100000, 999999).toString();

    await prisma.pendingUser.create({
      data: {
        email,
        hashedPassword,
        token: otp,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    await transporter.sendMail({
      from: `"NextStream" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your verification code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #e50914;">NextStream</h1>
          <h2>Verify Your Email</h2>
          <p>Hi ${email},</p>
          <p>Enter this code to complete your registration:</p>
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #e50914; margin: 24px 0;">${otp}</div>
          <p style="color: #666; font-size: 14px;">This code expires in <strong>15 minutes</strong>.</p>
          <p style="color: #666; font-size: 14px;">If you did not create an account, ignore this email.</p>
        </div>
      `,
    });

    return { success: true, email };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
