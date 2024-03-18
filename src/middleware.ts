import type { NextRequest } from "next/server"

import { getAuth } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const currentUser = await getAuth(request)

  console.log("currentUser", currentUser)

  if (currentUser && request.nextUrl.pathname.startsWith("/sign-in")) {
    return Response.redirect(new URL("/", request.url))
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/sign-in")) {
    return Response.redirect(new URL("/sign-in", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
