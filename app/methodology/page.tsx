"use client"

import { AppShell } from "@/components/layout/AppShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Database, 
  Brain, 
  Scale,
  CheckCircle2,
  FileText,
  Globe,
  Newspaper,
  Building2,
  Users
} from "lucide-react"
import { SSRI_DIMENSIONS } from "@/lib/constants"

const dataSources = [
  {
    name: "教育局官方資料",
    icon: Building2,
    description: "學校基本資料、學生人數、教師資格等官方統計",
    examples: ["學校名冊", "班級結構", "教師資歷統計"],
    reliability: "高"
  },
  {
    name: "學校年度報告",
    icon: FileText,
    description: "學校自行發布的周年報告、計劃書、自評報告",
    examples: ["周年學校報告", "學校發展計劃", "自我評估報告"],
    reliability: "中高"
  },
  {
    name: "ESR 報告",
    icon: BookOpen,
    description: "教育局外部學校評審報告",
    examples: ["外評報告", "重點視學報告", "跟進視學報告"],
    reliability: "高"
  },
  {
    name: "學校網站",
    icon: Globe,
    description: "學校官方網站公開資訊",
    examples: ["活動消息", "課程資料", "教職員名單"],
    reliability: "中"
  },
  {
    name: "新聞媒體",
    icon: Newspaper,
    description: "主流媒體的學校相關報導",
    examples: ["學校新聞", "事件報導", "訪問專題"],
    reliability: "中"
  },
]

const scoringProcess = [
  {
    step: 1,
    title: "數據收集",
    description: "從多個可靠數據源自動抓取學校相關資料",
    details: "系統定期掃描政府數據庫、學校網站、新聞媒體等來源，收集最新的學校資訊。"
  },
  {
    step: 2,
    title: "AI 文本分析",
    description: "使用自然語言處理技術分析文件內容",
    details: "AI 模型會識別關鍵指標、提取證據、評估情感傾向，並標記重要資訊。"
  },
  {
    step: 3,
    title: "證據映射",
    description: "將分析結果映射到 SSRI 評分框架",
    details: "每項發現會被分類到相應的維度和指標，並附上信心度評分。"
  },
  {
    step: 4,
    title: "分數計算",
    description: "根據權重和證據計算最終分數",
    details: "綜合考慮證據數量、質量、時效性和來源可靠度，計算各維度及總分。"
  },
  {
    step: 5,
    title: "專家審核",
    description: "重要案例經教育專家人工複核",
    details: "對於分數波動較大或爭議性較高的案例，會由教育專家進行人工審核。"
  },
]

