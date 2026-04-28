"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { PriorityBadge } from "@/components/common/PriorityBadge"
import { OPPORTUNITY_STAGE_CONFIG } from "@/lib/constants"
import type { Opportunity, OpportunityStage } from "@/lib/types"
import { 
  MoreHorizontal, 
  Eye, 
  Mail, 
  StickyNote, 
  GripVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface KanbanBoardProps {
  opportunities: Opportunity[]
  onStageChange?: (opportunityId: string, newStage: OpportunityStage) => void
  onOpenOutreach?: (opportunity: Opportunity) => void
  onAddNote?: (opportunity: Opportunity) => void
}

const stages: OpportunityStage[] = [
  "Not Contacted",
  "Contacted", 
  "Replied",
  "Meeting Scheduled",
  "Proposal Sent",
  "Pilot",
  "Won",
  "Paused",
  "Lost"
]

export function KanbanBoard({ 
  opportunities, 
  onStageChange,
  onOpenOutreach,
  onAddNote
}: KanbanBoardProps) {
  const [collapsedStages, setCollapsedStages] = useState<Set<OpportunityStage>>(new Set())

  const toggleCollapse = (stage: OpportunityStage) => {
    const newSet = new Set(collapsedStages)
    if (newSet.has(stage)) {
      newSet.delete(stage)
    } else {
      newSet.add(stage)
    }
    setCollapsedStages(newSet)
  }

  const getOpportunitiesByStage = (stage: OpportunityStage) => 
    opportunities.filter(o => o.stage === stage)

  return (
    <ScrollArea className="w-full whitespace-nowrap pb-4">
      <div className="flex gap-4 min-w-max">
        {stages.map(stage => {
          const stageOpps = getOpportunitiesByStage(stage)
          const config = OPPORTUNITY_STAGE_CONFIG[stage]
          const isCollapsed = collapsedStages.has(stage)

          return (
            <div 
              key={stage} 
              className={cn(
                "flex-shrink-0 transition-all duration-200",
                isCollapsed ? "w-12" : "w-[300px]"
              )}
            >
              {/* Column Header */}
              <div 
                className={cn(
                  "rounded-lg p-3 mb-3 cursor-pointer transition-colors",
                  config.bgColor,
                  "hover:opacity-90"
                )}
                onClick={() => toggleCollapse(stage)}
              >
                {isCollapsed ? (
                  <div className="flex flex-col items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="writing-vertical-rl text-sm font-medium text-muted-foreground rotate-180">
                      {config.label}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {stageOpps.length}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                      <span className={cn("font-medium", config.color)}>
                        {config.label}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stageOpps.length}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Cards */}
              {!isCollapsed && (
                <div className="space-y-3 min-h-[200px]">
                  {stageOpps.length === 0 ? (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg">
                      <span className="text-sm text-muted-foreground">無商機</span>
                    </div>
                  ) : (
                    stageOpps.map(opp => (
                      <KanbanCard
                        key={opp.id}
                        opportunity={opp}
                        onOpenOutreach={onOpenOutreach}
                        onAddNote={onAddNote}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

interface KanbanCardProps {
  opportunity: Opportunity
  onOpenOutreach?: (opportunity: Opportunity) => void
  onAddNote?: (opportunity: Opportunity) => void
}

function KanbanCard({ opportunity, onOpenOutreach, onAddNote }: KanbanCardProps) {
  return (
    <Card className="group cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <Link 
            href={`/needs/${opportunity.schoolId}`}
            className="flex-1 min-w-0"
          >
            <h4 className="font-medium text-foreground truncate hover:text-primary transition-colors">
              {opportunity.schoolName}
            </h4>
            <p className="text-xs text-muted-foreground">{opportunity.district}</p>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/needs/${opportunity.schoolId}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  查看需求
                </Link>
              </DropdownMenuItem>
              {onOpenOutreach && (
                <DropdownMenuItem onClick={() => onOpenOutreach(opportunity)}>
                  <Mail className="h-4 w-4 mr-2" />
                  生成文案
                </DropdownMenuItem>
              )}
              {onAddNote && (
                <DropdownMenuItem onClick={() => onAddNote(opportunity)}>
                  <StickyNote className="h-4 w-4 mr-2" />
                  添加備註
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Priority & Score */}
        <div className="flex items-center justify-between mb-3">
          <PriorityBadge priority={opportunity.priority} size="sm" />
          <span className={cn(
            "text-sm font-semibold",
            opportunity.opportunityScore >= 75 ? "text-emerald-600" : 
            opportunity.opportunityScore >= 50 ? "text-sky-600" : "text-slate-500"
          )}>
            {opportunity.opportunityScore}分
          </span>
        </div>

        {/* Need Dimensions */}
        <div className="flex flex-wrap gap-1 mb-3">
          {opportunity.topNeedDimensions.slice(0, 2).map(dim => (
            <NeedDimensionBadge key={dim} dimension={dim} size="sm" showIcon={false} />
          ))}
          {opportunity.topNeedDimensions.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{opportunity.topNeedDimensions.length - 2}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <span>{opportunity.owner || "未分配"}</span>
          {opportunity.estimatedValue && (
            <span className="font-medium">
              ${(opportunity.estimatedValue / 1000).toFixed(0)}K
            </span>
          )}
        </div>

        {/* Next Action */}
        {opportunity.nextAction && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs text-muted-foreground truncate">
              {opportunity.nextAction}
            </p>
            {opportunity.nextActionDate && (
              <p className="text-xs text-amber-600 mt-1">
                {new Date(opportunity.nextActionDate).toLocaleDateString("zh-HK")}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
