import { File, User } from "lucide-react"

import { Button } from "@/components/ui/button"

import { UsersTable } from "./components/users-table"

export default function UsersPage() {
  return (
    <div>
      <div className="mb-4 flex w-full items-center justify-between border-b bg-background p-4">
        <h1 className="text-lg font-semibold">Usuários</h1>
        <div className="flex items-center  gap-4">
          <Button variant="outline">
            <File className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <User className="mr-2 h-4 w-4" />
            Adicionar usuário
          </Button>
        </div>
      </div>
      <UsersTable />
    </div>
  )
}
