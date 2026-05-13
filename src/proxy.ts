import { NextRequest, NextResponse } from "next/server";

import { locales, defaultLocale } from "@/shared/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  // 2. AUTH (добавим когда настроим Auth.js)
  // const session = await getSession()
  // if (!session && pathname.includes('/my-list')) {
  //   redirect to sign-in
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
