import usersService from "@/services/users";
import { useMutation } from "@tanstack/react-query";


export default function useCreateUserMutation() {
  return useMutation({
    mutationFn: usersService.createUser,
  })
}