"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SSRIDomainScore } from "@/lib/types"

interface SchoolRadarChartProps {
  domainScores: SSRIDomainScore[]
  title?: string
  showLegend?: boolean
  height?: number
  comparisonData?: {
    name: string
    scores: SSRIDomainScore[]
    color: string
  }[]
}

export function SchoolRadarChart({
  domainScores,
  title = "六大範疇評分",
  showLegend = false,
  height = 300,
  comparisonData
}: SchoolRadarChartProps) {
  const chartData = domainScores.map((ds) => ({
    domain: ds.labelZh,
    score: ds.score || 0,
    fullMark: 100,
    ...comparisonData?.reduce((acc, comp) => {
      const compScore = comp.scores.find(s => s.domain === ds.domain)
      return { ...acc, [comp.name]: compScore?.score || 0 }
    }, {})
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="domain" 
                tick={{ fill: "#6b7280", fontSize: 11 }}
                tickLine={false}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                tickCount={5}
              />
              <Radar
                name="評分"
                dataKey="score"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              {comparisonData?.map((comp) => (
                <Radar
                  key={comp.name}
                  name={comp.name}
                  dataKey={comp.name}
                  stroke={comp.color}
                  fill={comp.color}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              ))}
              {showLegend && <Legend />}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px"
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
