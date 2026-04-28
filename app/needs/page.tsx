"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { NeedCard } from "@/components/needs/NeedCard"
import { LoadingState, CardSkeleton } from "@/components/common/LoadingState"
import { EmptyState } from "@/components/common/EmptyState"
import { getNeedProfiles, getNeedsStats, getSchools, getOpportunities } from "@/lib/api"
import { DISTRICTS, MATURITY_LEVEL_CONFIG, NEED_DIMENSION_LABELS, PRIORITY_CONFIG, OPPORTUNITY_STAGE_CONFIG } from "@/lib/constants"
import type { SchoolNeedProfile, School, Opportunity, AIMaturityLevel, NeedDimension } from "@/lib/types"
import { 
  School as SchoolIcon, 
  Activity, 
  Target, 
  AlertCircle, 
  ShieldCheck,
  Search,
  LayoutGrid,
  List,
  Info,
  Filter,
  RotateCcw,
  X,
  SlidersHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function NeedsRadarPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedMaturity, setSelectedMaturity] = useState<string>("all")
  const [selectedDimension, setSelectedDimension] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const { data: profiles, isLoading: profilesLoading } = useSWR("needProfiles", getNeedProfiles)
  const { data: stats, isLoading: statsLoading } = useSWR("needsStats", getNeedsStats)
  const { data: schools } = useSWR("schools", () => getSchools())
  const { data: opportunities } = useSWR("opportunities", getOpportunities)

  const schoolMap = new Map(schools?.map(s => [s.id, s]) || [])
  const opportunityMap = new Map(opportunities?.map(o => [o.schoolId, o]) || [])

  const activeFilterCount = [
    selectedDistrict, 
    selectedLevel, 
    selectedMaturity, 
    selectedDimension, 
    selectedPriority
  ].filter(v => v !== "all").length

  const resetFilters = () => {
    setSelectedDistrict("all")
    setSelectedLevel("all")
    setSelectedMaturity("all")
    setSelectedDimension("all")
    setSelectedPriority("all")
    setSearchQuery("")
  }

  const filteredProfiles = profiles?.filter(profile => {
    const school = schoolMap.get(profile.schoolId)
    if (!school) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!school.nameZh.includes(query) && !school.nameEn.toLowerCase().includes(query)) {
        return false
      }
    }

    if (selectedDistrict !== "all" && school.district !== selectedDistrict) return false
    if (selectedLevel !== "all" && school.level !== selectedLevel) return false
    if (selectedMaturity !== "all" && profile.maturityLevel !== selectedMaturity) return false
    
    if (selectedDimension !== "all") {
      const topDimension = profile.needDimensions.sort((a, b) => b.score - a.score)[0]
      if (topDimension.dimension !== selectedDimension) return false
    }

    if (selectedPriority !== "all") {
      const opp = opportunityMap.get(profile.schoolId)
      if (!opp || opp.priority !== selectedPriority) return false
    }

    return true
  }) || []

  const statCards = [
    {
      title: "已分析學校",
      value: stats?.totalSchoolsAnalyzed || 0,
      icon: SchoolIcon,
      color: "text-sky-600",
      bgColor: "bg-sky-100",
      change: "+12 本月"
    },
    {
      title: "本月新增訊號",
      value: stats?.newSignalsThisMonth || 0,
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      change: "+23%"
    },
    {
      title: "高優先商機",
      value: stats?.highPriorityOpportunities || 0,
      icon: Target,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      change: "+3 本週"
    },
    {
      title: "待人工確認",
      value: stats?.needsManualReview || 0,
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "-2 已處理"
    },
    {
      title: "平均資料信心",
      value: `${stats?.averageConfidence || 0}%`,
      icon: ShieldCheck,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      change: "+5%"
    }
  ]

  // Filter component for reuse
  const FilterControls = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn(
      "flex flex-col gap-4",
      !isMobile && "flex-row flex-wrap items-center"
    )}>
      {isMobile && (
        <div className="space-y-2">
          <label className="text-sm font-medium">搜尋</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋學校名稱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}
      
      <div className={cn(!isMobile && "hidden lg:block", isMobile && "space-y-2")}>
        {isMobile && <label className="text-sm font-medium">地區</label>}
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className={cn(isMobile ? "w-full" : "w-[140px]")}>
            <SelectValue placeholder="地區" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有地區</SelectItem>
            {DISTRICTS.map(d => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn(!isMobile && "hidden md:block", isMobile && "space-y-2")}>
        {isMobile && <label className="text-sm font-medium">學校類型</label>}
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className={cn(isMobile ? "w-full" : "w-[120px]")}>
            <SelectValue placeholder="學校類型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有類型</SelectItem>
            <SelectItem value="Primary">小學</SelectItem>
            <SelectItem value="Secondary">中學</SelectItem>
            <SelectItem value="Special">特殊學校</SelectItem>
            <SelectItem value="International">國際學校</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={cn(isMobile && "space-y-2")}>
        {isMobile && <label className="text-sm font-medium">AI 成熟度</label>}
        <Select value={selectedMaturity} onValueChange={setSelectedMaturity}>
          <SelectTrigger className={cn(isMobile ? "w-full" : "w-[130px]")}>
            <SelectValue placeholder="AI 成熟度" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有成熟度</SelectItem>
            {(Object.keys(MATURITY_LEVEL_CONFIG) as AIMaturityLevel[]).map(level => (
              <SelectItem key={level} value={level}>
                {MATURITY_LEVEL_CONFIG[level].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn(!isMobile && "hidden xl:block", isMobile && "space-y-2")}>
        {isMobile && <label className="text-sm font-medium">主要需要</label>}
        <Select value={selectedDimension} onValueChange={setSelectedDimension}>
          <SelectTrigger className={cn(isMobile ? "w-full" : "w-[140px]")}>
            <SelectValue placeholder="主要需要" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有維度</SelectItem>
            {(Object.keys(NEED_DIMENSION_LABELS) as NeedDimension[]).map(dim => (
              <SelectItem key={dim} value={dim}>
                {NEED_DIMENSION_LABELS[dim].zh}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn(!isMobile && "hidden xl:block", isMobile && "space-y-2")}>
        {isMobile && <label className="text-sm font-medium">優先度</label>}
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className={cn(isMobile ? "w-full" : "w-[110px]")}>
            <SelectValue placeholder="優先度" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有優先度</SelectItem>
            <SelectItem value="High">高優先</SelectItem>
            <SelectItem value="Medium">中優先</SelectItem>
            <SelectItem value="Low">低優先</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">AI 教育需求雷達</h1>
          <p className="mt-2 text-muted-foreground">
            根據學校公開活動、課程、招標、比賽及培訓訊號，推斷潛在 AI 教育服務需要。
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <Icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">{stat.change}</span>
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
              {/* Search - Always visible */}
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋學校名稱..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              {/* Desktop Filters */}
              <div className="hidden md:contents">
                <FilterControls />
              </div>

              {/* Reset button - Desktop */}
              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="hidden md:flex"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  重設
                </Button>
              )}

              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden relative">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    篩選
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
                  <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        篩選條件
                      </span>
                      <Button variant="ghost" size="sm" onClick={resetFilters}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        重設
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4 overflow-y-auto max-h-[calc(80vh-150px)]">
                    <FilterControls isMobile />
                  </div>
                  <SheetFooter className="mt-4">
                    <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                      套用篩選（{filteredProfiles.length} 個結果）
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              {/* View Toggle */}
              <div className="flex items-center gap-1 ml-auto">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  title="網格視圖"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  title="列表視圖"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t">
                <span className="text-xs text-muted-foreground">已套用篩選：</span>
                {selectedDistrict !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedDistrict}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedDistrict("all")} 
                    />
                  </Badge>
                )}
                {selectedLevel !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedLevel === "Primary" ? "小學" : selectedLevel === "Secondary" ? "中學" : selectedLevel === "Special" ? "特殊學校" : "國際學校"}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedLevel("all")} 
                    />
                  </Badge>
                )}
                {selectedMaturity !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {MATURITY_LEVEL_CONFIG[selectedMaturity as AIMaturityLevel]?.label}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedMaturity("all")} 
                    />
                  </Badge>
                )}
                {selectedDimension !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {NEED_DIMENSION_LABELS[selectedDimension as NeedDimension]?.zh}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedDimension("all")} 
                    />
                  </Badge>
                )}
                {selectedPriority !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedPriority === "High" ? "高優先" : selectedPriority === "Medium" ? "中優先" : "低優先"}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedPriority("all")} 
                    />
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Note */}
        <div className="flex items-start gap-2 mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>
            需求雷達結果由公開資料、訊號規則及 AI 初步分析生成，只作內部服務配對及跟進參考。商機分數僅供內部使用。
          </p>
        </div>

        {/* Results */}
        {profilesLoading ? (
          <div className={cn(
            viewMode === "grid" 
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
              : "flex flex-col gap-4"
          )}>
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProfiles.length === 0 ? (
          <EmptyState 
            variant="filter"
            title="沒有符合條件的學校"
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
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              顯示 {filteredProfiles.length} 間學校
            </p>
            <div className={cn(
              viewMode === "grid" 
                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col gap-4"
            )}>
              {filteredProfiles.map((profile) => {
                const school = schoolMap.get(profile.schoolId)
                const opportunity = opportunityMap.get(profile.schoolId)
                if (!school) return null
                return (
                  <NeedCard
                    key={profile.schoolId}
                    profile={profile}
                    school={school}
                    opportunity={opportunity}
                  />
                )
              })}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
