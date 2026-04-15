import { NextRequest, NextResponse } from "next/server";

const ALLOWED_COUNTRIES = ["US", "PR"];

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const country = request.headers.get("x-vercel-ip-country") || "UNKNOWN";

  if (!ALLOWED_COUNTRIES.includes(country)) {
    return NextResponse.rewrite(new URL("/blocked", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
