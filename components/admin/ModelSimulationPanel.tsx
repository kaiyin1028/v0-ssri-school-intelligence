"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { testNeedModel } from "@/lib/api"
import { NEED_DIMENSION_LABELS } from "@/lib/constants"
import type { NeedDimension } from "@/lib/types"
import { 
  TestTube2, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  BarChart3,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TestResult {
  before: {
    opportunityScore: number
    dimensions: { dimension: NeedDimension; score: number }[]
    priority: string
  }
  after: {
    opportunityScore: number
    dimensions: { dimension: NeedDimension; score: number }[]
    priority: string
  }
  changes: string[]
}

interface ModelSimulationPanelProps {
  onRunTest: (schoolId: string) => Promise<TestResult>
}

const testSchools = [
  { id: "sch-001", name: "明德書院" },
  { id: "sch-002", name: "港島共融中學" },
  { id: "sch-003", name: "九龍創新書院" },
  { id: "sch-004", name: "新界仁愛小學" },
  { id: "sch-005", name: "天水圍數位小學" }
]

export function ModelSimulationPanel({ onRunTest }: ModelSimulationPanelProps) {
  const [selectedSchool, setSelectedSchool] = useState(testSchools[0].id)
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTest = async () => {
    setTesting(true)
    setError(null)
    try {
      const testResult = await onRunTest(selectedSchool)
      setResult(testResult)
    } catch (err) {
      setError("測試執行失敗，請檢查模型設定")
    } finally {
      setTesting(false)
    }
  }

  const getScoreChange = (before: number, after: number) => {
    const diff = after - before
    if (diff > 0) return { icon: TrendingUp, color: "text-emerald-600", label: `+${diff}` }
    if (diff < 0) return { icon: TrendingDown, color: "text-red-600", label: `${diff}` }
    return { icon: Minus, color: "text-muted-foreground", label: "0" }
  }

  const schoolName = testSchools.find(s => s.id === selectedSchool)?.name || selectedSchool

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube2 className="h-5 w-5 text-primary" />
          模型模擬測試
        </CardTitle>
        <CardDescription>
          在套用變更前，先測試模型對特定學校的影響
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Test Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label className="mb-2 block">測試學校</Label>
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {testSchools.map(school => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name} ({school.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleTest} disabled={testing} className="w-full sm:w-auto">
              {testing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  測試中...
                </>
              ) : (
                <>
                  <TestTube2 className="h-4 w-4 mr-2" />
                  執行測試
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>測試失敗</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Before */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">調整前</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      {result.before.opportunityScore}
                    </span>
                    <Badge variant="outline">{result.before.priority}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  {(() => {
                    const change = getScoreChange(
                      result.before.opportunityScore, 
                      result.after.opportunityScore
                    )
                    const Icon = change.icon
                    return (
                      <div className={cn("flex items-center gap-1", change.color)}>
                        <Icon className="h-5 w-5" />
                        <span className="font-semibold">{change.label}</span>
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* After */}
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">調整後</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {result.after.opportunityScore}
                    </span>
                    <Badge variant={
                      result.after.priority !== result.before.priority ? "default" : "outline"
                    }>
                      {result.after.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Arrow */}
            <div className="flex md:hidden items-center justify-center">
              {(() => {
                const change = getScoreChange(
                  result.before.opportunityScore, 
                  result.after.opportunityScore
                )
                const Icon = change.icon
                return (
                  <div className={cn("flex items-center gap-2", change.color)}>
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">分數變化：{change.label}</span>
                  </div>
                )
              })()}
            </div>

            {/* Dimension Comparison */}
            <Tabs defaultValue="comparison">
              <TabsList>
                <TabsTrigger value="comparison">維度對比</TabsTrigger>
                <TabsTrigger value="changes">變更摘要</TabsTrigger>
              </TabsList>
              
              <TabsContent value="comparison" className="mt-4">
                <div className="space-y-3">
                  {result.after.dimensions.map((afterDim, idx) => {
                    const beforeDim = result.before.dimensions[idx]
                    const change = getScoreChange(beforeDim.score, afterDim.score)
                    const Icon = change.icon
                    
                    return (
                      <div key={afterDim.dimension} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {NEED_DIMENSION_LABELS[afterDim.dimension]?.zh || afterDim.dimension}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{beforeDim.score}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">{afterDim.score}</span>
                            <div className={cn("flex items-center", change.color)}>
                              <Icon className="h-3 w-3" />
                              <span className="text-xs ml-0.5">{change.label}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 h-2">
                          <Progress 
                            value={beforeDim.score} 
                            className="flex-1 h-2 bg-muted"
                          />
                          <Progress 
                            value={afterDim.score} 
                            className="flex-1 h-2"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="changes" className="mt-4">
                <div className="space-y-2">
                  {result.changes.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      沒有顯著變更
                    </p>
                  ) : (
                    result.changes.map((change, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2 text-sm p-2 rounded-md bg-muted/50"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{change}</span>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setResult(null)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                清除結果
              </Button>
              <Button variant="outline" onClick={handleTest}>
                <TestTube2 className="h-4 w-4 mr-2" />
                重新測試
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !testing && !error && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h4 className="font-medium text-foreground mb-1">尚未執行測試</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              選擇一間學校並執行測試，查看當前模型設定對商機分數的影響
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
