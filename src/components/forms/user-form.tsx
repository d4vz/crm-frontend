"use client"

import { useRouter } from "next/navigation"
import { CreateUserPayload, UpdateUserPayload } from "@/services/users/types"
import { zodResolver } from "@hookform/resolvers/zod"
import _ from "lodash"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { User } from "@/types/user"
import { errorHandling } from "@/lib/error-handler"
import useCreateUserMutation from "@/hooks/mutations/use-create-user-mutation"
import useUpdateUserMutation from "@/hooks/mutations/use-update-user-mutation"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

type UserFormPropsEdit = {
  defaultValues: User
  edit: true
}

type UserFormPropsCreate = {
  defaultValues?: never
  edit?: false
}

type UserFormProps = UserFormPropsEdit | UserFormPropsCreate

const createUserSchema = z
  .object({
    name: z.string().min(3, {
      message: "Nome precisa ter no mínimo 3 caracteres",
    }),
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z.string().min(6, {
      message: "Senha precisa ter no mínimo 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message: "Senha precisa ter no mínimo 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  })

const updateUserSchema = z
  .object({
    name: z.string().min(3, {
      message: "Nome precisa ter no mínimo 3 caracteres",
    }),
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  })

type CreateUserFormValues = z.infer<typeof createUserSchema>
type UpdateUserFormValues = z.infer<typeof updateUserSchema>

const initialValues: CreateUserFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const parseDataToForm = (data: User): UpdateUserFormValues => {
  return _.pick(data, ["name", "email"])
}

const parseDataToCreate = (data: CreateUserFormValues): CreateUserPayload => {
  return _.pick(data, ["name", "email", "password"])
}

const parseDataToUpdate = (
  data: UpdateUserFormValues,
  userId: string
): UpdateUserPayload => {
  const formData = _.pick(data, ["name", "email", "password"])
  const ommitedEmpty = _.omitBy(formData, _.isEmpty)
  return { ...ommitedEmpty, _id: userId }
}

type FormValues = CreateUserFormValues | UpdateUserFormValues

export const UserForm: React.FC<UserFormProps> = ({ defaultValues, edit }) => {
  const router = useRouter()

  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUserMutation()

  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUserMutation()

  const userId = edit ? defaultValues._id : ""

  const methods = useForm<FormValues>({
    defaultValues: edit ? parseDataToForm(defaultValues) : initialValues,
    resolver: zodResolver(edit ? updateUserSchema : createUserSchema),
  })

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      if (edit) {
        const parsedData = parseDataToUpdate(data, userId)
        await updateUser(parsedData)
      } else {
        const parsedData = parseDataToCreate(data as CreateUserFormValues)
        await createUser(parsedData)
      }

      const text = edit ? "atualizado" : "criado"
      toast.success(`Usuário ${text} com sucesso`)
    } catch (error) {
      const { status } = errorHandling(error)

      if (status === 409) {
        toast.error("Email já cadastrado")
        return
      }

      const text = edit ? "atualizar" : "criar"
      toast.error(`Erro ao ${text} usuário`)
    }
  })

  const handleCancel = () => router.push("/users")

  return (
    <Form {...methods}>
      <form className="w-full space-y-4 p-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">
          {edit ? "Editar usuário" : "Criar usuário"}
        </h1>

        <Separator />

        <h2 className="text-lg font-semibold">Dados básicos do usuário</h2>

        <div className="flex flex-row gap-4">
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormDescription>Nome completo do usuário</FormDescription>
                <FormControl>
                  <Input placeholder="ex: João da Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormDescription>
                  Este email será utilizado para acessar o sistema
                </FormDescription>
                <FormControl>
                  <Input placeholder="ex: email@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Senha</FormLabel>
                <FormDescription>
                  Esta senha será utilizada para acessar o sistema
                </FormDescription>
                <FormControl>
                  <Input placeholder="ex: 12345678...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirmar senha</FormLabel>
                <FormDescription>
                  Esta senha será utilizada para acessar o sistema
                </FormDescription>
                <FormControl>
                  <Input placeholder="ex: 12345678...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex flex-row justify-end gap-4">
          <Button
            size="lg"
            variant="destructive"
            type="button"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button size="lg" type="submit">
            {isCreatingUser || isUpdatingUser
              ? "Salvando..."
              : edit
                ? "Salvar"
                : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
