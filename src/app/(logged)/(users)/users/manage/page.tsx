import usersService from "@/services/users"

import { UserForm } from "@/components/forms/user-form"

interface ManageUsersPageProps {
  searchParams?: { [key: string]: string }
}

export default async function ManageUsersPage({
  searchParams,
}: ManageUsersPageProps) {
  const hasUser = searchParams?.hasOwnProperty("user")
  let children = <UserForm />

  if (hasUser) {
    const userId = searchParams?.user
    const user = await usersService.getUser(userId!)
    children = <UserForm defaultValues={user} edit />
  }

  return <div className="h-full w-full">{children}</div>
}
