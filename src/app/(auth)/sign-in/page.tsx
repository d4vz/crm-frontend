import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { LoginForm } from "./components/login-form"
import loginBanner from "/public/login-banner.svg"

export default function SignPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-gray-50 px-8 py-16 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="text-left">
              <h1 className="text-4xl font-bold">Bem Vindo!</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Faça login para acessar sua conta.
              </p>
            </div>
          </CardHeader>
          <CardContent className="4 flex flex-col gap-4">
            <LoginForm />
            <a href="#" className="text-primary hover:underline">
              Esqueceu sua senha?
            </a>
          </CardContent>
        </Card>
      </div>
      <div className="hidden items-center justify-center border-l lg:flex">
        <div className="flex h-full w-full items-center justify-center">
          <Image
            alt="Login Banner"
            height="600"
            src={loginBanner}
            width="600"
          />
        </div>
      </div>
    </main>
  )
}
