"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { setAuth } from "@/lib/auth"
import useLoginMutation from "@/hooks/mutations/use-login-mutation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const loginSchema = z.object({
  email: z.string().email("Insira um email válido").min(5, {
    message: "O email deve ter no mínimo 5 caracteres",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
})

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
}

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const { mutateAsync, isPending } = useLoginMutation()

  const methods = useForm<LoginFormValues>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  })

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const { token } = await mutateAsync(data)
      if (token) await setAuth(token)
      toast.success("Bem-vindo de volta!")
      router.push("/sign-in")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao entrar no sistema", {
        description: "Verifique suas credenciais e tente novamente",
      })
    }
  })

  return (
    <Form {...methods}>
      <form className="w-full space-y-8" onSubmit={handleSubmit}>
        <FormField
          control={methods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ex: email@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="ex: 12345678...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {isPending ? "Carregando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  )
}
