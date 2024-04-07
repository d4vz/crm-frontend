"use client"

import { useRouter } from "next/navigation"
import { DialogTrigger } from "@radix-ui/react-dialog"
import _ from "lodash"
import { Edit, Eye, File } from "lucide-react"
import { toast } from "sonner"

import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserForm } from "@/app/(logged)/(users)/users/(root)/components/user-form"

import { DeleteUser } from "./delete-user"

interface UsersTableMenuProps {
  user: User
}

export const UsersTableMenu: React.FC<UsersTableMenuProps> = ({ user }) => {
  const router = useRouter()

  const handleCopyId = () => {
    navigator.clipboard.writeText(_.get(user, "_id"))
    toast.success("ID copiado")
  }

  const handleViewUser = () => {
    router.push(`/users/${_.get(user, "_id")}`)
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="fit" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <UserForm edit defaultValues={user} />
      </Dialog>
      <DeleteUser userId={_.get(user, "_id")} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="fit" variant="outline" onClick={handleCopyId}>
              <File className="h-4 w-4 text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copiar ID</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button size="fit" variant="outline" onClick={handleViewUser}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  )
}
