"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { SignalStrengthBadge } from "@/components/common/SignalStrengthBadge"
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge"
import { SIGNAL_CATEGORY_LABELS, SIGNAL_SOURCE_LABELS, VERIFICATION_STATUS_LABELS } from "@/lib/constants"
import type { SchoolSignal } from "@/lib/types"
import { Activity, ExternalLink, Calendar, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

interface SignalTimelineProps {
  signals: SchoolSignal[]
  maxItems?: number
  className?: string
}

export function SignalTimeline({ signals, maxItems = 5, className }: SignalTimelineProps) {
  const sortedSignals = [...signals]
    .sort((a, b) => new Date(b.crawledAt).getTime() - new Date(a.crawledAt).getTime())
    .slice(0, maxItems)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          最近訊號時序
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedSignals.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">暫無訊號記錄</p>
        ) : (
          <div className="space-y-4">
            {sortedSignals.map((signal, idx) => {
              const verificationConfig = VERIFICATION_STATUS_LABELS[signal.verificationStatus]
              return (
                <div
                  key={signal.id}
                  className={cn(
                    "relative pl-6 pb-4",
                    idx !== sortedSignals.length - 1 && "border-l-2 border-border"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-card" />
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-foreground">{signal.title}</h4>
                      <SignalStrengthBadge strength={signal.signalStrength} size="sm" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">{signal.summary}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge variant="outline" className="gap-1">
                        {SIGNAL_CATEGORY_LABELS[signal.category]}
                      </Badge>
                      <span className="text-muted-foreground">
                        {SIGNAL_SOURCE_LABELS[signal.source]}
                      </span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-xs",
                        verificationConfig.bgColor,
                        verificationConfig.color
                      )}>
                        {verificationConfig.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {signal.mappedNeedDimensions.map(dim => (
                        <NeedDimensionBadge 
                          key={dim} 
                          dimension={dim} 
                          size="sm" 
                          showIcon={false}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {signal.publishedDate 
                          ? new Date(signal.publishedDate).toLocaleDateString("zh-HK")
                          : "日期不詳"
                        }
                      </span>
                      {signal.sourceUrl && (
                        <a 
                          href={signal.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          查看來源
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
