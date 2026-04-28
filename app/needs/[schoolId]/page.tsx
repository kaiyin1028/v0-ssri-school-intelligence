"use client"

import { use } from "react"
import Link from "next/link"
import useSWR from "swr"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NeedRadarChart } from "@/components/needs/NeedRadarChart"
import { NeedSummaryCard } from "@/components/needs/NeedSummaryCard"
import { SignalTimeline } from "@/components/needs/SignalTimeline"
import { SolutionCard } from "@/components/needs/SolutionCard"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge"
import { StageBadge } from "@/components/common/StageBadge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { LoadingState } from "@/components/common/LoadingState"
import { 
  getNeedProfileBySchoolId, 
  getSchoolById, 
  getSchoolSignals, 
  getSolutions,
  getOpportunityById,
  reanalyzeSchoolNeeds
} from "@/lib/api"
import { NEED_DIMENSION_LABELS } from "@/lib/constants"
import { 
  ArrowLeft, 
  RefreshCw, 
  Mail, 
  Plus, 
  ExternalLink,
  MapPin,
  Calendar,
  Lock,
  AlertTriangle,
  GraduationCap,
  BookOpenCheck,
  Trophy,
  ShieldAlert,
  MonitorCog,
  PanelsTopLeft,
  Lightbulb,
  LockKeyhole,
  Users,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { NeedDimension } from "@/lib/types"
import { useState } from "react"
import { AIOutreachModal } from "@/components/modals/AIOutreachModal"
import { SolutionDetailModal } from "@/components/modals/SolutionDetailModal"
import type { Solution } from "@/lib/types"

const dimensionIcons: Record<NeedDimension, React.ElementType> = {
  TeacherTraining: GraduationCap,
  AICurriculum: BookOpenCheck,
  StudentCompetition: Trophy,
  AIPolicy: ShieldAlert,
  Hardware: MonitorCog,
  SoftwarePlatform: PanelsTopLeft,
  SchoolBasedConsulting: Lightbulb,
  SafetyCompliance: LockKeyhole
}

export default function SchoolNeedDetailPage({ 
  params 
}: { 
  params: Promise<{ schoolId: string }> 
}) {
  const { schoolId } = use(params)
  const [isReanalyzing, setIsReanalyzing] = useState(false)
  const [outreachModalOpen, setOutreachModalOpen] = useState(false)
  const [solutionModalOpen, setSolutionModalOpen] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)

  const { data: profile, isLoading: profileLoading, mutate: mutateProfile } = useSWR(
    `needProfile-${schoolId}`, 
    () => getNeedProfileBySchoolId(schoolId)
  )
  const { data: school, isLoading: schoolLoading } = useSWR(
    `school-${schoolId}`, 
    () => getSchoolById(schoolId)
  )
  const { data: signals } = useSWR(
    `signals-${schoolId}`, 
    () => getSchoolSignals(schoolId)
  )
  const { data: allSolutions } = useSWR("solutions", getSolutions)

  const isLoading = profileLoading || schoolLoading
  const recommendedSolutions = allSolutions?.filter(s => 
    profile?.recommendedSolutionIds.includes(s.id)
  ) || []

  const handleReanalyze = async () => {
    setIsReanalyzing(true)
    try {
      await reanalyzeSchoolNeeds(schoolId)
      await mutateProfile()
    } finally {
      setIsReanalyzing(false)
    }
  }

  const handleViewSolution = (solution: Solution) => {
    setSelectedSolution(solution)
    setSolutionModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LoadingState message="載入學校需求分析..." />
        </main>
      </div>
    )
  }

  if (!profile || !school) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground">找不到該學校的需求分析</h2>
            <Link href="/needs">
              <Button variant="link" className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回需求雷達
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/needs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          返回需求雷達
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{school.nameZh}</h1>
              <p className="text-lg text-muted-foreground">{school.nameEn}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {school.district}
                </span>
                <span>{school.level === "Primary" ? "小學" : school.level === "Secondary" ? "中學" : school.level === "Special" ? "特殊學校" : "國際學校"}</span>
                <span>{school.type === "Government" ? "官立" : school.type === "Aided" ? "資助" : school.type === "DSS" ? "直資" : school.type === "Private" ? "私立" : "國際"}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleReanalyze} disabled={isReanalyzing}>
                <RefreshCw className={cn("h-4 w-4 mr-2", isReanalyzing && "animate-spin")} />
                重新分析
              </Button>
              <Button variant="outline" onClick={() => setOutreachModalOpen(true)}>
                <Mail className="h-4 w-4 mr-2" />
                生成聯絡文案
              </Button>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                加入跟進
              </Button>
              <Link href={`/schools/${school.id}`}>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  查看 SSRI 檔案
                </Button>
              </Link>
            </div>
          </div>

          {/* Caution Banner */}
          <div className="flex items-start gap-2 mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>此分析根據公開資料及系統訊號推斷，並不代表學校已確認有相關採購或服務需求。</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">AI 成熟度</p>
              <MaturityBadge level={profile.maturityLevel} showDescription />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">需求分數</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">{profile.overallNeedScore}</span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                商機分數
                <Lock className="h-3 w-3" />
                <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded">內部</span>
              </p>
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-3xl font-bold",
                  profile.opportunityScore >= 75 ? "text-emerald-600" : 
                  profile.opportunityScore >= 50 ? "text-sky-600" : "text-slate-500"
                )}>
                  {profile.opportunityScore}
                </span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">資料信心</p>
              <ConfidenceBadge level={profile.confidence} showLabel size="lg" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">最後分析</p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  {new Date(profile.lastAnalyzedAt).toLocaleDateString("zh-HK")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Radar & Summary */}
          <div className="lg:col-span-2 space-y-6">
            <NeedRadarChart 
              dimensions={profile.needDimensions}
              description="根據公開資料訊號推斷各維度的潛在需要程度"
            />
            
            <NeedSummaryCard profile={profile} />

            {/* Dimension Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">需求維度分析</CardTitle>
                <CardDescription>八大 AI 教育需求維度的詳細分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {profile.needDimensions.map((dim) => {
                    const Icon = dimensionIcons[dim.dimension]
                    const config = NEED_DIMENSION_LABELS[dim.dimension]
                    return (
                      <Card key={dim.dimension} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{config.zh}</p>
                                <p className="text-xs text-muted-foreground">{config.en}</p>
                              </div>
                            </div>
                            <ConfidenceBadge level={dim.confidence} size="sm" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">分數</span>
                              <span className="font-medium text-foreground">{dim.score}/100</span>
                            </div>
                            <Progress value={dim.score} className="h-2" />
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>訊號數：{dim.signalCount}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{dim.explanation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Timeline & Solutions */}
          <div className="space-y-6">
            <SignalTimeline signals={signals || []} maxItems={6} />

            {/* Recommended Solutions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  建議服務方案
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedSolutions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">暫無推薦方案</p>
                ) : (
                  recommendedSolutions.map((solution) => (
<SolutionCard
                    key={solution.id}
                    solution={solution}
                    matchReason="根據學校需求維度及成熟度匹配"
                    onViewDetails={() => handleViewSolution(solution)}
                    onGenerateEmail={() => {
                      setSelectedSolution(solution)
                      setOutreachModalOpen(true)
                    }}
                    />
                  ))
                )}
              </CardContent>
            </Card>

            {/* SSRI Context */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SSRI 評分參考</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">SSRI 總分</span>
                  <span className="font-medium text-foreground">
                    {school.totalScore ? `${school.totalScore}/100` : "資料不足"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">SSRI 等級</span>
                  <Badge variant="outline">{school.grade}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  SSRI 分數反映學校整體社會責任表現，可作為了解學校背景的參考。
                </p>
                <Link href={`/schools/${school.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    查看完整 SSRI 報告
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AIOutreachModal
        open={outreachModalOpen}
        onOpenChange={setOutreachModalOpen}
        schoolId={schoolId}
        schoolName={school.nameZh}
      />

      <SolutionDetailModal
        open={solutionModalOpen}
        onOpenChange={setSolutionModalOpen}
        solution={selectedSolution}
        onGenerateEmail={(solutionId) => {
          setSolutionModalOpen(false)
          setOutreachModalOpen(true)
        }}
      />
    </div>
  )
}
