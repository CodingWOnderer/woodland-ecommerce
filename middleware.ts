import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (
    (!token && pathname === "/orders") ||
    (!token && pathname === "/profile")
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/orders", "/profile"],
};
