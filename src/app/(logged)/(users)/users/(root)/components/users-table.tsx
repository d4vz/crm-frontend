"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useGetUsersQuery from "@/hooks/queries/use-get-users-query"
import { formatDate } from "@/lib/format"
import { User } from "@/types/user"

const columns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "createdAt",
    accessorFn: (row) => formatDate(new Date(row.createdAt), "YYYY-MM-DD"),
    header: "Criado em",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const UsersTable: React.FC = () => {
  const { data } = useGetUsersQuery()

  return (
    <div className="flex-1 px-4">
      <DataTable columns={columns} data={data || []} />
    </div>
  )
}
