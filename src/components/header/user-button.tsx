"use client"

import { useRouter } from "next/navigation"
import { ChevronDown, LogOut, User2 } from "lucide-react"

import { User } from "@/types/user"
import { clearAuth } from "@/lib/auth"

import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface UserButtonProps {
  user: User
}

export const UserButton: React.FC<UserButtonProps> = ({ user }) => {
  const letters = user?.name.slice(0, 2).toUpperCase()

  const router = useRouter()

  const handleLogout = async () => {
    await clearAuth()
    router.push("/sign-in")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-sm px-4 ">
          <div className="flex flex-col justify-end text-end">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
          <Avatar>
            <AvatarFallback>{letters}</AvatarFallback>
          </Avatar>
          <ChevronDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-48">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User2 className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
