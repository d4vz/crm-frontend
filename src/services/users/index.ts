import { User } from "@/types/user"
import { api } from "@/lib/api"

import { CreateUserPayload, UpdateUserPayload } from "./types"

class UsersService {
  async createUser(userData: CreateUserPayload) {
    const { data } = await api.post("/users", userData)
    return data
  }

  async updateUser(userData: UpdateUserPayload) {
    const { data } = await api.put("/users", userData)
    return data
  }

  async deleteUser(userId: string) {
    await api.delete(`/users/${userId}`)
  }

  async getUser(userId: string) {
    const { data } = await api.get(`/users/${userId}`)
    return data
  }

  async getUsers(): Promise<User[]> {
    const { data } = await api.get("/users")
    return data
  }
}

const usersService = new UsersService()

export default usersService
