import usersService from "@/services/users"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersService.createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "all",
      })
    },
  })
}
