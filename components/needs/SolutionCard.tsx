"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { LEVEL_LABELS, MATURITY_LEVEL_CONFIG } from "@/lib/constants"
import type { Solution } from "@/lib/types"
import { 
  Clock, 
  DollarSign, 
  MapPin, 
  FileText, 
  Mail, 
  Eye,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SolutionCardProps {
  solution: Solution
  matchReason?: string
  className?: string
  onViewDetails?: () => void
  onGenerateEmail?: () => void
  onAddToProposal?: () => void
}

export function SolutionCard({ 
  solution, 
  matchReason,
  className,
  onViewDetails,
  onGenerateEmail,
  onAddToProposal
}: SolutionCardProps) {
  const deliveryModeLabels = {
    Onsite: "實體",
    Online: "線上",
    Hybrid: "混合"
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          {solution.nameZh}
        </CardTitle>
        {solution.nameEn && (
          <p className="text-sm text-muted-foreground">{solution.nameEn}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {solution.description}
        </p>

        {matchReason && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            <p className="text-xs text-emerald-700 font-medium mb-1">推薦原因</p>
            <p className="text-sm text-emerald-800">{matchReason}</p>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{solution.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{solution.budgetRange}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{deliveryModeLabels[solution.deliveryMode]}</span>
          </div>
        </div>

        {/* Matched Dimensions */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">對應需要維度</p>
          <div className="flex flex-wrap gap-1.5">
            {solution.mappedNeedDimensions.map(dim => (
              <NeedDimensionBadge 
                key={dim} 
                dimension={dim} 
                size="sm"
                showIcon={false}
              />
            ))}
          </div>
        </div>

        {/* Suitable Maturity Levels */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">適合成熟度</p>
          <div className="flex flex-wrap gap-1.5">
            {solution.suitableMaturityLevels.map(level => (
              <MaturityBadge key={level} level={level} size="sm" />
            ))}
          </div>
        </div>

        {/* Target Levels */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">適用學校類型</p>
          <div className="flex flex-wrap gap-1.5">
            {solution.targetLevels.map(level => (
              <Badge key={level} variant="outline" className="text-xs">
                {LEVEL_LABELS[level]}
              </Badge>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        {solution.deliverables.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">交付物</p>
            <ul className="space-y-1">
              {solution.deliverables.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={onViewDetails}>
            <Eye className="h-3.5 w-3.5" />
            查看方案
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={onGenerateEmail}>
            <Mail className="h-3.5 w-3.5" />
            生成 Email
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={onAddToProposal}>
            <FileText className="h-3.5 w-3.5" />
            加入提案書
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
