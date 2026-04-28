import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
  message?: string
  className?: string
  variant?: "spinner" | "skeleton" | "dots"
  size?: "sm" | "md" | "lg"
}

export function LoadingState({ 
  message = "載入中...", 
  className,
  variant = "spinner",
  size = "md"
}: LoadingStateProps) {
  const sizeClasses = {
    sm: { container: "py-6", spinner: "h-5 w-5", text: "text-xs mt-2" },
    md: { container: "py-12", spinner: "h-8 w-8", text: "text-sm mt-4" },
    lg: { container: "py-16", spinner: "h-12 w-12", text: "text-base mt-6" }
  }

  const classes = sizeClasses[size]

  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-4", className)}>
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex flex-col items-center justify-center", classes.container, className)}>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce" />
        </div>
        {message && (
          <p className={cn("text-muted-foreground", classes.text)}>{message}</p>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", classes.container, className)}>
      <Spinner className={cn("text-primary", classes.spinner)} />
      {message && (
        <p className={cn("text-muted-foreground", classes.text)}>{message}</p>
      )}
    </div>
  )
}

// Card skeleton for lists
export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 py-3 border-b">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  )
}
