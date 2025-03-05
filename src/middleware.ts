import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminCookie = request.cookies.get("manager")?.value;
  const userCookie = request.cookies.get("employee")?.value;

  const publicRoutes = ["/signup", "/login", "/"];

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    if (adminCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else if (userCookie) {
      return NextResponse.redirect(new URL("/tasks", request.nextUrl));
    }

    return NextResponse.next();
  }
  if (!adminCookie && !userCookie) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (adminCookie && pathname !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (userCookie && pathname !== "/tasks") {
    return NextResponse.redirect(new URL("/tasks", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/tasks", "/signup", "/login", "/"],
};
