import { redirect } from "next/navigation"
import axios from "axios"

import { env } from "@/env.mjs"

import { getAuth } from "./auth"

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

export const localApi = axios.create({
  baseURL: `${env.NEXT_PUBLIC_APP_URL}/api`,
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
      if (typeof window !== "undefined") {
        window.location.href = "/sign-out"
      } else {
        redirect("/sign-out")
      }
    }

    return Promise.reject(error)
  }
)

export { api }
