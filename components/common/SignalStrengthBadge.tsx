"use client"

import { cn } from "@/lib/utils"
import { Signal, SignalHigh, SignalMedium, SignalLow } from "lucide-react"

interface SignalStrengthBadgeProps {
  strength: number // 0-1
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SignalStrengthBadge({ 
  strength, 
  showLabel = false, 
  size = "md",
  className 
}: SignalStrengthBadgeProps) {
  const getConfig = (strength: number) => {
    if (strength >= 0.8) {
      return { 
        label: "強", 
        color: "text-emerald-700", 
        bgColor: "bg-emerald-100",
        Icon: SignalHigh 
      }
    }
    if (strength >= 0.5) {
      return { 
        label: "中", 
        color: "text-sky-700", 
        bgColor: "bg-sky-100",
        Icon: SignalMedium 
      }
    }
    if (strength >= 0.3) {
      return { 
        label: "弱", 
        color: "text-amber-700", 
        bgColor: "bg-amber-100",
        Icon: SignalLow 
      }
    }
    return { 
      label: "微弱", 
      color: "text-slate-500", 
      bgColor: "bg-slate-100",
      Icon: Signal 
    }
  }

  const config = getConfig(strength)
  const Icon = config.Icon
  
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
      <Icon className={iconSizes[size]} />
      {showLabel && `訊號${config.label}`}
    </span>
  )
}
