import { AxiosError } from "axios"

export const errorHandling = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data.message || "Erro desconhecido",
      status: error.response?.status || 500,
    }
  }

  return {
    message: "Algo deu errado, por favor entre em contato com o suporte",
    status: 500,
  }
}
