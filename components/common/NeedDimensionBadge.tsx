"use client"

import { cn } from "@/lib/utils"
import { NEED_DIMENSION_LABELS } from "@/lib/constants"
import type { NeedDimension } from "@/lib/types"
import { 
  GraduationCap, 
  BookOpenCheck, 
  Trophy, 
  ShieldAlert, 
  MonitorCog, 
  PanelsTopLeft, 
  Lightbulb, 
  LockKeyhole 
} from "lucide-react"

interface NeedDimensionBadgeProps {
  dimension: NeedDimension
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline"
  className?: string
}

const iconMap: Record<NeedDimension, React.ElementType> = {
  TeacherTraining: GraduationCap,
  AICurriculum: BookOpenCheck,
  StudentCompetition: Trophy,
  AIPolicy: ShieldAlert,
  Hardware: MonitorCog,
  SoftwarePlatform: PanelsTopLeft,
  SchoolBasedConsulting: Lightbulb,
  SafetyCompliance: LockKeyhole
}

export function NeedDimensionBadge({ 
  dimension, 
  showIcon = true, 
  size = "md",
  variant = "default",
  className 
}: NeedDimensionBadgeProps) {
  const config = NEED_DIMENSION_LABELS[dimension]
  const Icon = iconMap[dimension]
  
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

  const variantClasses = {
    default: "bg-primary/10 text-primary",
    outline: "border border-border bg-card text-foreground"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.zh}
    </span>
  )
}
