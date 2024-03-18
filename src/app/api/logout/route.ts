"use server"

import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const deleteCookie = (
  request: NextRequest,
  response: NextResponse,
  cookie: string
) => {
  const cookies = request.headers.get("cookie")
  if (cookies) {
    const cookieValue = cookies
      .split(";")
      .find((c) => c.trim().startsWith(`${cookie}=`))
    if (cookieValue) {
      response.headers.set("Set-Cookie", `${cookieValue}; Max-Age=0`)
    }
  }
}

const POST = async (req: NextRequest) => {
  const response = new NextResponse()
  cookies().delete("auth")
  deleteCookie(req, response, "auth")
  return response
}

export { POST }
