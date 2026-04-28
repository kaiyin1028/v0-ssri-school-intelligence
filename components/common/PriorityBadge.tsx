"use client"

import { cn } from "@/lib/utils"
import { PRIORITY_CONFIG } from "@/lib/constants"
import { ArrowUp, ArrowRight, ArrowDown } from "lucide-react"

interface PriorityBadgeProps {
  priority: "High" | "Medium" | "Low"
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function PriorityBadge({ 
  priority, 
  showIcon = true, 
  size = "md",
  className 
}: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority]
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2"
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4"
  }

  const icons = {
    High: ArrowUp,
    Medium: ArrowRight,
    Low: ArrowDown
  }

  const Icon = icons[priority]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        config.bgColor,
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}優先
    </span>
  )
}
