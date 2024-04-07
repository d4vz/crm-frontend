import usersService from "@/services/users"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useDeleteUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersService.deleteUser,
    mutationKey: ["deleteUser"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
        refetchType: "all",
      })
    },
  })
}
