"use client"

import { useState } from "react"
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

import { Button } from "../../../../../../components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../../components/ui/form"
import { Input } from "../../../../../../components/ui/input"

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
  const [persistInPage, setPersistInPage] = useState(true)
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

      if (persistInPage) return
      router.push("/users")
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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{edit ? "Editar" : "Criar"} usuário</DialogTitle>
      </DialogHeader>
      <Form {...methods}>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
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
              <FormItem className="w-full">
                <FormLabel>Senha</FormLabel>
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
                <FormControl>
                  <Input placeholder="ex: 12345678...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4">
            <DialogClose className="w-full">
              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
                className="w-full"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              loading={isCreatingUser || isUpdatingUser}
              className="w-full"
            >
              {edit ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
