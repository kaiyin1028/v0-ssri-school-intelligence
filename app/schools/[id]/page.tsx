"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Edit3,
  TrendingUp,
  Users,
  HeartHandshake,
  Network,
  Lightbulb,
  Leaf,
  ShieldCheck,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AppShell } from "@/components/layout/AppShell"
import { ScoreBadge } from "@/components/common/ScoreBadge"
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge"
import { LoadingState } from "@/components/common/LoadingState"
import { SchoolRadarChart } from "@/components/schools/SchoolRadarChart"
import { SchoolAISummary } from "@/components/schools/SchoolAISummary"
import { SchoolEvidenceTable } from "@/components/schools/SchoolEvidenceTable"
import { SchoolTimeline } from "@/components/schools/SchoolTimeline"
import { SchoolCard } from "@/components/schools/SchoolCard"
import { 
  getSchoolById, 
  getSchoolEvidence, 
  getSchoolAISummary, 
  getSchoolTimeline,
  getSimilarSchools,
  submitSchoolCorrection
} from "@/lib/api"
import { LEVEL_LABELS, TYPE_LABELS, DOMAIN_LABELS, CONFIDENCE_CONFIG } from "@/lib/constants"
import type { School, EvidenceItem, SchoolAISummary as SchoolAISummaryType, TimelineEvent, SSRIDomain } from "@/lib/types"
import { cn } from "@/lib/utils"

const domainIcons: Record<SSRIDomain, React.ElementType> = {
  Culture: Users,
  Inclusion: HeartHandshake,
  Community: Network,
  Innovation: Lightbulb,
  WholePerson: Leaf,
  Governance: ShieldCheck
}

