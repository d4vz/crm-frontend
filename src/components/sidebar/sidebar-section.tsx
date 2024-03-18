interface SidebarSectionProps {
  title: string
  children?: React.ReactNode
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="p-4">
      <h3 className="mb-4 text-xs font-semibold uppercase text-secondary-foreground">
        {title}
      </h3>
      {children}
    </div>
  )
}
