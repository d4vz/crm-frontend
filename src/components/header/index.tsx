import authService from "@/services/auth"
import { toast } from "sonner"

import { ThemeButton } from "./theme-button"
import { UserButton } from "./user-button"

export const Header: React.FC = async () => {
  const user = await authService.me().catch(() => {
    toast.error("Erro ao buscar usuário")
    return null
  })

  return (
    <div className="flex min-h-16 w-full items-center justify-end border-b bg-background px-4">
      <UserButton user={user} />
      <ThemeButton />
    </div>
  )
}
