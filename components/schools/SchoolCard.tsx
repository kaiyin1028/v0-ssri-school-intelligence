import Link from "next/link"
import { 
  MapPin, 
  Calendar, 
  ArrowRight,
  Users,
  HeartHandshake,
  Network,
  Lightbulb,
  Leaf,
  ShieldCheck
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScoreBadge } from "@/components/common/ScoreBadge"
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge"
import { LEVEL_LABELS, TYPE_LABELS } from "@/lib/constants"
import type { School, SSRIDomain } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SchoolCardProps {
  school: School
  variant?: "default" | "compact"
}

const domainIcons: Record<SSRIDomain, React.ElementType> = {
  Culture: Users,
  Inclusion: HeartHandshake,
  Community: Network,
  Innovation: Lightbulb,
  WholePerson: Leaf,
  Governance: ShieldCheck
}

export function SchoolCard({ school, variant = "default" }: SchoolCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/schools/${school.id}`}>
        <Card className="transition-all hover:shadow-md hover:border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-foreground">{school.nameZh}</h3>
                <p className="truncate text-sm text-muted-foreground">{school.nameEn}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{school.district}</span>
                  <span>·</span>
                  <span>{LEVEL_LABELS[school.level]}</span>
                </div>
              </div>
              <div className="text-right">
                {school.totalScore !== null ? (
                  <div className="text-2xl font-bold text-primary">{school.totalScore}</div>
                ) : (
                  <div className="text-sm text-muted-foreground">--</div>
                )}
                <ScoreBadge grade={school.grade} size="sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Card className="transition-all hover:shadow-md hover:border-primary/30">
      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-foreground">{school.nameZh}</h3>
            <p className="truncate text-sm text-muted-foreground">{school.nameEn}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <ScoreBadge grade={school.grade} size="md" />
            <ConfidenceBadge confidence={school.confidence} size="sm" showIcon={false} />
          </div>
        </div>

        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{school.district}</span>
          </div>
          <span>{LEVEL_LABELS[school.level]}</span>
          <span>{TYPE_LABELS[school.type]}</span>
          {school.religion && <span>{school.religion}</span>}
        </div>

        {/* Score Display */}
        <div className="mb-4 flex items-end gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-primary">
              {school.totalScore !== null ? school.totalScore : "--"}
            </span>
            <span className="text-muted-foreground">/ 100</span>
          </div>
          <span className="mb-1 text-sm text-muted-foreground">SSRI 總分</span>
        </div>

        {/* Domain Mini Scores */}
        <div className="mb-4 grid grid-cols-6 gap-2">
          {school.domainScores.map((ds) => {
            const Icon = domainIcons[ds.domain]
            return (
              <div 
                key={ds.domain} 
                className="flex flex-col items-center gap-1"
                title={ds.labelZh}
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  ds.score !== null ? "bg-primary/10" : "bg-muted"
                )}>
                  <Icon className={cn(
                    "h-4 w-4",
                    ds.score !== null ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  ds.score !== null ? "text-foreground" : "text-muted-foreground"
                )}>
                  {ds.score !== null ? ds.score : "--"}
                </span>
              </div>
            )
          })}
        </div>

        {/* Domain Progress Bars */}
        <div className="mb-4 space-y-2">
          {school.domainScores.slice(0, 3).map((ds) => (
            <div key={ds.domain} className="flex items-center gap-3">
              <span className="w-16 truncate text-xs text-muted-foreground">{ds.labelZh}</span>
              <Progress 
                value={ds.score || 0} 
                className="h-1.5 flex-1"
              />
              <span className="w-8 text-right text-xs font-medium">
                {ds.score !== null ? ds.score : "--"}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>更新於 {school.lastUpdated}</span>
          </div>
          <Link href={`/schools/${school.id}`}>
            <Button size="sm" variant="ghost" className="gap-1.5">
              查看分析
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
