"use client"

import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer 
} from "recharts"

interface RadarChartWrapperProps {
  data: Array<{ domain: string; score: number }>
  className?: string
}

export function RadarChartWrapper({ data, className }: RadarChartWrapperProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
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
  )
}
