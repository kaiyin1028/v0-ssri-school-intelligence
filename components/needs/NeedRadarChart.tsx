"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { NeedDimensionScore } from "@/lib/types"
import { NEED_DIMENSION_LABELS } from "@/lib/constants"

interface NeedRadarChartProps {
  dimensions: NeedDimensionScore[]
  title?: string
  description?: string
  className?: string
}

export function NeedRadarChart({ 
  dimensions, 
  title = "AI 教育需求雷達",
  description,
  className 
}: NeedRadarChartProps) {
  const chartData = dimensions.map((dim) => ({
    dimension: NEED_DIMENSION_LABELS[dim.dimension].zh,
    score: dim.score,
    fullMark: 100,
    confidence: dim.confidence,
    signalCount: dim.signalCount
  }))

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="dimension" 
                tick={{ 
                  fill: "hsl(var(--muted-foreground))", 
                  fontSize: 12 
                }}
              />
              <PolarRadiusAxis 
                angle={22.5} 
                domain={[0, 100]} 
                tick={{ 
                  fill: "hsl(var(--muted-foreground))", 
                  fontSize: 10 
                }}
              />
              <Radar
                name="需求分數"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-card p-3 shadow-lg">
                        <p className="font-medium text-foreground">{data.dimension}</p>
                        <p className="text-sm text-muted-foreground">
                          分數：<span className="font-medium text-foreground">{data.score}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          信心：<span className="font-medium text-foreground">
                            {data.confidence === "High" ? "高" : data.confidence === "Medium" ? "中" : data.confidence === "Low" ? "低" : "不足"}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          訊號數：<span className="font-medium text-foreground">{data.signalCount}</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          分數越高表示系統推斷該維度的潛在需要越大
        </p>
      </CardContent>
    </Card>
  )
}
