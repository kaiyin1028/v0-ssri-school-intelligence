"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingState } from "@/components/common/LoadingState"
import { getNeedModelConfig, updateNeedModelConfig, testNeedModel } from "@/lib/api"
import { NEED_DIMENSION_LABELS, SIGNAL_CATEGORY_LABELS, SIGNAL_SOURCE_LABELS } from "@/lib/constants"
import type { NeedModelConfig, NeedDimension, SignalCategory, SignalSource } from "@/lib/types"
import { 
  Save, 
  RotateCcw, 
  TestTube2, 
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Settings2
} from "lucide-react"

export default function NeedModelConfigPage() {
  const [config, setConfig] = useState<NeedModelConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ before: any; after: any; changes: string[] } | null>(null)
  const [testSchoolId, setTestSchoolId] = useState("sch-001")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    setLoading(true)
    const data = await getNeedModelConfig()
    setConfig(data)
    setLoading(false)
  }

  const handleDimensionWeightChange = (dimension: NeedDimension, value: number) => {
    if (!config) return
    setConfig({
      ...config,
      dimensionWeights: {
        ...config.dimensionWeights,
        [dimension]: value
      }
    })
    setHasChanges(true)
  }

  const handleCategoryWeightChange = (category: SignalCategory, value: number) => {
    if (!config) return
    setConfig({
      ...config,
      signalCategoryWeights: {
        ...config.signalCategoryWeights,
        [category]: value
      }
    })
    setHasChanges(true)
  }

  const handleSourceWeightChange = (source: SignalSource, value: number) => {
    if (!config) return
    setConfig({
      ...config,
      sourceReliabilityWeights: {
        ...config.sourceReliabilityWeights,
        [source]: value
      }
    })
    setHasChanges(true)
  }

  const handleRecencyWeightChange = (key: keyof NeedModelConfig["recencyWeights"], value: number) => {
    if (!config) return
    setConfig({
      ...config,
      recencyWeights: {
        ...config.recencyWeights,
        [key]: value
      }
    })
    setHasChanges(true)
  }

  const handleKeywordToggle = (keywordId: string, active: boolean) => {
    if (!config) return
    setConfig({
      ...config,
      keywordRules: config.keywordRules.map(kw => 
        kw.id === keywordId ? { ...kw, active } : kw
      )
    })
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!config) return
    setSaving(true)
    await updateNeedModelConfig(config)
    setSaving(false)
    setHasChanges(false)
  }

  const handleReset = () => {
    loadConfig()
    setHasChanges(false)
  }

  const handleTest = async () => {
    setTesting(true)
    const result = await testNeedModel(testSchoolId)
    setTestResult(result)
    setTesting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LoadingState message="載入模型設定..." />
        </main>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <p>無法載入模型設定</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">需求模型設定</h1>
            <p className="mt-2 text-muted-foreground">
              調整 AI 教育需求分析模型的權重與規則
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="text-amber-600">
                <AlertTriangle className="mr-1 h-3 w-3" />
                未儲存變更
              </Badge>
            )}
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
              <RotateCcw className="mr-2 h-4 w-4" />
              重設
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "儲存中..." : "儲存變更"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dimensions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dimensions">需求維度權重</TabsTrigger>
            <TabsTrigger value="categories">訊號分類權重</TabsTrigger>
            <TabsTrigger value="sources">來源可靠度</TabsTrigger>
            <TabsTrigger value="recency">時效性權重</TabsTrigger>
            <TabsTrigger value="keywords">關鍵字規則</TabsTrigger>
            <TabsTrigger value="test">模型測試</TabsTrigger>
          </TabsList>

          <TabsContent value="dimensions">
            <Card>
              <CardHeader>
                <CardTitle>需求維度權重</CardTitle>
                <CardDescription>
                  調整各需求維度在整體分數計算中的權重（0.5 - 2.0）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(config.dimensionWeights).map(([dimension, weight]) => (
                    <div key={dimension} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{NEED_DIMENSION_LABELS[dimension as NeedDimension]?.zh || dimension}</Label>
                        <span className="text-sm font-medium">{weight.toFixed(2)}</span>
                      </div>
                      <Slider
                        value={[weight]}
                        min={0.5}
                        max={2}
                        step={0.1}
                        onValueChange={([v]) => handleDimensionWeightChange(dimension as NeedDimension, v)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>訊號分類權重</CardTitle>
                <CardDescription>
                  調整不同訊號分類的權重（0.1 - 2.0）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(config.signalCategoryWeights).map(([category, weight]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{SIGNAL_CATEGORY_LABELS[category as SignalCategory] || category}</Label>
                        <span className="text-sm font-medium">{weight.toFixed(2)}</span>
                      </div>
                      <Slider
                        value={[weight]}
                        min={0.1}
                        max={2}
                        step={0.1}
                        onValueChange={([v]) => handleCategoryWeightChange(category as SignalCategory, v)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>來源可靠度權重</CardTitle>
                <CardDescription>
                  調整不同訊號來源的可靠度評分（0.1 - 1.0）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(config.sourceReliabilityWeights).map(([source, weight]) => (
                    <div key={source} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{SIGNAL_SOURCE_LABELS[source as SignalSource] || source}</Label>
                        <span className="text-sm font-medium">{weight.toFixed(2)}</span>
                      </div>
                      <Slider
                        value={[weight]}
                        min={0.1}
                        max={1}
                        step={0.05}
                        onValueChange={([v]) => handleSourceWeightChange(source as SignalSource, v)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recency">
            <Card>
              <CardHeader>
                <CardTitle>時效性權重</CardTitle>
                <CardDescription>
                  調整訊號時效性對分數的影響（0.0 - 1.0）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>0-3 個月</Label>
                      <span className="text-sm font-medium">{config.recencyWeights.zeroToThreeMonths.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[config.recencyWeights.zeroToThreeMonths]}
                      min={0}
                      max={1}
                      step={0.05}
                      onValueChange={([v]) => handleRecencyWeightChange("zeroToThreeMonths", v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>3-6 個月</Label>
                      <span className="text-sm font-medium">{config.recencyWeights.threeToSixMonths.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[config.recencyWeights.threeToSixMonths]}
                      min={0}
                      max={1}
                      step={0.05}
                      onValueChange={([v]) => handleRecencyWeightChange("threeToSixMonths", v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>6-12 個月</Label>
                      <span className="text-sm font-medium">{config.recencyWeights.sixToTwelveMonths.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[config.recencyWeights.sixToTwelveMonths]}
                      min={0}
                      max={1}
                      step={0.05}
                      onValueChange={([v]) => handleRecencyWeightChange("sixToTwelveMonths", v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>12 個月以上</Label>
                      <span className="text-sm font-medium">{config.recencyWeights.twelveMonthsPlus.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[config.recencyWeights.twelveMonthsPlus]}
                      min={0}
                      max={1}
                      step={0.05}
                      onValueChange={([v]) => handleRecencyWeightChange("twelveMonthsPlus", v)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  關鍵字規則
                  <Button size="sm">
                    <Plus className="mr-1 h-4 w-4" />
                    新增規則
                  </Button>
                </CardTitle>
                <CardDescription>
                  管理關鍵字與需求維度的對應規則
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>關鍵字</TableHead>
                      <TableHead>對應維度</TableHead>
                      <TableHead>權重</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {config.keywordRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.keyword}</TableCell>
                        <TableCell>
                          {NEED_DIMENSION_LABELS[rule.mappedNeedDimension]?.zh || rule.mappedNeedDimension}
                        </TableCell>
                        <TableCell>{rule.weight.toFixed(1)}</TableCell>
                        <TableCell>
                          <Switch
                            checked={rule.active}
                            onCheckedChange={(checked) => handleKeywordToggle(rule.id, checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test">
            <Card>
              <CardHeader>
                <CardTitle>模型測試</CardTitle>
                <CardDescription>
                  使用當前設定測試單一學校的分數計算結果
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label>測試學校 ID</Label>
                      <Select value={testSchoolId} onValueChange={setTestSchoolId}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sch-001">sch-001 (明德書院)</SelectItem>
                          <SelectItem value="sch-002">sch-002 (港島共融中學)</SelectItem>
                          <SelectItem value="sch-003">sch-003 (九龍創新書院)</SelectItem>
                          <SelectItem value="sch-004">sch-004 (新界仁愛小學)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleTest} disabled={testing}>
                      <TestTube2 className="mr-2 h-4 w-4" />
                      {testing ? "測試中..." : "執行測試"}
                    </Button>
                  </div>

                  {testResult && (
                    <div className="rounded-lg border p-4">
                      <h4 className="mb-3 font-medium">測試結果</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-muted-foreground">調整前商機分數</p>
                          <p className="text-2xl font-bold">
                            {testResult.before?.opportunityScore || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">調整後商機分數</p>
                          <p className="text-2xl font-bold text-primary">
                            {testResult.after?.opportunityScore || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">變更摘要</p>
                        <ul className="mt-1 list-inside list-disc text-sm">
                          {testResult.changes.map((change, i) => (
                            <li key={i}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
