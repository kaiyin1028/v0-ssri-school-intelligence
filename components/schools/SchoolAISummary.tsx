import { Bot, CheckCircle2, AlertTriangle, Info, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SchoolAISummary as SchoolAISummaryType } from "@/lib/types"

interface SchoolAISummaryProps {
  summary: SchoolAISummaryType | null
  loading?: boolean
}

export function SchoolAISummary({ summary, loading }: SchoolAISummaryProps) {
  if (loading) {
    return (
      <Card className="border-sky-100 bg-gradient-to-br from-sky-50/50 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-lg bg-sky-100">
              <Bot className="h-5 w-5 text-sky-400" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-sky-100" />
              <div className="h-3 w-48 animate-pulse rounded bg-sky-50" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Card className="border-muted">
        <CardContent className="p-6 text-center">
          <Bot className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            暫無 AI 分析摘要
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-sky-100 bg-gradient-to-br from-sky-50/30 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
            <Bot className="h-5 w-5 text-sky-600" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              AI 綜合分析
              <Sparkles className="h-4 w-4 text-amber-500" />
            </CardTitle>
            <CardDescription>
              基於公開資料的自動分析摘要
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Summary */}
        <p className="text-sm leading-relaxed text-foreground">
          {summary.summary}
        </p>

        {/* Strengths */}
        {summary.strengths.length > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              主要優勢
            </h4>
            <ul className="space-y-2">
              {summary.strengths.map((strength, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvement Areas */}
        {summary.improvementAreas.length > 0 && (
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-amber-700">
              <AlertTriangle className="h-4 w-4" />
              可改善範疇
            </h4>
            <ul className="space-y-2">
              {summary.improvementAreas.map((area, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Caution Note */}
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
          <p className="text-xs text-amber-700">
            此分析基於可公開取得的資料，未能找到資料不代表學校沒有相關工作。
            建議向學校查詢進一步資料。
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
