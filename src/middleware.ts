import type { NextRequest } from "next/server"

import { PUBLIC_ROUTES } from "./constants"
import { getAuth } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const currentUser = await getAuth(request)

  console.log("middleware", currentUser)

  if (currentUser && request.nextUrl.pathname.startsWith("/sign-in")) {
    return Response.redirect(new URL("/", request.url))
  }

  if (!currentUser && !PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/sign-in", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
