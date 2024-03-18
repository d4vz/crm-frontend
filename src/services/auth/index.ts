import { User } from "@/types/user"
import { api } from "@/lib/api"

import { LoginPayload, LoginResponse } from "./types"

class AuthService {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", payload)
    return data
  }

  async me(): Promise<User> {
    const { data } = await api.get("/auth/me")
    return data
  }
}

const authService = new AuthService()

export default authService
