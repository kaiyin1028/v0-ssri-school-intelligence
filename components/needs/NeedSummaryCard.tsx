"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Lightbulb, MessageSquare, AlertTriangle } from "lucide-react"
import type { SchoolNeedProfile } from "@/lib/types"

interface NeedSummaryCardProps {
  profile: SchoolNeedProfile
  className?: string
}

export function NeedSummaryCard({ profile, className }: NeedSummaryCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-primary" />
          AI 需求推斷摘要
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Summary */}
        <div className="bg-primary/5 rounded-lg p-4">
          <p className="text-foreground leading-relaxed">{profile.aiSummary}</p>
        </div>

        {/* Top Potential Needs */}
        <div>
          <h4 className="flex items-center gap-2 font-medium text-foreground mb-3">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            主要潛在需要
          </h4>
          <ul className="space-y-2">
            {profile.topPotentialNeeds.map((need, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-foreground">{need}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggested Entry Point */}
        <div>
          <h4 className="flex items-center gap-2 font-medium text-foreground mb-3">
            <MessageSquare className="h-4 w-4 text-emerald-500" />
            建議切入點
          </h4>
          <p className="text-sm text-foreground bg-emerald-50 border border-emerald-100 rounded-lg p-3">
            {profile.suggestedEntryPoint}
          </p>
        </div>

        {/* Recommended Approach */}
        <div>
          <h4 className="font-medium text-foreground mb-2">建議跟進方式</h4>
          <p className="text-sm text-muted-foreground">{profile.recommendedApproach}</p>
        </div>

        {/* Caution Note */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>{profile.cautionNote}</p>
        </div>
      </CardContent>
    </Card>
  )
}
