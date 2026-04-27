import { cn } from "@/lib/utils"
import { GRADE_CONFIG } from "@/lib/constants"
import type { SSRIGrade } from "@/lib/types"

interface ScoreBadgeProps {
  grade: SSRIGrade
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function ScoreBadge({ grade, size = "md", showLabel = true }: ScoreBadgeProps) {
  const config = GRADE_CONFIG[grade]
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        config.bgColor,
        config.color,
        sizeClasses[size]
      )}
    >
      {showLabel ? config.label : grade}
    </span>
  )
}
