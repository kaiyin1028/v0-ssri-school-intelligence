"use client"

import { cn } from "@/lib/utils"
import { MATURITY_LEVEL_CONFIG } from "@/lib/constants"
import type { AIMaturityLevel } from "@/lib/types"

interface MaturityBadgeProps {
  level: AIMaturityLevel
  showDescription?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function MaturityBadge({ 
  level, 
  showDescription = false, 
  size = "md",
  className 
}: MaturityBadgeProps) {
  const config = MATURITY_LEVEL_CONFIG[level]
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex items-center rounded-full font-medium",
          config.bgColor,
          config.color,
          sizeClasses[size]
        )}
      >
        {config.label}
      </span>
      {showDescription && (
        <span className="text-sm text-muted-foreground">{config.description}</span>
      )}
    </div>
  )
}
