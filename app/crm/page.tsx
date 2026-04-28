"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { StageBadge } from "@/components/common/StageBadge"
import { PriorityBadge } from "@/components/common/PriorityBadge"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { LoadingState } from "@/components/common/LoadingState"
import { 
  getOpportunities, 
  getCRMActivities, 
  createCRMActivity,
  updateOpportunity,
  generateOutreach 
} from "@/lib/api"
import { OPPORTUNITY_STAGE_CONFIG } from "@/lib/constants"
import type { Opportunity, CRMActivity, OpportunityStage } from "@/lib/types"
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  Calendar,
  ChevronRight,
  Send,
  Sparkles,
  Clock,
  User,
  Building2,
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"

export default function CRMPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)
  const [activities, setActivities] = useState<CRMActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [activitiesLoading, setActivitiesLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState<string>("all")
  const [newNote, setNewNote] = useState("")
  const [generatedEmail, setGeneratedEmail] = useState<{ subject?: string; body: string } | null>(null)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    loadOpportunities()
  }, [])

  useEffect(() => {
    if (selectedOpp) {
      loadActivities(selectedOpp.id)
    }
  }, [selectedOpp])

  const loadOpportunities = async () => {
    setLoading(true)
    const data = await getOpportunities()
    setOpportunities(data)
    if (data.length > 0 && !selectedOpp) {
      setSelectedOpp(data[0])
    }
    setLoading(false)
  }

  const loadActivities = async (oppId: string) => {
    setActivitiesLoading(true)
    const data = await getCRMActivities(oppId)
    setActivities(data)
    setActivitiesLoading(false)
  }

  const handleAddNote = async () => {
    if (!selectedOpp || !newNote.trim()) return
    
    await createCRMActivity({
      opportunityId: selectedOpp.id,
      type: "Note",
      title: "新增備註",
      content: newNote,
      createdBy: "系統用戶"
    })
    
    setNewNote("")
    loadActivities(selectedOpp.id)
  }

  const handleStageChange = async (newStage: OpportunityStage) => {
    if (!selectedOpp) return
    
    await updateOpportunity(selectedOpp.id, { stage: newStage })
    await createCRMActivity({
      opportunityId: selectedOpp.id,
      type: "StageChange",
      title: `階段更新：${OPPORTUNITY_STAGE_CONFIG[newStage].label}`,
      content: `商機階段已更新為「${OPPORTUNITY_STAGE_CONFIG[newStage].label}」`,
      createdBy: "系統用戶"
    })
    
    setSelectedOpp({ ...selectedOpp, stage: newStage })
    loadOpportunities()
    loadActivities(selectedOpp.id)
  }

  const handleGenerateEmail = async () => {
    if (!selectedOpp) return
    
    setGenerating(true)
    const result = await generateOutreach({
      schoolId: selectedOpp.schoolId,
      channel: "Email",
      tone: "formal"
    })
    setGeneratedEmail(result)
    setGenerating(false)
  }

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.district.includes(searchQuery)
    const matchesStage = stageFilter === "all" || opp.stage === stageFilter
    return matchesSearch && matchesStage
  })

  const getActivityIcon = (type: CRMActivity["type"]) => {
    switch (type) {
      case "Email": return <Mail className="h-4 w-4" />
      case "Call": return <Phone className="h-4 w-4" />
      case "Meeting": return <Calendar className="h-4 w-4" />
      case "Proposal": return <FileText className="h-4 w-4" />
      case "Note": return <MessageSquare className="h-4 w-4" />
      case "StageChange": return <ArrowUpRight className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LoadingState message="載入跟進工作台..." />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">跟進工作台</h1>
          <p className="mt-2 text-muted-foreground">
            管理商機跟進活動，追蹤銷售進度
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Opportunity List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">商機列表</CardTitle>
              <div className="mt-2 space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="搜尋學校..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="篩選階段" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有階段</SelectItem>
                    {Object.entries(OPPORTUNITY_STAGE_CONFIG).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto">
              <div className="space-y-2">
                {filteredOpportunities.map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => setSelectedOpp(opp)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selectedOpp?.id === opp.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{opp.schoolName}</p>
                        <p className="text-sm text-muted-foreground">{opp.district}</p>
                      </div>
                      <PriorityBadge priority={opp.priority} size="sm" />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <StageBadge stage={opp.stage} size="sm" />
                      {opp.nextActionDate && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(opp.nextActionDate).toLocaleDateString("zh-TW")}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Opportunity Detail */}
          <Card className="lg:col-span-2">
            {selectedOpp ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{selectedOpp.schoolName}</CardTitle>
                        <Link href={`/needs/${selectedOpp.schoolId}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            需求檔案
                          </Button>
                        </Link>
                      </div>
                      <CardDescription className="mt-1 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {selectedOpp.district}
                        </span>
                        <MaturityBadge level={selectedOpp.maturityLevel} size="sm" />
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={selectedOpp.stage} onValueChange={(v) => handleStageChange(v as OpportunityStage)}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(OPPORTUNITY_STAGE_CONFIG).map(([key, config]) => (
                            <SelectItem key={key} value={key}>{config.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="activities" className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4">
                      <TabsTrigger value="activities">活動記錄</TabsTrigger>
                      <TabsTrigger value="info">商機資訊</TabsTrigger>
                      <TabsTrigger value="outreach">外展工具</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="activities" className="p-4">
                      {/* Add Note */}
                      <div className="mb-4 flex gap-2">
                        <Textarea
                          placeholder="新增備註..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                          <Plus className="mr-1 h-4 w-4" />
                          新增
                        </Button>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="mr-1 h-3 w-3" />
                          記錄通話
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="mr-1 h-3 w-3" />
                          記錄郵件
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          記錄會議
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-1 h-3 w-3" />
                          記錄提案
                        </Button>
                      </div>
                      
                      {/* Activity Timeline */}
                      {activitiesLoading ? (
                        <LoadingState message="載入活動記錄..." />
                      ) : activities.length > 0 ? (
                        <div className="space-y-4">
                          {activities.map((activity) => (
                            <div key={activity.id} className="flex gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{activity.title}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {activity.type}
                                  </Badge>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {activity.content}
                                </p>
                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {new Date(activity.createdAt).toLocaleString("zh-TW")}
                                  <User className="h-3 w-3" />
                                  {activity.createdBy}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-muted-foreground">
                          暫無活動記錄
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="info" className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">商機分數</p>
                            <p className="text-2xl font-bold text-primary">{selectedOpp.opportunityScore}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">優先級</p>
                            <PriorityBadge priority={selectedOpp.priority} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">預估價值</p>
                            <p className="font-medium">
                              {selectedOpp.estimatedValue 
                                ? `HK$${selectedOpp.estimatedValue.toLocaleString()}` 
                                : "待確認"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">負責人</p>
                            <p className="font-medium">{selectedOpp.owner || "未分配"}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">下一步行動</p>
                            <p className="font-medium">{selectedOpp.nextAction || "無"}</p>
                            {selectedOpp.nextActionDate && (
                              <p className="text-sm text-muted-foreground">
                                {new Date(selectedOpp.nextActionDate).toLocaleDateString("zh-TW")}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">主要需求維度</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {selectedOpp.topNeedDimensions.map((dim) => (
                                <Badge key={dim} variant="secondary" className="text-xs">
                                  {dim}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">關鍵原因</p>
                            <ul className="mt-1 list-inside list-disc text-sm">
                              {selectedOpp.keyReasons.map((reason, i) => (
                                <li key={i}>{reason}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {selectedOpp.notes && (
                        <div className="mt-4 rounded-lg bg-muted/50 p-3">
                          <p className="text-sm text-muted-foreground">備註</p>
                          <p className="mt-1">{selectedOpp.notes}</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="outreach" className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-2 font-medium">AI 郵件生成</h3>
                          <p className="mb-3 text-sm text-muted-foreground">
                            根據學校需求檔案，自動生成個性化外展郵件
                          </p>
                          <Button onClick={handleGenerateEmail} disabled={generating}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            {generating ? "生成中..." : "生成郵件"}
                          </Button>
                        </div>
                        
                        {generatedEmail && (
                          <div className="rounded-lg border p-4">
                            <div className="mb-2">
                              <p className="text-sm text-muted-foreground">主旨</p>
                              <p className="font-medium">{generatedEmail.subject}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">內容</p>
                              <pre className="mt-1 whitespace-pre-wrap text-sm">
                                {generatedEmail.body}
                              </pre>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button size="sm">
                                <Send className="mr-1 h-3 w-3" />
                                複製並發送
                              </Button>
                              <Button variant="outline" size="sm" onClick={handleGenerateEmail}>
                                重新生成
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6">
                          <h3 className="mb-2 font-medium">快速範本</h3>
                          <div className="grid gap-2 md:grid-cols-2">
                            <Button variant="outline" className="justify-start">
                              <Mail className="mr-2 h-4 w-4" />
                              初次介紹郵件
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <Mail className="mr-2 h-4 w-4" />
                              跟進郵件
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              會議邀請
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <FileText className="mr-2 h-4 w-4" />
                              方案建議書
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex h-[400px] items-center justify-center text-muted-foreground">
                請選擇一個商機查看詳情
              </CardContent>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
