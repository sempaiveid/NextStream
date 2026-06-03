"use server";
import { randomBytes } from "crypto";

import { prisma } from "@/shared/lib/prisma";

export async function verifyEmailAction({
  email,
  code,
}: {
  email: string;
  code: string;
}) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const pendingUser = await tx.pendingUser.findUnique({ where: { email } });

      if (!pendingUser) return { error: "Invalid or expired code" };

      if (pendingUser.expiresAt < new Date()) {
        await tx.pendingUser.delete({ where: { email } });
        return { error: "Code has expired. Please register again." };
      }

      if (pendingUser.token !== code) return { error: "Incorrect code" };

      const existingUser = await tx.user.findUnique({ where: { email } });
      if (existingUser) return { error: "User with this email already exists" };

      const user = await tx.user.create({
        data: {
          email: pendingUser.email,
          password: pendingUser.hashedPassword,
          emailVerified: new Date(),
        },
      });

      const autoLoginToken = randomBytes(32).toString("hex");
      await tx.autoLoginToken.create({
        data: {
          token: autoLoginToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 60 * 1000),
        },
      });

      await tx.pendingUser.delete({ where: { email } });

      return { success: true as const, autoLoginToken };
    });

    return result;
  } catch (err) {
    console.error("Verify email error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
