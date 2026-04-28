import { cn } from "@/lib/utils"
import { FileSearch, SearchX, Inbox, FolderOpen, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

type EmptyStateVariant = "default" | "search" | "filter" | "data" | "folder"

const variantIcons: Record<EmptyStateVariant, React.ElementType> = {
  default: Inbox,
  search: SearchX,
  filter: FileSearch,
  data: Database,
  folder: FolderOpen
}

interface EmptyStateProps {
  icon?: React.ElementType
  variant?: EmptyStateVariant
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  } | ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}

export function EmptyState({ 
  icon, 
  variant = "default",
  title, 
  description, 
  action,
  className,
  size = "md"
}: EmptyStateProps) {
  const Icon = icon || variantIcons[variant]
  
  const sizeClasses = {
    sm: {
      container: "py-6",
      iconWrapper: "h-10 w-10 mb-3",
      icon: "h-5 w-5",
      title: "text-sm font-medium",
      description: "text-xs"
    },
    md: {
      container: "py-12",
      iconWrapper: "h-16 w-16 mb-4",
      icon: "h-8 w-8",
      title: "text-lg font-semibold",
      description: "text-sm"
    },
    lg: {
      container: "py-16",
      iconWrapper: "h-20 w-20 mb-6",
      icon: "h-10 w-10",
      title: "text-xl font-bold",
      description: "text-base"
    }
  }

  const classes = sizeClasses[size]

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      classes.container,
      className
    )}>
      <div className={cn(
        "flex items-center justify-center rounded-full bg-muted",
        classes.iconWrapper
      )}>
        <Icon className={cn("text-muted-foreground", classes.icon)} />
      </div>
      <h3 className={cn("mb-2 text-foreground", classes.title)}>{title}</h3>
      {description && (
        <p className={cn("mb-4 max-w-md text-muted-foreground", classes.description)}>
          {description}
        </p>
      )}
      {action && (
        typeof action === "object" && "label" in action ? (
          <Button onClick={action.onClick}>{action.label}</Button>
        ) : (
          action
        )
      )}
    </div>
  )
}
