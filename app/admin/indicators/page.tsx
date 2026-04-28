"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  GripVertical,
  AlertCircle
} from "lucide-react"
import { SSRI_DIMENSIONS } from "@/lib/constants"

interface Indicator {
  id: string
  name: string
  description: string
  weight: number
  dataSource: string
}

const mockIndicators: Record<string, Indicator[]> = {
  "student-wellbeing": [
    { id: "sw-1", name: "輔導服務質量", description: "學校輔導服務的完整性與可及性", weight: 25, dataSource: "ESR 報告" },
    { id: "sw-2", name: "心理健康支援", description: "心理健康資源與支援計劃", weight: 25, dataSource: "學校報告" },
    { id: "sw-3", name: "校園安全措施", description: "防欺凌政策與安全環境", weight: 30, dataSource: "新聞媒體" },
    { id: "sw-4", name: "學生支援多樣性", description: "SEN 支援與多元學習需要", weight: 20, dataSource: "教育局資料" },
  ],
  "teacher-development": [
    { id: "td-1", name: "教師培訓時數", description: "每年專業發展培訓時數", weight: 30, dataSource: "學校報告" },
    { id: "td-2", name: "教師流失率", description: "教師離職率與穩定性", weight: 25, dataSource: "教育局資料" },
    { id: "td-3", name: "專業資格比例", description: "持有相關專業資格教師比例", weight: 25, dataSource: "學校報告" },
    { id: "td-4", name: "教學創新", description: "教學方法創新與改進", weight: 20, dataSource: "ESR 報告" },
  ],
  "community-engagement": [
    { id: "ce-1", name: "家長參與度", description: "家長會活動與參與率", weight: 30, dataSource: "學校報告" },
    { id: "ce-2", name: "社區合作", description: "與社區機構合作項目數量", weight: 25, dataSource: "新聞媒體" },
    { id: "ce-3", name: "義工服務", description: "學生義工服務時數與計劃", weight: 25, dataSource: "學校報告" },
    { id: "ce-4", name: "校友網絡", description: "校友會活動與支援", weight: 20, dataSource: "學校網站" },
  ],
}

export default function AdminIndicatorsPage() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [weights, setWeights] = useState<Record<string, number>>({})

  const handleWeightChange = (id: string, value: number[]) => {
    setWeights(prev => ({ ...prev, [id]: value[0] }))
  }

  const totalWeight = (dimensionId: string) => {
    const indicators = mockIndicators[dimensionId] || []
    return indicators.reduce((sum, ind) => {
      return sum + (weights[ind.id] !== undefined ? weights[ind.id] : ind.weight)
    }, 0)
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">指標管理</h1>
            <p className="text-muted-foreground mt-1">設定 SSRI 評分維度與指標權重</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              重設為預設值
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              儲存變更
            </Button>
          </div>
        </div>

        {/* Dimension Cards */}
        <div className="space-y-6">
          <Accordion type="multiple" defaultValue={["student-wellbeing"]} className="space-y-4">
            {SSRI_DIMENSIONS.map((dimension) => {
              const indicators = mockIndicators[dimension.id] || []
              const total = totalWeight(dimension.id)
              const isValid = total === 100

              return (
                <AccordionItem key={dimension.id} value={dimension.id} className="border rounded-lg">
                  <Card className="border-0 shadow-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-4 w-full">
                        <div 
                          className="h-10 w-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${dimension.color}20`, color: dimension.color }}
                        >
                          <span className="text-lg font-bold">{dimension.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-foreground">{dimension.name}</h3>
                          <p className="text-sm text-muted-foreground">{dimension.description}</p>
                        </div>
                        <div className="flex items-center gap-2 mr-4">
                          <Badge variant="outline">權重: {dimension.weight}%</Badge>
                          {!isValid && (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              指標權重需等於 100%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {indicators.map((indicator) => {
                            const currentWeight = weights[indicator.id] !== undefined 
                              ? weights[indicator.id] 
                              : indicator.weight

                            return (
                              <div
                                key={indicator.id}
                                className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30"
                              >
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-foreground">{indicator.name}</h4>
                                    <Badge variant="secondary" className="text-xs">
                                      {indicator.dataSource}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {indicator.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4 w-48">
                                  <Slider
                                    value={[currentWeight]}
                                    onValueChange={(value) => handleWeightChange(indicator.id, value)}
                                    max={100}
                                    step={5}
                                    className="flex-1"
                                  />
                                  <span className="w-12 text-right font-mono text-sm">
                                    {currentWeight}%
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                          <Button variant="outline" className="w-full mt-4">
                            <Plus className="h-4 w-4 mr-2" />
                            新增指標
                          </Button>
                        </div>

                        {/* Total Weight Display */}
                        <div className={`mt-4 p-3 rounded-lg flex items-center justify-between ${
                          isValid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          <span>指標權重總和</span>
                          <span className="font-bold">{total}% / 100%</span>
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        {/* Add New Dimension */}
        <Card className="mt-6 border-dashed">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">新增評分維度</h3>
              <p className="text-sm text-muted-foreground mb-4">
                建立新的 SSRI 評分維度及其指標
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                新增維度
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
