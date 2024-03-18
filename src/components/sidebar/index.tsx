"use client"

import { useSidebarStore } from "@/stores/sidebar-store"
import { Bell, PieChart, User2 } from "lucide-react"

import { Separator } from "../ui/separator"
import { SidebarItem } from "./sidebar-item"
import { SidebarSection } from "./sidebar-section"
import { SidebarWrapper } from "./sidebar-wrapper"

export const Sidebar: React.FC = () => {
  const { open } = useSidebarStore()

  return (
    <SidebarWrapper open={open}>
      <div className="h-16 w-full border-b" />
      <SidebarSection title="Geral">
        <SidebarItem href="/">
          <PieChart size={20} />
          <span>Dashboard</span>
        </SidebarItem>
        <SidebarItem href="/settings">
          <Bell size={20} />
          <span>Notificações</span>
        </SidebarItem>
        <SidebarItem href="/profile">
          <User2 size={20} />
          <span>Usuários</span>
        </SidebarItem>
      </SidebarSection>
      <Separator />
      <SidebarSection title="Cadastros">
        <SidebarItem href="/">
          <PieChart size={20} />
          <span>Dashboard</span>
        </SidebarItem>
        <SidebarItem href="/settings">
          <Bell size={20} />
          <span>Notificações</span>
        </SidebarItem>
        <SidebarItem href="/users">
          <User2 size={20} />
          <span>Usuários</span>
        </SidebarItem>
      </SidebarSection>
    </SidebarWrapper>
  )
}
