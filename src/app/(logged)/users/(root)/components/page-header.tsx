"use client"

import { File, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { UserForm } from "@/app/(logged)/users/(root)/components/user-form"

export const PageHeader: React.FC = () => {
  return (
    <div className="mb-4 flex w-full items-center justify-between border-b bg-background p-4">
      <h1 className="text-lg font-semibold">Usuários</h1>
      <div className="flex items-center  gap-4">
        <Button variant="outline">
          <File className="mr-2 h-4 w-4" />
          Exportar
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <User className="mr-2 h-4 w-4" />
              Adicionar usuário
            </Button>
          </DialogTrigger>
          <UserForm />
        </Dialog>
      </div>
    </div>
  )
}
