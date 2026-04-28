"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Database, 
  FileText, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  TrendingUp,
  School,
  Users,
  Activity,
  Settings
} from "lucide-react"

const systemStats = [
  { label: "已收錄學校", value: "2,847", change: "+12", icon: School },
  { label: "已分析文件", value: "15,432", change: "+156", icon: FileText },
  { label: "活躍用戶", value: "3,291", change: "+89", icon: Users },
  { label: "API 請求 (今日)", value: "45,678", change: "+2.3%", icon: Activity },
]

const recentJobs = [
  { id: 1, type: "數據抓取", target: "教育局學校列表", status: "completed", time: "2 小時前" },
  { id: 2, type: "AI 分析", target: "聖保羅男女中學", status: "completed", time: "3 小時前" },
  { id: 3, type: "文件解析", target: "2024年度報告批次", status: "running", time: "進行中" },
  { id: 4, type: "分數計算", target: "全港中學重算", status: "pending", time: "排程中" },
  { id: 5, type: "數據抓取", target: "學校網站更新", status: "failed", time: "5 小時前" },
]

const dataSourceStatus = [
  { name: "教育局官方數據", status: "online", lastSync: "2024-01-15 08:00", records: "2,847" },
  { name: "學校年度報告", status: "online", lastSync: "2024-01-14 22:30", records: "8,234" },
  { name: "ESR 報告", status: "online", lastSync: "2024-01-15 06:00", records: "2,156" },
  { name: "新聞媒體", status: "syncing", lastSync: "同步中...", records: "12,456" },
  { name: "社交媒體", status: "offline", lastSync: "2024-01-10 12:00", records: "5,678" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">已完成</Badge>
    case "running":
      return <Badge className="bg-sky-100 text-sky-700 border-sky-200">執行中</Badge>
    case "pending":
      return <Badge className="bg-amber-100 text-amber-700 border-amber-200">等待中</Badge>
    case "failed":
      return <Badge className="bg-red-100 text-red-700 border-red-200">失敗</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getSourceStatusIcon(status: string) {
  switch (status) {
    case "online":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    case "syncing":
      return <RefreshCw className="h-4 w-4 text-sky-500 animate-spin" />
    case "offline":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

export default function AdminDashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">管理控制台</h1>
            <p className="text-muted-foreground mt-1">系統監控與數據管理</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              重新整理
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              系統設定
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {systemStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">任務佇列</TabsTrigger>
            <TabsTrigger value="sources">數據來源</TabsTrigger>
            <TabsTrigger value="analytics">分析統計</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  最近任務
                </CardTitle>
                <CardDescription>系統自動化任務執行狀態</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {job.type === "數據抓取" && <Database className="h-5 w-5 text-muted-foreground" />}
                          {job.type === "AI 分析" && <Activity className="h-5 w-5 text-muted-foreground" />}
                          {job.type === "文件解析" && <FileText className="h-5 w-5 text-muted-foreground" />}
                          {job.type === "分數計算" && <BarChart3 className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{job.type}</p>
                          <p className="text-sm text-muted-foreground">{job.target}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{job.time}</span>
                        {getStatusBadge(job.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  數據來源狀態
                </CardTitle>
                <CardDescription>各數據源連線與同步狀態</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataSourceStatus.map((source) => (
                    <div
                      key={source.name}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex items-center gap-4">
                        {getSourceStatusIcon(source.status)}
                        <div>
                          <p className="font-medium text-foreground">{source.name}</p>
                          <p className="text-sm text-muted-foreground">
                            最後同步: {source.lastSync}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{source.records}</p>
                        <p className="text-sm text-muted-foreground">筆記錄</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>每日分析量</CardTitle>
                  <CardDescription>過去 7 天 AI 分析任務數量</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {[120, 145, 132, 178, 156, 189, 201].map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary/80 rounded-t"
                          style={{ height: `${(value / 201) * 160}px` }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {["一", "二", "三", "四", "五", "六", "日"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>學校類型分佈</CardTitle>
                  <CardDescription>已收錄學校按類型分類</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "官立學校", value: 324, percent: 11 },
                      { label: "資助學校", value: 1456, percent: 51 },
                      { label: "直資學校", value: 567, percent: 20 },
                      { label: "私立學校", value: 500, percent: 18 },
                    ].map((item) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{item.label}</span>
                          <span className="text-muted-foreground">{item.value} ({item.percent}%)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
