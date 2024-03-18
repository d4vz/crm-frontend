export interface CreateUserPayload {
  name: string
  email: string
  password: string
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {
  _id: string
}