export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [school, setSchool] = useState<School | null>(null)
  const [evidence, setEvidence] = useState<EvidenceItem[]>([])
  const [aiSummary, setAiSummary] = useState<SchoolAISummaryType | null>(null)
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [similarSchools, setSimilarSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [correctionOpen, setCorrectionOpen] = useState(false)
  const [correctionSubmitting, setCorrectionSubmitting] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [schoolData, evidenceData, summaryData, timelineData, similar] = await Promise.all([
          getSchoolById(resolvedParams.id),
          getSchoolEvidence(resolvedParams.id),
          getSchoolAISummary(resolvedParams.id),
          getSchoolTimeline(resolvedParams.id),
          getSimilarSchools(resolvedParams.id, 3)
        ])
        setSchool(schoolData)
        setEvidence(evidenceData)
        setAiSummary(summaryData)
        setTimeline(timelineData)
        setSimilarSchools(similar)
      } catch (error) {
        console.error("Failed to fetch school data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [resolvedParams.id])

  const handleCorrectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCorrectionSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    try {
      await submitSchoolCorrection(resolvedParams.id, {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as string,
        message: formData.get("message") as string
      })
      setCorrectionOpen(false)
      // TODO: Show success toast
    } catch (error) {
      console.error("Failed to submit correction:", error)
      // TODO: Show error toast
    } finally {
      setCorrectionSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-8">
          <LoadingState message="載入學校資料中..." />
        </div>
      </AppShell>
    )
  }

  if (!school) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">找不到學校</h1>
          <p className="mb-6 text-muted-foreground">此學校資料不存在或已被移除</p>
          <Link href="/schools">
            <Button>返回學校列表</Button>
          </Link>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link href="/schools" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          返回學校列表
        </Link>

        {/* School Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {school.nameZh}
              </h1>
              <ScoreBadge grade={school.grade} size="lg" />
            </div>
            <p className="mb-4 text-lg text-muted-foreground">{school.nameEn}</p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{school.district}</span>
              </div>
              <Badge variant="outline">{LEVEL_LABELS[school.level]}</Badge>
              <Badge variant="outline">{TYPE_LABELS[school.type]}</Badge>
              {school.religion && <Badge variant="outline">{school.religion}</Badge>}
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>更新於 {school.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {school.website && (
              <Button variant="outline" asChild>
                <a href={school.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  學校網站
                </a>
              </Button>
            )}
            <Dialog open={correctionOpen} onOpenChange={setCorrectionOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit3 className="mr-2 h-4 w-4" />
                  提交資料更正
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>提交資料更正</DialogTitle>
                  <DialogDescription>
                    如發現資料有誤或希望補充資料，請填寫以下表格
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCorrectionSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">電郵</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">身份</Label>
                    <Select name="role" required>
                      <SelectTrigger>
                        <SelectValue placeholder="請選擇" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">學校代表</SelectItem>
                        <SelectItem value="parent">家長</SelectItem>
                        <SelectItem value="teacher">教師</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">更正內容</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={4}
                      placeholder="請描述需要更正或補充的資料..."
                      required 
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setCorrectionOpen(false)}>
                      取消
                    </Button>
                    <Button type="submit" disabled={correctionSubmitting}>
                      {correctionSubmitting ? "提交中..." : "提交"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Score Overview & Radar Chart */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          {/* Score Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">SSRI 總分</CardTitle>
              <CardDescription>School Social Responsibility Index</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-end gap-3">
                <span className="text-5xl font-bold text-primary">
                  {school.totalScore !== null ? school.totalScore : "--"}
                </span>
                <span className="mb-2 text-xl text-muted-foreground">/ 100</span>
              </div>
              
              <div className="mb-4 flex flex-wrap gap-2">
                <ScoreBadge grade={school.grade} />
                <ConfidenceBadge confidence={school.confidence} />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>較上期 +3 分</span>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  評估期間: 2023-24 學年
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <div className="lg:col-span-2">
            <SchoolRadarChart 
              domainScores={school.domainScores}
              height={320}
            />
          </div>
        </div>

        {/* Domain Breakdown */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">範疇詳情</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {school.domainScores.map((ds) => {
              const Icon = domainIcons[ds.domain]
              const confidenceConfig = CONFIDENCE_CONFIG[ds.confidence]
              return (
                <Card key={ds.domain}>
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          ds.score !== null ? "bg-primary/10" : "bg-muted"
                        )}>
                          <Icon className={cn(
                            "h-5 w-5",
                            ds.score !== null ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <div>
                          <h3 className="font-medium">{ds.labelZh}</h3>
                          <p className="text-xs text-muted-foreground">
                            {DOMAIN_LABELS[ds.domain].description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 flex items-end gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        {ds.score !== null ? ds.score : "--"}
                      </span>
                      <span className="mb-0.5 text-sm text-muted-foreground">/ 100</span>
                    </div>

                    <Progress 
                      value={ds.score || 0} 
                      className="mb-3 h-2"
                    />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{ds.evidenceCount} 項證據</span>
                      <span className={confidenceConfig.color}>
                        信心: {confidenceConfig.label}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Tabs for AI Summary, Evidence, Timeline */}
        <Tabs defaultValue="ai-summary" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="ai-summary">AI 分析</TabsTrigger>
            <TabsTrigger value="evidence">證據列表</TabsTrigger>
            <TabsTrigger value="timeline">更新記錄</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-summary">
            <SchoolAISummary summary={aiSummary} />
          </TabsContent>

          <TabsContent value="evidence">
            <SchoolEvidenceTable evidence={evidence} />
          </TabsContent>

          <TabsContent value="timeline">
            <SchoolTimeline events={timeline} />
          </TabsContent>
        </Tabs>

        {/* Similar Schools */}
        {similarSchools.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">相似學校</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similarSchools.map((s) => (
                <SchoolCard key={s.id} school={s} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="flex items-start gap-3 p-4">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
              <X className="h-3.5 w-3.5 text-amber-600" />
            </div>
            <div className="text-sm text-amber-800">
              <p className="font-medium">重要聲明</p>
              <p className="mt-1 text-amber-700">
                SSRI 評分基於公開資料分析，不應作為唯一選校依據。
                資料不足不代表學校沒有相關工作，建議向學校查詢進一步資料。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
