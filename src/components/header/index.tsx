import authService from "@/services/auth"

import { UserButton } from "./user-button"

export const Header: React.FC = async () => {
  const user = await authService.me()

  return (
    <div className="flex min-h-16 w-full items-center justify-end border-b bg-background px-4">
      <UserButton user={user} />
    </div>
  )
}
