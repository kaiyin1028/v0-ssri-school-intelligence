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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { PriorityBadge } from "@/components/common/PriorityBadge"
import { StageBadge } from "@/components/common/StageBadge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { LoadingState } from "@/components/common/LoadingState"
import { EmptyState } from "@/components/common/EmptyState"
import { KanbanBoard } from "@/components/kanban/KanbanBoard"
import { AIOutreachModal } from "@/components/modals/AIOutreachModal"
import { FollowUpNoteModal } from "@/components/modals/FollowUpNoteModal"
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
  Filter,
  RotateCcw
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Modal states
  const [outreachModalOpen, setOutreachModalOpen] = useState(false)
  const [noteModalOpen, setNoteModalOpen] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)

  const { data: opportunities, isLoading, mutate } = useSWR("opportunities", getOpportunities)
  const { data: stats } = useSWR("opportunityStats", getOpportunityStats)
  const { data: solutions } = useSWR("solutions", getSolutions)

  const solutionMap = new Map(solutions?.map(s => [s.id, s]) || [])
  const owners = [...new Set(opportunities?.map(o => o.owner).filter(Boolean) || [])]

  const filteredOpportunities = opportunities?.filter(opp => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!opp.schoolName.toLowerCase().includes(query)) return false
    }
    if (selectedPriority !== "all" && opp.priority !== selectedPriority) return false
    if (selectedStage !== "all" && opp.stage !== selectedStage) return false
    if (selectedOwner !== "all" && opp.owner !== selectedOwner) return false
    return true
  }) || []

  const activeFilterCount = [selectedPriority, selectedStage, selectedOwner].filter(v => v !== "all").length

  const resetFilters = () => {
    setSelectedPriority("all")
    setSelectedStage("all")
    setSelectedOwner("all")
    setSearchQuery("")
  }

  const handleOpenOutreach = (opp: Opportunity) => {
    setSelectedOpportunity(opp)
    setOutreachModalOpen(true)
  }

  const handleAddNote = (opp: Opportunity) => {
    setSelectedOpportunity(opp)
    setNoteModalOpen(true)
  }

  const handleNoteSuccess = () => {
    mutate()
  }

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
              {/* Search */}
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

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
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

                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    重設
                  </Button>
                )}
              </div>

              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden relative">
                    <Filter className="h-4 w-4 mr-2" />
                    篩選
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[60vh] rounded-t-xl">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      <span>篩選條件</span>
                      <Button variant="ghost" size="sm" onClick={resetFilters}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        重設
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">優先度</label>
                      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="選擇優先度" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">所有優先度</SelectItem>
                          <SelectItem value="High">高優先</SelectItem>
                          <SelectItem value="Medium">中優先</SelectItem>
                          <SelectItem value="Low">低優先</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">階段</label>
                      <Select value={selectedStage} onValueChange={setSelectedStage}>
                        <SelectTrigger>
                          <SelectValue placeholder="選擇階段" />
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
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">負責人</label>
                      <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                        <SelectTrigger>
                          <SelectValue placeholder="選擇負責人" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">所有負責人</SelectItem>
                          {owners.map(owner => (
                            <SelectItem key={owner} value={owner!}>{owner}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setMobileFiltersOpen(false)}>
                      套用篩選
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Toggle */}
              <div className="flex items-center gap-1 ml-auto">
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("table")}
                  title="列表視圖"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "kanban" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("kanban")}
                  title="看板視圖"
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
        ) : filteredOpportunities.length === 0 ? (
          <EmptyState 
            title="沒有符合條件的商機"
            description="請嘗試調整篩選條件或搜尋關鍵字"
            action={
              activeFilterCount > 0 ? (
                <Button variant="outline" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重設篩選條件
                </Button>
              ) : undefined
            }
          />
        ) : viewMode === "table" ? (
          /* Table View */
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">學校</TableHead>
                      <TableHead className="hidden sm:table-cell">地區</TableHead>
                      <TableHead className="hidden md:table-cell">成熟度</TableHead>
                      <TableHead className="hidden lg:table-cell">主要需要</TableHead>
                      <TableHead className="text-center">分數</TableHead>
                      <TableHead>優先度</TableHead>
                      <TableHead className="hidden sm:table-cell">階段</TableHead>
                      <TableHead className="hidden xl:table-cell">負責人</TableHead>
                      <TableHead className="hidden xl:table-cell">下一步</TableHead>
                      <TableHead className="text-right hidden lg:table-cell">預計價值</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOpportunities.map((opp) => (
                      <TableRow key={opp.id} className="group">
                        <TableCell>
                          <Link href={`/needs/${opp.schoolId}`} className="font-medium text-foreground hover:text-primary">
                            {opp.schoolName}
                          </Link>
                          <p className="text-xs text-muted-foreground sm:hidden">{opp.district}</p>
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">{opp.district}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <MaturityBadge level={opp.maturityLevel} size="sm" />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
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
                        <TableCell className="hidden sm:table-cell">
                          <StageBadge stage={opp.stage} size="sm" />
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden xl:table-cell">{opp.owner || "-"}</TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="max-w-[150px]">
                            <p className="text-sm text-foreground truncate">{opp.nextAction || "-"}</p>
                            {opp.nextActionDate && (
                              <p className="text-xs text-muted-foreground">
                                {new Date(opp.nextActionDate).toLocaleDateString("zh-HK")}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium hidden lg:table-cell">
                          {opp.estimatedValue ? `$${opp.estimatedValue.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
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
                              <DropdownMenuItem onClick={() => handleOpenOutreach(opp)}>
                                <Mail className="h-4 w-4 mr-2" />
                                生成文案
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAddNote(opp)}>
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
          <KanbanBoard
            opportunities={filteredOpportunities}
            onOpenOutreach={handleOpenOutreach}
            onAddNote={handleAddNote}
          />
        )}
      </main>

      {/* Modals */}
      {selectedOpportunity && (
        <>
          <AIOutreachModal
            open={outreachModalOpen}
            onOpenChange={setOutreachModalOpen}
            schoolId={selectedOpportunity.schoolId}
            schoolName={selectedOpportunity.schoolName}
          />
          <FollowUpNoteModal
            open={noteModalOpen}
            onOpenChange={setNoteModalOpen}
            opportunityId={selectedOpportunity.id}
            schoolName={selectedOpportunity.schoolName}
            currentStage={selectedOpportunity.stage}
            onSuccess={handleNoteSuccess}
          />
        </>
      )}
    </div>
  )
}
