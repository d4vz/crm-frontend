"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { toast } from "sonner"

import { errorHandling } from "@/lib/error-handler"
import useDeleteUserMutation from "@/hooks/mutations/use-delete-user-mutation"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface DeleteUserProps {
  userId: string
}

export const DeleteUser: React.FC<DeleteUserProps> = ({ userId }) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync, isPending } = useDeleteUserMutation()

  const handleDelete = async () => {
    try {
      await mutateAsync(userId)
      toast.success("Usuário excluído com sucesso")
      setOpen(false)
    } catch (error) {
      const { status } = errorHandling(error)
      if (status === 404) {
        toast.error("Usuário não encontrado")
        return
      }
      toast.error("Erro ao excluir usuário")
    }
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button size="fit" variant="outline">
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá excluir permanentemente
            esse usuário.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button loading={isPending} onClick={handleDelete}>
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
