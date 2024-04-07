"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../ui/button"

export const ThemeButton: React.FC = () => {
  const { setTheme, theme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button size="fit" onClick={handleThemeChange} variant="ghost">
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
