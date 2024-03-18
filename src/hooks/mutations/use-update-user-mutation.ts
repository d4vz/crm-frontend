import usersService from "@/services/users"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersService.updateUser,
    mutationKey: ["updateUser"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })
}
