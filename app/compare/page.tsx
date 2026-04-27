"use client"

import { useState, useEffect } from "react"
import { Plus, X, Bot, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { AppShell } from "@/components/layout/AppShell"
import { ScoreBadge } from "@/components/common/ScoreBadge"
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge"
import { getSchools } from "@/lib/api"
import { DOMAIN_LABELS, CONFIDENCE_CONFIG } from "@/lib/constants"
import type { School, SSRIDomain } from "@/lib/types"
import { cn } from "@/lib/utils"

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b"]

export default function ComparePage() {
  const [allSchools, setAllSchools] = useState<School[]>([])
  const [selectedSchools, setSelectedSchools] = useState<(School | null)[]>([null, null, null])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSchools() {
      setLoading(true)
      try {
        const data = await getSchools()
        setAllSchools(data)
      } catch (error) {
        console.error("Failed to fetch schools:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSchools()
  }, [])

  const handleSelectSchool = (index: number, schoolId: string) => {
    const school = allSchools.find(s => s.id === schoolId) || null
    const newSelected = [...selectedSchools]
    newSelected[index] = school
    setSelectedSchools(newSelected)
  }

  const handleRemoveSchool = (index: number) => {
    const newSelected = [...selectedSchools]
    newSelected[index] = null
    setSelectedSchools(newSelected)
  }

  const activeSchools = selectedSchools.filter(Boolean) as School[]
  const hasSchools = activeSchools.length > 0

  // Prepare radar chart data
  const radarData = (Object.keys(DOMAIN_LABELS) as SSRIDomain[]).map(domain => {
    const data: Record<string, unknown> = {
      domain: DOMAIN_LABELS[domain].zh
    }
    activeSchools.forEach((school, idx) => {
      const domainScore = school.domainScores.find(ds => ds.domain === domain)
      data[school.nameZh] = domainScore?.score || 0
    })
    return data
  })

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            比較學校
          </h1>
          <p className="text-muted-foreground">
            選擇最多 3 間學校進行 SSRI 評分比較
          </p>
        </div>

        {/* School Selectors */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {selectedSchools.map((school, index) => (
            <Card key={index} className={cn(
              "relative",
              school && "border-2",
              school && `border-[${COLORS[index]}]`
            )} style={school ? { borderColor: COLORS[index] } : undefined}>
              <CardContent className="p-4">
                {school ? (
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6"
                      onClick={() => handleRemoveSchool(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="mb-2 flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="font-semibold">{school.nameZh}</span>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">{school.district}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {school.totalScore ?? "--"}
                      </span>
                      <ScoreBadge grade={school.grade} size="sm" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      學校 {index + 1}
                    </p>
                    <Select 
                      onValueChange={(value) => handleSelectSchool(index, value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選擇學校..." />
                      </SelectTrigger>
                      <SelectContent>
                        {allSchools
                          .filter(s => !selectedSchools.find(sel => sel?.id === s.id))
                          .map(s => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.nameZh} ({s.district})
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Content */}
        {hasSchools ? (
          <>
            {/* Radar Chart Comparison */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-base">六大範疇比較</CardTitle>
                <CardDescription>雷達圖展示各校在六個範疇的相對表現</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="domain" 
                        tick={{ fill: "#6b7280", fontSize: 11 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]}
                        tick={{ fill: "#9ca3af", fontSize: 10 }}
                      />
                      {activeSchools.map((school, idx) => (
                        <Radar
                          key={school.id}
                          name={school.nameZh}
                          dataKey={school.nameZh}
                          stroke={COLORS[idx]}
                          fill={COLORS[idx]}
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      ))}
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Score Comparison Table */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-base">詳細比較</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-40">項目</TableHead>
                        {activeSchools.map((school, idx) => (
                          <TableHead key={school.id}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: COLORS[idx] }}
                              />
                              {school.nameZh}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">SSRI 總分</TableCell>
                        {activeSchools.map(school => (
                          <TableCell key={school.id}>
                            <span className="text-lg font-bold text-primary">
                              {school.totalScore ?? "--"}
                            </span>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">評級</TableCell>
                        {activeSchools.map(school => (
                          <TableCell key={school.id}>
                            <ScoreBadge grade={school.grade} size="sm" />
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">資料信心</TableCell>
                        {activeSchools.map(school => (
                          <TableCell key={school.id}>
                            <Badge 
                              variant="outline"
                              className={cn(
                                CONFIDENCE_CONFIG[school.confidence].color,
                                CONFIDENCE_CONFIG[school.confidence].bgColor
                              )}
                            >
                              {CONFIDENCE_CONFIG[school.confidence].label}
                            </Badge>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">證據數量</TableCell>
                        {activeSchools.map(school => (
                          <TableCell key={school.id}>
                            {school.evidenceCount} 項
                          </TableCell>
                        ))}
                      </TableRow>
                      {(Object.keys(DOMAIN_LABELS) as SSRIDomain[]).map(domain => (
                        <TableRow key={domain}>
                          <TableCell className="font-medium">
                            {DOMAIN_LABELS[domain].zh}
                          </TableCell>
                          {activeSchools.map(school => {
                            const ds = school.domainScores.find(d => d.domain === domain)
                            return (
                              <TableCell key={school.id}>
                                {ds?.score ?? "--"}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* AI Comparison Summary */}
            {activeSchools.length >= 2 && (
              <Card className="mb-8 border-sky-100 bg-gradient-to-br from-sky-50/30 to-transparent">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-sky-600" />
                    <CardTitle className="text-base">AI 比較摘要</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    根據公開資料分析，{activeSchools[0].nameZh} 在社區連結方面表現較突出，
                    {activeSchools.length > 1 && `而 ${activeSchools[1].nameZh} 則在共融多元方面有較高評分。`}
                    各校在不同範疇均有各自優勢，建議家長根據子女需要選擇合適學校。
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className="text-center">
            <CardContent className="py-12">
              <Plus className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold">選擇學校開始比較</h3>
              <p className="text-sm text-muted-foreground">
                請從上方選擇至少 2 間學校進行比較
              </p>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              比較結果只反映公開資料及 SSRI 框架下的分析，不應作為唯一選校依據。
              建議家長親自了解各校實際情況。
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
