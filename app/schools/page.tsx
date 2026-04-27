"use client"

import { useState, useEffect, useCallback } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { SchoolCard } from "@/components/schools/SchoolCard"
import { SchoolSearchFilters } from "@/components/schools/SchoolSearchFilters"
import { LoadingState } from "@/components/common/LoadingState"
import { EmptyState } from "@/components/common/EmptyState"
import { getSchools } from "@/lib/api"
import type { School, SchoolLevel, SchoolType, SSRIGrade, ConfidenceLevel } from "@/lib/types"
import { Search } from "lucide-react"

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  
  // Filter states
  const [query, setQuery] = useState("")
  const [district, setDistrict] = useState("all")
  const [level, setLevel] = useState("all")
  const [type, setType] = useState("all")
  const [grade, setGrade] = useState("all")
  const [confidence, setConfidence] = useState("all")
  const [sortBy, setSortBy] = useState("score-desc")

  const fetchSchools = useCallback(async () => {
    setLoading(true)
    try {
      const [sortField, sortOrder] = sortBy.split("-") as [string, "asc" | "desc"]
      const data = await getSchools({
        query: query || undefined,
        district: district !== "all" ? district : undefined,
        level: level !== "all" ? (level as SchoolLevel) : undefined,
        type: type !== "all" ? (type as SchoolType) : undefined,
        sortBy: sortField === "score" ? "score" : sortField === "name" ? "name" : "lastUpdated",
        sortOrder
      })
      
      // Additional client-side filtering for grade and confidence
      let filtered = data
      if (grade !== "all") {
        filtered = filtered.filter(s => s.grade === (grade as SSRIGrade))
      }
      if (confidence !== "all") {
        filtered = filtered.filter(s => s.confidence === (confidence as ConfidenceLevel))
      }
      
      setSchools(filtered)
    } catch (error) {
      console.error("Failed to fetch schools:", error)
    } finally {
      setLoading(false)
    }
  }, [query, district, level, type, grade, confidence, sortBy])

  useEffect(() => {
    fetchSchools()
  }, [fetchSchools])

  const handleReset = () => {
    setQuery("")
    setDistrict("all")
    setLevel("all")
    setType("all")
    setGrade("all")
    setConfidence("all")
    setSortBy("score-desc")
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
            學校搜尋
          </h1>
          <p className="text-muted-foreground">
            搜尋及瀏覽香港學校的 SSRI 社會責任評分
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <SchoolSearchFilters
            query={query}
            onQueryChange={setQuery}
            district={district}
            onDistrictChange={setDistrict}
            level={level}
            onLevelChange={setLevel}
            type={type}
            onTypeChange={setType}
            grade={grade}
            onGradeChange={setGrade}
            confidence={confidence}
            onConfidenceChange={setConfidence}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onReset={handleReset}
          />
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="mb-4 text-sm text-muted-foreground">
            找到 <span className="font-medium text-foreground">{schools.length}</span> 間學校
          </p>
        )}

        {/* School List */}
        {loading ? (
          <LoadingState message="載入學校資料中..." />
        ) : schools.length === 0 ? (
          <EmptyState
            icon={Search}
            title="找不到符合條件的學校"
            description="請嘗試調整搜尋條件或篩選器"
            action={{ label: "重設篩選", onClick: handleReset }}
          />
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {schools.map((school) => (
              <SchoolCard key={school.id} school={school} variant="compact" />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
          <p>
            SSRI 評分基於公開資料分析，不應作為唯一選校依據。
            資料不足不代表學校沒有相關工作，建議向學校查詢進一步資料。
          </p>
        </div>
      </div>
    </AppShell>
  )
}
