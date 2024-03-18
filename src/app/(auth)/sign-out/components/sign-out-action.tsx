"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface SignOutActionProps {
  deleteTokens: Function
}

export const SignOutAction: React.FC<SignOutActionProps> = ({
  deleteTokens,
}) => {
  const deleteTokensRef = useRef(deleteTokens)
  const router = useRouter()

  useEffect(() => {
    deleteTokensRef.current = deleteTokens
  })

  useEffect(() => {
    deleteTokensRef.current()
    router.push("/sign-in")
  }, [router])

  return null
}
