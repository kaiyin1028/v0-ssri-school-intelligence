import { cn } from "@/lib/utils"
import { CONFIDENCE_CONFIG } from "@/lib/constants"
import type { ConfidenceLevel } from "@/lib/types"
import { ShieldCheck, Shield, ShieldAlert, ShieldQuestion } from "lucide-react"

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

const iconMap = {
  High: ShieldCheck,
  Medium: Shield,
  Low: ShieldAlert,
  Insufficient: ShieldQuestion
}

export function ConfidenceBadge({ confidence, size = "md", showIcon = true }: ConfidenceBadgeProps) {
  const config = CONFIDENCE_CONFIG[confidence]
  const Icon = iconMap[confidence]
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
    lg: "px-3 py-1.5 text-base gap-2"
  }
  
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4"
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
      {showIcon && <Icon className={iconSizes[size]} />}
      資料信心: {config.label}
    </span>
  )
}
