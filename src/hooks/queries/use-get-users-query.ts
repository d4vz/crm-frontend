import usersService from "@/services/users"
import { useQuery } from "@tanstack/react-query"

export default function useGetUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersService.getUsers,
  })
}
