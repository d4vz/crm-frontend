"use client"

import { ColumnDef } from "@tanstack/react-table"

import { User } from "@/types/user"
import { formatDate } from "@/lib/format"
import useGetUsersQuery from "@/hooks/queries/use-get-users-query"
import { DataTable } from "@/components/ui/data-table"

import { UsersTableMenu } from "./users-table-menu"

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
      return <UsersTableMenu user={user} />
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
