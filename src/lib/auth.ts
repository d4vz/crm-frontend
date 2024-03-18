import { NextRequest, NextResponse } from "next/server"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"

const isServer = () => typeof window === "undefined"

const getAuth = async (request?: NextRequest) => {
  if (isServer()) {
    const { cookies } = await import("next/headers")
    return getCookie("auth", {
      req: request,
      cookies,
      path: "/",
    })
  }

  return getCookie("auth")
}

const setAuth = async (token: string) => {
  if (isServer()) {
    ;("use server")
    const { cookies } = await import("next/headers")
    return setCookie("auth", token, {
      cookies,
      path: "/",
    })
  }

  return setCookie("auth", token)
}

const isValidToken = (token: string) => {
  const decoded = jwtDecode(token)
  if (!decoded || !decoded?.exp) return false

  const now = new Date()
  const exp = new Date(decoded.exp * 1000)
  return now < exp
}

const clearAuth = async (req?: NextRequest, res?: NextResponse) => {
  if (isServer()) {
    const { cookies } = await import("next/headers")
    return deleteCookie("auth", {
      cookies,
      req,
      res,
      path: "/",
    })
  }

  return deleteCookie("auth")
}

export { clearAuth, getAuth, isValidToken, setAuth }
