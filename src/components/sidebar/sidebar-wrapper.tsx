"use client"

import { cn } from "@/lib/utils"

interface WrapperProps {
  open: boolean
  children: React.ReactNode
}

export const SidebarWrapper: React.FC<WrapperProps> = ({ open, children }) => {
  return (
    <aside
      className={cn(
        "min-h-full overflow-hidden border-r transition-all duration-300 ease-in-out",
        open ? "min-w-64" : "w-[24px]"
      )}
    >
      {children}
    </aside>
  )
}
