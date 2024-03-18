import { cookies } from "next/headers"

import { SignOutAction } from "./components/sign-out-action"

export default function SignOutPage() {
  async function deleteTokens() {
    "use server"
    cookies().delete("auth")
  }

  return <SignOutAction deleteTokens={deleteTokens} />
}
