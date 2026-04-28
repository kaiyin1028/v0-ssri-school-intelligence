"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { StageBadge } from "@/components/common/StageBadge"
import { cn } from "@/lib/utils"
import type { SchoolNeedProfile, School, Opportunity } from "@/lib/types"
import { 
  MapPin, 
  Calendar, 
  Eye, 
  ArrowRight,
  Lock,
  Lightbulb
} from "lucide-react"

interface NeedCardProps {
  profile: SchoolNeedProfile
  school: School
  opportunity?: Opportunity
  className?: string
}

export function NeedCard({ profile, school, opportunity, className }: NeedCardProps) {
  const getOpportunityColor = (score: number) => {
    if (score >= 75) return "text-emerald-700 bg-emerald-100"
    if (score >= 50) return "text-sky-700 bg-sky-100"
    return "text-slate-600 bg-slate-100"
  }

  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-foreground truncate">
              {school.nameZh}
            </CardTitle>
            <p className="text-sm text-muted-foreground truncate">{school.nameEn}</p>
          </div>
          <MaturityBadge level={profile.maturityLevel} size="sm" />
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {school.district}
          </span>
          <span>{school.level === "Primary" ? "小學" : school.level === "Secondary" ? "中學" : school.level === "Special" ? "特殊學校" : "國際學校"}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Scores Row */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">需求分數</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{profile.overallNeedScore}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              商機分數
              <Lock className="h-3 w-3" />
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded">內部</span>
            </p>
            <div className="flex items-center gap-2">
              <span className={cn("text-2xl font-bold", profile.opportunityScore >= 75 ? "text-emerald-600" : profile.opportunityScore >= 50 ? "text-sky-600" : "text-slate-500")}>
                {profile.opportunityScore}
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <ConfidenceBadge level={profile.confidence} size="sm" />
        </div>

        {/* Top Needs */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">主要潛在需要</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.needDimensions
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
              .map((dim) => (
                <NeedDimensionBadge 
                  key={dim.dimension} 
                  dimension={dim.dimension} 
                  size="sm"
                  showIcon={false}
                />
              ))}
          </div>
        </div>

        {/* Suggested Entry Point */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Lightbulb className="h-3 w-3" />
            建議切入點
          </p>
          <p className="text-sm text-foreground line-clamp-2">{profile.suggestedEntryPoint}</p>
        </div>

        {/* Stage & Last Updated */}
        <div className="flex items-center justify-between text-sm">
          {opportunity && (
            <StageBadge stage={opportunity.stage} size="sm" />
          )}
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(profile.lastAnalyzedAt).toLocaleDateString("zh-HK")}
          </span>
        </div>

        {/* Action Button */}
        <Link href={`/needs/${school.id}`}>
          <Button variant="outline" className="w-full gap-2">
            <Eye className="h-4 w-4" />
            查看需求分析
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
