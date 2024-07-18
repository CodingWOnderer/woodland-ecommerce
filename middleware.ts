import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isSuccessPath = pathname.startsWith("/success");

  if (
    (!token && pathname === "/orders") ||
    (!token && pathname === "/profile") ||
    (!token && pathname === "/shipping") ||
    (!token && isSuccessPath)
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/orders", "/profile", "/shipping", "/success/:path*"],
};
