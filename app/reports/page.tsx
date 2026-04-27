"use client"

import { useState, useEffect } from "react"
import { 
  FileText, 
  Download, 
  Eye, 
  RefreshCw, 
  Filter, 
  Calendar,
  CheckCircle2,
  Clock,
  FileEdit
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { AppShell } from "@/components/layout/AppShell"
import { ScoreBadge } from "@/components/common/ScoreBadge"
import { LoadingState } from "@/components/common/LoadingState"
import { EmptyState } from "@/components/common/EmptyState"
import { getReports } from "@/lib/api"
import { DISTRICTS, CONFIDENCE_CONFIG } from "@/lib/constants"
import type { Report, ConfidenceLevel } from "@/lib/types"
import { cn } from "@/lib/utils"

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  Draft: { label: "草稿", icon: FileEdit, color: "text-amber-700", bgColor: "bg-amber-100" },
  Reviewed: { label: "已審核", icon: Clock, color: "text-sky-700", bgColor: "bg-sky-100" },
  Published: { label: "已發佈", icon: CheckCircle2, color: "text-emerald-700", bgColor: "bg-emerald-100" }
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  
  // Filters
  const [districtFilter, setDistrictFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [confidenceFilter, setConfidenceFilter] = useState("all")

  useEffect(() => {
    async function fetchReports() {
      setLoading(true)
      try {
        const data = await getReports()
        setReports(data)
      } catch (error) {
        console.error("Failed to fetch reports:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  const filteredReports = reports.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false
    if (confidenceFilter !== "all" && r.confidence !== confidenceFilter) return false
    if (periodFilter !== "all" && r.period !== periodFilter) return false
    return true
  })

  const periods = [...new Set(reports.map(r => r.period))]

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            報告庫
          </h1>
          <p className="text-muted-foreground">
            瀏覽及下載學校 SSRI 評估報告
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          
          <Select value={districtFilter} onValueChange={setDistrictFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="地區" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部地區</SelectItem>
              {DISTRICTS.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="報告期間" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部期間</SelectItem>
              {periods.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="狀態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部狀態</SelectItem>
              {Object.keys(statusConfig).map(s => (
                <SelectItem key={s} value={s}>{statusConfig[s].label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="信心" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部信心</SelectItem>
              {(Object.keys(CONFIDENCE_CONFIG) as ConfidenceLevel[]).map(c => (
                <SelectItem key={c} value={c}>{CONFIDENCE_CONFIG[c].label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="mb-4 text-sm text-muted-foreground">
            找到 <span className="font-medium text-foreground">{filteredReports.length}</span> 份報告
          </p>
        )}

        {/* Report List */}
        {loading ? (
          <LoadingState message="載入報告中..." />
        ) : filteredReports.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="沒有找到報告"
            description="請調整篩選條件或稍後再試"
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map(report => {
              const status = statusConfig[report.status]
              const StatusIcon = status.icon
              const confidence = CONFIDENCE_CONFIG[report.confidence]
              
              return (
                <Card key={report.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {report.schoolName}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{report.period}</span>
                        </div>
                      </div>
                      <ScoreBadge grade={report.grade} size="sm" />
                    </div>

                    <div className="mb-4 flex items-end gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {report.totalScore ?? "--"}
                      </span>
                      <span className="mb-0.5 text-sm text-muted-foreground">/ 100</span>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      <Badge 
                        variant="outline"
                        className={cn(status.color, status.bgColor)}
                      >
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={cn(confidence.color, confidence.bgColor)}
                      >
                        信心: {confidence.label}
                      </Badge>
                    </div>

                    <div className="mb-4 text-xs text-muted-foreground">
                      生成於 {new Date(report.generatedAt).toLocaleDateString("zh-TW")}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-1.5"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        預覽
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5" />
                        下載
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Report Preview Sheet */}
        <Sheet open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <SheetContent className="w-full sm:max-w-lg">
            {selectedReport && (
              <>
                <SheetHeader>
                  <SheetTitle>{selectedReport.schoolName}</SheetTitle>
                  <SheetDescription>
                    {selectedReport.period} SSRI 評估報告
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Score Summary */}
                  <div className="rounded-lg bg-muted/50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">SSRI 總分</span>
                      <ScoreBadge grade={selectedReport.grade} size="sm" />
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold text-primary">
                        {selectedReport.totalScore ?? "--"}
                      </span>
                      <span className="mb-1 text-muted-foreground">/ 100</span>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div>
                    <h4 className="mb-2 font-semibold">摘要</h4>
                    <p className="text-sm text-muted-foreground">
                      根據 SSRI 評估框架，{selectedReport.schoolName} 在本評估期間的整體表現
                      {selectedReport.grade === "Platinum" || selectedReport.grade === "Gold" 
                        ? "優良" 
                        : selectedReport.grade === "Silver" 
                          ? "良好" 
                          : "有改善空間"
                      }。
                      詳細分析請參閱完整報告。
                    </p>
                  </div>

                  {/* Key Findings */}
                  <div>
                    <h4 className="mb-2 font-semibold">主要發現</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                        社區連結方面表現突出
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                        學生支援系統健全
                      </li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      下載完整報告
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      要求更新
                    </Button>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AppShell>
  )
}
