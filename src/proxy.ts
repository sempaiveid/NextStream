import { NextRequest, NextResponse } from "next/server";

import { locales, defaultLocale } from "@/shared/config";
import { auth } from "@/shared/lib/auth";

const authRoutes = ["/login", "/register"];
const publicRoutes = ["/"];

export default auth((req: NextRequest & { auth: unknown }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session;

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url),
    );
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)" ],
};