import { create } from "zustand"

interface SidebarStore {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: true,
  setOpen: (open: boolean) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}))
