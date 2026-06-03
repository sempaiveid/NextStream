import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "../prisma";

import authConfig from "./auth.config";
import { loginSchema } from "./validations/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const existing = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (existing && !existing.emailVerified) {
          await prisma.user.update({
            where: { id: existing.id },
            data: { emailVerified: new Date() },
          });
        }
      }
      return true;
    },
  },
  providers: [
    ...authConfig.providers.filter((p) => p.id !== "credentials"),
    Credentials({
      credentials: {
        email: {},
        password: {},
        autoLoginToken: {},
      },
      async authorize(credentials) {
        // ветка автологина после верификации email
        if (credentials?.autoLoginToken) {
          const record = await prisma.autoLoginToken.findUnique({
            where: { token: credentials.autoLoginToken as string },
            include: { user: true },
          });
          if (!record) return null;
          if (record.expiresAt < new Date()) {
            await prisma.autoLoginToken.delete({ where: { id: record.id } }).catch(() => {});
            return null;
          }
          await prisma.autoLoginToken.delete({ where: { id: record.id } });
          return record.user;
        }

        // обычный вход по email + password
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password || !user.emailVerified) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
});