export default function MethodologyPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">評分方法論</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            SSRI 評分方法論
          </h1>
          <p className="text-lg text-muted-foreground">
            了解我們如何結合公開數據、AI 分析和專家框架，
            為每間學校計算全面、客觀的社會責任指數
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dimensions" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="dimensions">評分維度</TabsTrigger>
            <TabsTrigger value="sources">數據來源</TabsTrigger>
            <TabsTrigger value="process">評分流程</TabsTrigger>
            <TabsTrigger value="transparency">透明度</TabsTrigger>
          </TabsList>

          {/* Dimensions Tab */}
          <TabsContent value="dimensions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  六大評分維度
                </CardTitle>
                <CardDescription>
                  SSRI 從六個核心維度評估學校的社會責任表現
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SSRI_DIMENSIONS.map((dimension) => (
                    <div
                      key={dimension.id}
                      className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
                    >
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${dimension.color}20`, color: dimension.color }}
                      >
                        <span className="text-xl font-bold">{dimension.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{dimension.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{dimension.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">權重: {dimension.weight}%</Badge>
                        <span className="text-xs text-muted-foreground">
                          {dimension.indicators?.length || 0} 項指標
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weighting Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>權重設計理念</CardTitle>
                <CardDescription>為何各維度有不同的權重？</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-muted-foreground">
                  SSRI 的權重分配基於教育研究和專家諮詢。學生福祉和教學環境佔較高權重，
                  反映了學校最核心的教育使命。社區參與和環境永續雖然權重較低，但仍是
                  現代學校社會責任不可或缺的一環。
                </p>
                <p className="text-muted-foreground">
                  我們定期檢視和調整權重，以確保評分系統能反映教育界的最新共識和社會期望。
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  數據來源
                </CardTitle>
                <CardDescription>
                  我們從多個可靠來源收集和交叉驗證學校資訊
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataSources.map((source) => (
                    <div
                      key={source.name}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-card"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <source.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{source.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={
                              source.reliability === "高" 
                                ? "border-emerald-200 text-emerald-700 bg-emerald-50" 
                                : source.reliability === "中高"
                                ? "border-sky-200 text-sky-700 bg-sky-50"
                                : "border-amber-200 text-amber-700 bg-amber-50"
                            }
                          >
                            可靠度: {source.reliability}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {source.examples.map((example) => (
                            <Badge key={example} variant="secondary" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Quality */}
            <Card>
              <CardHeader>
                <CardTitle>數據品質保證</CardTitle>
                <CardDescription>如何確保數據的準確性和時效性</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-2">多源交叉驗證</h3>
                    <p className="text-sm text-muted-foreground">
                      同一資訊從多個來源收集並比對，確保準確性
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-3">
                      <Database className="h-6 w-6 text-sky-600" />
                    </div>
                    <h3 className="font-semibold mb-2">定期自動更新</h3>
                    <p className="text-sm text-muted-foreground">
                      系統每日掃描更新，確保資訊時效性
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold mb-2">專家人工審核</h3>
                    <p className="text-sm text-muted-foreground">
                      重要變動經教育專家人工確認
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Process Tab */}
          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  評分流程
                </CardTitle>
                <CardDescription>
                  從數據收集到最終分數的完整流程
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />
                  
                  <div className="space-y-8">
                    {scoringProcess.map((item, index) => (
                      <div key={item.step} className="relative flex gap-6">
                        <div className="relative z-10 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1 pb-8">
                          <h3 className="font-semibold text-foreground text-lg mb-1">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground mb-2">{item.description}</p>
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Technology */}
            <Card>
              <CardHeader>
                <CardTitle>AI 技術說明</CardTitle>
                <CardDescription>我們使用的人工智慧技術</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">自然語言處理 (NLP)</h3>
                    <p className="text-sm text-muted-foreground">
                      分析中英文文本，提取關鍵資訊，理解語境和情感傾向。
                      支援繁體中文和英文的混合文本處理。
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">命名實體識別 (NER)</h3>
                    <p className="text-sm text-muted-foreground">
                      識別文本中的學校名稱、人物、組織、日期等實體，
                      建立學校相關資訊的知識圖譜。
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">文檔分類</h3>
                    <p className="text-sm text-muted-foreground">
                      自動將收集到的文檔分類到相應的評分維度和指標，
                      提高分析效率和準確性。
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-semibold mb-2">信心度評估</h3>
                    <p className="text-sm text-muted-foreground">
                      為每項分析結果計算信心度分數，
                      幫助用戶了解數據的可靠程度。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transparency Tab */}
          <TabsContent value="transparency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>透明度承諾</CardTitle>
                <CardDescription>
                  我們致力於提供透明、可追溯的評分系統
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200">
                    <h3 className="font-semibold text-emerald-800 mb-2">證據可追溯</h3>
                    <p className="text-emerald-700">
                      每項評分都附有支持證據的來源連結，用戶可以自行查證原始資料。
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-sky-50 border border-sky-200">
                    <h3 className="font-semibold text-sky-800 mb-2">方法論公開</h3>
                    <p className="text-sky-700">
                      評分框架、權重設計、AI 模型選擇等方法論完全公開，歡迎學術討論和改進建議。
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-amber-50 border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-2">學校申訴機制</h3>
                    <p className="text-amber-700">
                      學校可就評分結果提出申訴，提供補充資料或更正錯誤，我們會認真審核每項申訴。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card>
              <CardHeader>
                <CardTitle>評分限制說明</CardTitle>
                <CardDescription>
                  了解 SSRI 評分的局限性
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">數據滯後：</strong>
                    部分數據來源更新頻率有限，評分可能無法反映最新情況。
                  </li>
                  <li>
                    <strong className="text-foreground">公開資訊限制：</strong>
                    我們只能分析公開可得的資訊，無法獲取學校內部文件。
                  </li>
                  <li>
                    <strong className="text-foreground">AI 分析誤差：</strong>
                    AI 分析存在一定誤差，複雜情境的理解可能不夠準確。
                  </li>
                  <li>
                    <strong className="text-foreground">文化語境：</strong>
                    評分框架基於香港教育環境設計，可能不適用於其他地區。
                  </li>
                  <li>
                    <strong className="text-foreground">非全面評估：</strong>
                    SSRI 專注於社會責任維度，不應作為選校的唯一依據。
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
