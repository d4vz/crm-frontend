import { NextRequest } from "next/server"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"

const isServer = () => typeof window === "undefined"

const getAuth = async (request?: NextRequest) => {
  if (isServer()) {
    const { cookies } = await import("next/headers")
    return getCookie("auth", {
      req: request,
      cookies,
    })
  }

  return getCookie("auth")
}

const setAuth = async (token: string) => {
  if (isServer()) {
    const { cookies } = await import("next/headers")
    return setCookie("auth", token, {
      cookies,
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

const clearAuth = async () => {
  if (isServer()) {
    const { cookies } = await import("next/headers")
    return deleteCookie("auth", {
      cookies,
    })
  }

  return deleteCookie("auth")
}

const getCurrentUser = async () => {
  const token = await getAuth()
  if (!token) return null
  const decoded = jwtDecode(token)
  return decoded
}

export { clearAuth, getAuth, getCurrentUser, isValidToken, setAuth }
