"use client"

import { useState } from "react"
import Link from "next/link"
import useSWR from "swr"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { PriorityBadge } from "@/components/common/PriorityBadge"
import { StageBadge } from "@/components/common/StageBadge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { LoadingState } from "@/components/common/LoadingState"
import { getOpportunities, getOpportunityStats, getSolutions } from "@/lib/api"
import { DISTRICTS, OPPORTUNITY_STAGE_CONFIG, NEED_DIMENSION_LABELS } from "@/lib/constants"
import type { Opportunity, OpportunityStage, NeedDimension } from "@/lib/types"
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  FileText, 
  DollarSign,
  Search,
  LayoutGrid,
  List,
  Eye,
  Mail,
  StickyNote,
  MoreHorizontal,
  ArrowUpDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [selectedStage, setSelectedStage] = useState<string>("all")
  const [selectedOwner, setSelectedOwner] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table")

  const { data: opportunities, isLoading } = useSWR("opportunities", getOpportunities)
  const { data: stats } = useSWR("opportunityStats", getOpportunityStats)
  const { data: solutions } = useSWR("solutions", getSolutions)

  const solutionMap = new Map(solutions?.map(s => [s.id, s]) || [])
  const owners = [...new Set(opportunities?.map(o => o.owner).filter(Boolean) || [])]

  const filteredOpportunities = opportunities?.filter(opp => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!opp.schoolName.includes(query)) return false
    }
    if (selectedPriority !== "all" && opp.priority !== selectedPriority) return false
    if (selectedStage !== "all" && opp.stage !== selectedStage) return false
    if (selectedOwner !== "all" && opp.owner !== selectedOwner) return false
    return true
  }) || []

  const statCards = [
    {
      title: "高優先商機",
      value: stats?.highPriority || 0,
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      title: "本週新增",
      value: stats?.newThisWeek || 0,
      icon: TrendingUp,
      color: "text-sky-600",
      bgColor: "bg-sky-100"
    },
    {
      title: "已安排會議",
      value: stats?.meetingsScheduled || 0,
      icon: Calendar,
      color: "text-violet-600",
      bgColor: "bg-violet-100"
    },
    {
      title: "已提交方案",
      value: stats?.proposalsSent || 0,
      icon: FileText,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      title: "預計總值",
      value: `$${((stats?.estimatedTotalValue || 0) / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ]

  // Kanban stages
  const kanbanStages: OpportunityStage[] = [
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">商機名單</h1>
          <p className="mt-2 text-muted-foreground">
            根據學校訊號、AI 成熟度、需求強度及方案匹配度，自動排列優先跟進學校。
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <Icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋學校..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="優先度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有優先度</SelectItem>
                  <SelectItem value="High">高優先</SelectItem>
                  <SelectItem value="Medium">中優先</SelectItem>
                  <SelectItem value="Low">低優先</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="階段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有階段</SelectItem>
                  {(Object.keys(OPPORTUNITY_STAGE_CONFIG) as OpportunityStage[]).map(stage => (
                    <SelectItem key={stage} value={stage}>
                      {OPPORTUNITY_STAGE_CONFIG[stage].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="負責人" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有負責人</SelectItem>
                  {owners.map(owner => (
                    <SelectItem key={owner} value={owner!}>{owner}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1 ml-auto">
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "kanban" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("kanban")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {isLoading ? (
          <LoadingState message="載入商機資料..." />
        ) : viewMode === "table" ? (
          /* Table View */
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">學校</TableHead>
                      <TableHead>地區</TableHead>
                      <TableHead>成熟度</TableHead>
                      <TableHead>主要需要</TableHead>
                      <TableHead className="text-center">商機分數</TableHead>
                      <TableHead>優先度</TableHead>
                      <TableHead>階段</TableHead>
                      <TableHead>負責人</TableHead>
                      <TableHead>下一步</TableHead>
                      <TableHead className="text-right">預計價值</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOpportunities.map((opp) => (
                      <TableRow key={opp.id}>
                        <TableCell>
                          <Link href={`/needs/${opp.schoolId}`} className="font-medium text-foreground hover:text-primary">
                            {opp.schoolName}
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{opp.district}</TableCell>
                        <TableCell>
                          <MaturityBadge level={opp.maturityLevel} size="sm" />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {opp.topNeedDimensions.slice(0, 2).map(dim => (
                              <NeedDimensionBadge key={dim} dimension={dim} size="sm" showIcon={false} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "font-semibold",
                            opp.opportunityScore >= 75 ? "text-emerald-600" : 
                            opp.opportunityScore >= 50 ? "text-sky-600" : "text-slate-500"
                          )}>
                            {opp.opportunityScore}
                          </span>
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={opp.priority} size="sm" />
                        </TableCell>
                        <TableCell>
                          <StageBadge stage={opp.stage} size="sm" />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{opp.owner || "-"}</TableCell>
                        <TableCell>
                          <div className="max-w-[150px]">
                            <p className="text-sm text-foreground truncate">{opp.nextAction || "-"}</p>
                            {opp.nextActionDate && (
                              <p className="text-xs text-muted-foreground">
                                {new Date(opp.nextActionDate).toLocaleDateString("zh-HK")}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {opp.estimatedValue ? `$${opp.estimatedValue.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/needs/${opp.schoolId}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  查看需求
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                生成文案
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <StickyNote className="h-4 w-4 mr-2" />
                                添加備註
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Kanban View */
          <div className="flex gap-4 overflow-x-auto pb-4">
            {kanbanStages.map(stage => {
              const stageOpps = filteredOpportunities.filter(o => o.stage === stage)
              const config = OPPORTUNITY_STAGE_CONFIG[stage]
              return (
                <div key={stage} className="flex-shrink-0 w-[280px]">
                  <div className={cn("rounded-lg p-3 mb-3", config.bgColor)}>
                    <div className="flex items-center justify-between">
                      <span className={cn("font-medium", config.color)}>{config.label}</span>
                      <span className="text-sm text-muted-foreground">{stageOpps.length}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {stageOpps.map(opp => (
                      <Card key={opp.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <Link href={`/needs/${opp.schoolId}`}>
                            <h4 className="font-medium text-foreground mb-2">{opp.schoolName}</h4>
                          </Link>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <NeedDimensionBadge 
                                dimension={opp.topNeedDimensions[0]} 
                                size="sm" 
                                showIcon={false}
                              />
                              <span className={cn(
                                "text-sm font-semibold",
                                opp.opportunityScore >= 75 ? "text-emerald-600" : 
                                opp.opportunityScore >= 50 ? "text-sky-600" : "text-slate-500"
                              )}>
                                {opp.opportunityScore}分
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{opp.owner || "未分配"}</span>
                              {opp.estimatedValue && (
                                <span>${(opp.estimatedValue / 1000).toFixed(0)}K</span>
                              )}
                            </div>
                            {opp.nextAction && (
                              <p className="text-xs text-muted-foreground truncate">
                                {opp.nextAction}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
