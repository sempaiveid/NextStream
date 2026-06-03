import { NextRequest, NextResponse } from "next/server";
import NextAuth, { type Session } from "next-auth";

import { locales, defaultLocale } from "@/shared/config";
import authConfig from "@/shared/lib/auth/auth.config";

const { auth } = NextAuth(authConfig);

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];
const publicRoutes = ["/", "/movie"];

export default auth((req: NextRequest & { auth: Session | null }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session;

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameLocale) {
    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, req.url);
    redirectUrl.search = req.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

  const isAuthRoute = authRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${pathnameLocale}`, req.url));
  }

  if (!isLoggedIn && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${pathnameLocale}/login`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
