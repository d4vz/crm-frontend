"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface SidebarItemProps {
  href: string
  children: React.ReactNode
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ href, children }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-4 rounded-lg p-3 text-sm font-medium text-secondary-foreground/50 transition-colors duration-200 hover:bg-muted-foreground/10",
        isActive && "bg-muted-foreground/10 text-secondary-foreground"
      )}
    >
      {children}
    </Link>
  )
}
