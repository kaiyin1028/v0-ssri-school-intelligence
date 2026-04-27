import { Database, FileSearch, FileCheck, FileText, Edit3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { TimelineEvent } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SchoolTimelineProps {
  events: TimelineEvent[]
  loading?: boolean
}

const eventIcons: Record<string, React.ElementType> = {
  crawl: Database,
  evidence: FileSearch,
  verification: FileCheck,
  report: FileText,
  correction: Edit3
}

const eventColors: Record<string, { bg: string; icon: string }> = {
  crawl: { bg: "bg-sky-100", icon: "text-sky-600" },
  evidence: { bg: "bg-emerald-100", icon: "text-emerald-600" },
  verification: { bg: "bg-amber-100", icon: "text-amber-600" },
  report: { bg: "bg-slate-100", icon: "text-slate-600" },
  correction: { bg: "bg-purple-100", icon: "text-purple-600" }
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString("zh-TW", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

export function SchoolTimeline({ events, loading }: SchoolTimelineProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">最近更新</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">最近更新</CardTitle>
          <CardDescription>暫無更新記錄</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">最近更新</CardTitle>
        <CardDescription>
          資料抓取、證據分析及報告生成記錄
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-border" />
          
          {events.map((event, index) => {
            const Icon = eventIcons[event.type] || FileText
            const colors = eventColors[event.type] || eventColors.report
            
            return (
              <div 
                key={event.id}
                className={cn(
                  "relative flex gap-4 pb-6",
                  index === events.length - 1 && "pb-0"
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                  colors.bg
                )}>
                  <Icon className={cn("h-4 w-4", colors.icon)} />
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {event.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(event.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
