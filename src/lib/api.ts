import { redirect } from "next/navigation"
import axios from "axios"

import { env } from "@/env.mjs"

import { clearAuth, getAuth } from "./auth"

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config) => {
  const token = await getAuth()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error?.response?.status === 401) {
      clearAuth()
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in"
      } else {
        redirect("/sign-in")
      }
    }

    return Promise.reject(error)
  }
)

export { api }
