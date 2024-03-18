import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-svh min-w-full">
      <Sidebar />
      <div className="flex min-h-full w-full flex-col bg-muted-foreground/5">
        <Header />
        {children}
      </div>
    </main>
  )
}
