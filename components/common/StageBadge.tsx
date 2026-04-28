"use client"

import { cn } from "@/lib/utils"
import { OPPORTUNITY_STAGE_CONFIG } from "@/lib/constants"
import type { OpportunityStage } from "@/lib/types"

interface StageBadgeProps {
  stage: OpportunityStage
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StageBadge({ 
  stage, 
  size = "md",
  className 
}: StageBadgeProps) {
  const config = OPPORTUNITY_STAGE_CONFIG[stage]
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm"
  }

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
      {config.label}
    </span>
  )
}
