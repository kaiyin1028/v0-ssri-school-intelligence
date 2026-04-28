"use client"

import { useState } from "react"
import useSWR from "swr"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { LoadingState } from "@/components/common/LoadingState"
import { getSolutions } from "@/lib/api"
import { LEVEL_LABELS, MATURITY_LEVEL_CONFIG, NEED_DIMENSION_LABELS } from "@/lib/constants"
import type { Solution, AIMaturityLevel, NeedDimension, SchoolLevel } from "@/lib/types"
import { 
  Briefcase, 
  Search, 
  Clock, 
  DollarSign, 
  MapPin,
  CheckCircle,
  Target,
  Eye,
  FileText,
  Mail,
  Copy
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SolutionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedMaturity, setSelectedMaturity] = useState<string>("all")
  const [selectedDimension, setSelectedDimension] = useState<string>("all")
  const [selectedDelivery, setSelectedDelivery] = useState<string>("all")
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [detailTab, setDetailTab] = useState("overview")

  const { data: solutions, isLoading } = useSWR("solutions", getSolutions)

  const filteredSolutions = solutions?.filter(sol => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!sol.nameZh.includes(query) && !(sol.nameEn?.toLowerCase().includes(query))) return false
    }
    if (selectedLevel !== "all" && !sol.targetLevels.includes(selectedLevel as SchoolLevel)) return false
    if (selectedMaturity !== "all" && !sol.suitableMaturityLevels.includes(selectedMaturity as AIMaturityLevel)) return false
    if (selectedDimension !== "all" && !sol.mappedNeedDimensions.includes(selectedDimension as NeedDimension)) return false
    if (selectedDelivery !== "all" && sol.deliveryMode !== selectedDelivery) return false
    return true
  }) || []

  const deliveryModeLabels = {
    Onsite: "實體",
    Online: "線上",
    Hybrid: "混合"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            服務方案庫
          </h1>
          <p className="mt-2 text-muted-foreground">
            將教師培訓、AI 課程、學生項目、校本顧問及合規支援產品化，方便與學校需要自動配對。
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜尋方案名稱..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[120px]">
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

              <Select value={selectedMaturity} onValueChange={setSelectedMaturity}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="適合成熟度" />
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

              <Select value={selectedDimension} onValueChange={setSelectedDimension}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="需要維度" />
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

              <Select value={selectedDelivery} onValueChange={setSelectedDelivery}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="交付模式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有模式</SelectItem>
                  <SelectItem value="Onsite">實體</SelectItem>
                  <SelectItem value="Online">線上</SelectItem>
                  <SelectItem value="Hybrid">混合</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Solutions Grid */}
        {isLoading ? (
          <LoadingState message="載入服務方案..." />
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              顯示 {filteredSolutions.length} 個方案
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSolutions.map((solution) => (
                <Card key={solution.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{solution.nameZh}</CardTitle>
                        {solution.nameEn && (
                          <p className="text-sm text-muted-foreground">{solution.nameEn}</p>
                        )}
                      </div>
                      <Badge variant={solution.active ? "default" : "secondary"}>
                        {solution.active ? "啟用" : "停用"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {solution.description}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="truncate">{solution.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span className="truncate">{solution.budgetRange}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{deliveryModeLabels[solution.deliveryMode]}</span>
                      </div>
                    </div>

                    {/* Need Dimensions */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">對應需要</p>
                      <div className="flex flex-wrap gap-1">
                        {solution.mappedNeedDimensions.slice(0, 3).map(dim => (
                          <NeedDimensionBadge key={dim} dimension={dim} size="sm" showIcon={false} />
                        ))}
                        {solution.mappedNeedDimensions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{solution.mappedNeedDimensions.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Suitable Maturity */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">適合成熟度</p>
                      <div className="flex flex-wrap gap-1">
                        {solution.suitableMaturityLevels.map(level => (
                          <MaturityBadge key={level} level={level} size="sm" />
                        ))}
                      </div>
                    </div>

                    {/* Target Levels */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">適用學校</p>
                      <div className="flex flex-wrap gap-1">
                        {solution.targetLevels.map(level => (
                          <Badge key={level} variant="outline" className="text-xs">
                            {LEVEL_LABELS[level]}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-1.5"
                        onClick={() => {
                          setSelectedSolution(solution)
                          setDetailTab("overview")
                        }}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        提案
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Solution Detail Dialog */}
        <Dialog open={!!selectedSolution} onOpenChange={(open) => !open && setSelectedSolution(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedSolution && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedSolution.nameZh}</DialogTitle>
                  {selectedSolution.nameEn && (
                    <DialogDescription>{selectedSolution.nameEn}</DialogDescription>
                  )}
                </DialogHeader>
                
                <Tabs value={detailTab} onValueChange={setDetailTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">概覽</TabsTrigger>
                    <TabsTrigger value="delivery">交付詳情</TabsTrigger>
                    <TabsTrigger value="proposal">提案範本</TabsTrigger>
                    <TabsTrigger value="email">Email 範本</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <div>
                      <h4 className="font-medium mb-2">服務說明</h4>
                      <p className="text-muted-foreground">{selectedSolution.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">基本資訊</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">時長</dt>
                            <dd>{selectedSolution.duration}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">預算範圍</dt>
                            <dd>{selectedSolution.budgetRange}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">交付模式</dt>
                            <dd>{deliveryModeLabels[selectedSolution.deliveryMode]}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">適用範圍</h4>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">學校類型</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedSolution.targetLevels.map(level => (
                                <Badge key={level} variant="outline" className="text-xs">
                                  {LEVEL_LABELS[level]}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">適合成熟度</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedSolution.suitableMaturityLevels.map(level => (
                                <MaturityBadge key={level} level={level} size="sm" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">對應需要維度</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSolution.mappedNeedDimensions.map(dim => (
                          <NeedDimensionBadge key={dim} dimension={dim} size="sm" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">預期成果</h4>
                      <ul className="space-y-1.5">
                        {selectedSolution.expectedOutcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Target className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="delivery" className="space-y-4 mt-4">
                    {selectedSolution.prerequisites.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">先決條件</h4>
                        <ul className="space-y-1.5">
                          {selectedSolution.prerequisites.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">交付物</h4>
                      <ul className="space-y-1.5">
                        {selectedSolution.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="proposal" className="mt-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">提案書範本</h4>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Copy className="h-3.5 w-3.5" />
                          複製
                        </Button>
                      </div>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                        {selectedSolution.proposalTemplate}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="email" className="mt-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Email 範本</h4>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Copy className="h-3.5 w-3.5" />
                          複製
                        </Button>
                      </div>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {selectedSolution.emailTemplate}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
