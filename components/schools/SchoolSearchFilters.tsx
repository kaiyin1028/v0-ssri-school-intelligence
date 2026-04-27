"use client"

import { Search, Filter, LayoutGrid, List, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DISTRICTS, LEVEL_LABELS, TYPE_LABELS, GRADE_CONFIG, CONFIDENCE_CONFIG } from "@/lib/constants"
import type { SchoolLevel, SchoolType, SSRIGrade, ConfidenceLevel } from "@/lib/types"

interface SchoolSearchFiltersProps {
  query: string
  onQueryChange: (query: string) => void
  district: string
  onDistrictChange: (district: string) => void
  level: string
  onLevelChange: (level: string) => void
  type: string
  onTypeChange: (type: string) => void
  grade: string
  onGradeChange: (grade: string) => void
  confidence: string
  onConfidenceChange: (confidence: string) => void
  sortBy: string
  onSortByChange: (sortBy: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onReset: () => void
}

export function SchoolSearchFilters({
  query,
  onQueryChange,
  district,
  onDistrictChange,
  level,
  onLevelChange,
  type,
  onTypeChange,
  grade,
  onGradeChange,
  confidence,
  onConfidenceChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  onReset
}: SchoolSearchFiltersProps) {
  const hasFilters = district || level || type || grade || confidence

  const FilterSelects = () => (
    <>
      <Select value={district} onValueChange={onDistrictChange}>
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="地區" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部地區</SelectItem>
          {DISTRICTS.map((d) => (
            <SelectItem key={d} value={d}>{d}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={level} onValueChange={onLevelChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="學校類別" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部類別</SelectItem>
          {(Object.keys(LEVEL_LABELS) as SchoolLevel[]).map((l) => (
            <SelectItem key={l} value={l}>{LEVEL_LABELS[l]}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full sm:w-28">
          <SelectValue placeholder="辦學類型" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部類型</SelectItem>
          {(Object.keys(TYPE_LABELS) as SchoolType[]).map((t) => (
            <SelectItem key={t} value={t}>{TYPE_LABELS[t]}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={grade} onValueChange={onGradeChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="評級" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部評級</SelectItem>
          {(Object.keys(GRADE_CONFIG) as SSRIGrade[]).map((g) => (
            <SelectItem key={g} value={g}>{GRADE_CONFIG[g].label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={confidence} onValueChange={onConfidenceChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="資料信心" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部信心</SelectItem>
          {(Object.keys(CONFIDENCE_CONFIG) as ConfidenceLevel[]).map((c) => (
            <SelectItem key={c} value={c}>{CONFIDENCE_CONFIG[c].label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜尋學校名稱（中文或英文）..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 sm:hidden">
              <Filter className="h-4 w-4" />
              篩選
              {hasFilters && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  !
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>篩選條件</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <FilterSelects />
              <Button variant="outline" onClick={onReset} className="mt-4">
                重設篩選
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden flex-wrap items-center gap-3 sm:flex">
        <FilterSelects />
        
        <div className="ml-auto flex items-center gap-2">
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="排序" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score-desc">分數高至低</SelectItem>
              <SelectItem value="score-asc">分數低至高</SelectItem>
              <SelectItem value="name-asc">名稱 A-Z</SelectItem>
              <SelectItem value="updated-desc">最近更新</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-lg border p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">已套用:</span>
          {district && district !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {district}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onDistrictChange("all")} />
            </Badge>
          )}
          {level && level !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {LEVEL_LABELS[level as SchoolLevel]}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onLevelChange("all")} />
            </Badge>
          )}
          {type && type !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {TYPE_LABELS[type as SchoolType]}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onTypeChange("all")} />
            </Badge>
          )}
          {grade && grade !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {GRADE_CONFIG[grade as SSRIGrade].label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onGradeChange("all")} />
            </Badge>
          )}
          {confidence && confidence !== "all" && (
            <Badge variant="secondary" className="gap-1">
              信心: {CONFIDENCE_CONFIG[confidence as ConfidenceLevel].label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onConfidenceChange("all")} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onReset} className="h-6 text-xs">
            清除全部
          </Button>
        </div>
      )}
    </div>
  )
}
