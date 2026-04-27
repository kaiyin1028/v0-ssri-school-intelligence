import Link from "next/link"
import { 
  Search, 
  BookOpen, 
  School, 
  FileText, 
  Database, 
  ShieldCheck,
  Users,
  HeartHandshake,
  Network,
  Lightbulb,
  Leaf,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bot,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppShell } from "@/components/layout/AppShell"
import { AIIllustrationCard } from "@/components/common/AIIllustrationCard"
import { ScoreBadge } from "@/components/common/ScoreBadge"
import { mockSchools, mockAdminStats } from "@/lib/mock-data"
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer 
} from "recharts"

const domains = [
  { 
    icon: Users, 
    label: "學校文化與歸屬感",
    description: "校園氛圍、學生支援、師生關係"
  },
  { 
    icon: HeartHandshake, 
    label: "共融與多元包容",
    description: "SEN 支援、文化包容、平等機會"
  },
  { 
    icon: Network, 
    label: "社區連結與社會參與",
    description: "服務學習、社區合作、義工活動"
  },
  { 
    icon: Lightbulb, 
    label: "課程創新與社會責任教育",
    description: "跨學科學習、環境教育、公民教育"
  },
  { 
    icon: Leaf, 
    label: "學生全人發展",
    description: "身心健康、品格培養、多元才能"
  },
  { 
    icon: ShieldCheck, 
    label: "管治透明度與持份者參與",
    description: "財務公開、決策透明、家校合作"
  }
]

const trustPoints = [
  {
    icon: Eye,
    title: "每個分數均可追溯至公開證據",
    description: "所有評分均有對應的公開資料來源"
  },
  {
    icon: AlertCircle,
    title: "區分沒有公開資料與沒有實際工作",
    description: "資料不足不代表學校沒有相關工作"
  },
  {
    icon: FileText,
    title: "支援學校更正及補充資料",
    description: "學校可提交補充資料完善評估"
  },
  {
    icon: Bot,
    title: "AI 初評 + 人工審核",
    description: "結合 AI 效率與人工專業判斷"
  }
]

// Sample radar chart data
const sampleRadarData = [
  { domain: "文化歸屬", score: 85 },
  { domain: "共融多元", score: 78 },
  { domain: "社區連結", score: 88 },
  { domain: "課程創新", score: 75 },
  { domain: "全人發展", score: 82 },
  { domain: "管治透明", score: 80 }
]

export default function HomePage() {
  const featuredSchools = mockSchools.filter(s => s.totalScore !== null).slice(0, 3)

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-sky-50 via-background to-emerald-50/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                以 AI 及公開數據
                <br />
                <span className="text-primary">了解學校的社會責任表現</span>
              </h1>
              <p className="mb-8 max-w-xl text-pretty text-lg text-muted-foreground">
                SSRI 學校智能分析平台結合公開資料、學校文件、AI 證據分析及專家框架，
                協助家長從學業以外理解學校。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/schools">
                  <Button size="lg" className="gap-2">
                    <Search className="h-4 w-4" />
                    搜尋學校
                  </Button>
                </Link>
                <Link href="/methodology">
                  <Button size="lg" variant="outline" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    查看評分方法
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <AIIllustrationCard variant="school-insight" className="mx-auto max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-sky-100 bg-gradient-to-br from-sky-50/50 to-transparent">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100">
                  <School className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockAdminStats.totalSchools}</p>
                  <p className="text-sm text-muted-foreground">已收錄學校</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-transparent">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockAdminStats.newDocuments.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">已分析文件</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-amber-100 bg-gradient-to-br from-amber-50/50 to-transparent">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <Database className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">6,830</p>
                  <p className="text-sm text-muted-foreground">已抽取證據</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-100 bg-gradient-to-br from-slate-50/50 to-transparent">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  <ShieldCheck className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">78%</p>
                  <p className="text-sm text-muted-foreground">平均資料信心</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Dashboard Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              數據導向的學校分析
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              透過 AI 分析公開資料，提供清晰、可追溯的學校社會責任評估
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Sample School Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">精選學校</h3>
              {featuredSchools.map((school) => (
                <Link key={school.id} href={`/schools/${school.id}`}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{school.nameZh}</p>
                          <p className="text-xs text-muted-foreground">{school.district} · {school.type === "Aided" ? "資助" : school.type}</p>
                        </div>
                        <ScoreBadge grade={school.grade} size="sm" />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-primary">{school.totalScore}</span>
                        <span className="text-muted-foreground">/ 100</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              <Link href="/schools">
                <Button variant="ghost" className="w-full gap-2">
                  查看更多學校
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Radar Chart Preview */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">六大範疇評分</CardTitle>
                <CardDescription>雷達圖總覽</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={sampleRadarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="domain" 
                        tick={{ fill: "#6b7280", fontSize: 11 }}
                      />
                      <Radar
                        name="評分"
                        dataKey="score"
                        stroke="#0ea5e9"
                        fill="#0ea5e9"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* AI Insight Card */}
            <Card className="border-sky-100 bg-gradient-to-br from-sky-50/30 to-transparent">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-sky-600" />
                  <CardTitle className="text-base">AI 智能分析</CardTitle>
                </div>
                <CardDescription>
                  基於公開資料的自動分析摘要
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  根據學校年報及網站資料，該校在社區連結方面表現出色，
                  每年組織超過 20 項社區服務活動...
                </p>
                <div>
                  <p className="mb-2 text-xs font-medium text-emerald-700">主要優勢</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      社區服務學習計劃完善
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      學生輔導系統健全
                    </li>
                  </ul>
                </div>
                <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
                  此分析基於可公開取得的資料，未能找到資料不代表學校沒有相關工作。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Six Domains Explanation */}
      <section className="border-y bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              SSRI 指數衡量什麼？
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              我們從六個範疇評估學校的社會責任表現，每個範疇均基於可追溯的公開證據
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain, index) => {
              const Icon = domain.icon
              return (
                <Card key={index} className="transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{domain.label}</h3>
                    <p className="text-sm text-muted-foreground">{domain.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              透明與可信的評估方法
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              我們重視評估的公正性和透明度，確保每一個評分都有據可查
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                      <Icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
            開始探索學校資料
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            搜尋心儀學校，了解其社會責任表現，作出更全面的選校決定
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/schools">
              <Button size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                搜尋學校
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="gap-2">
                比較學校
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">SSRI 學校智能分析平台</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              此平台旨在提供參考資料，不應作為唯一選校依據。
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/methodology" className="text-muted-foreground hover:text-foreground">
                評分方法
              </Link>
              <Link href="/settings" className="text-muted-foreground hover:text-foreground">
                設定
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </AppShell>
  )
}
