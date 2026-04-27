"use client"

import { useState } from "react"
import { ExternalLink, Filter, FileText } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DOMAIN_LABELS, SOURCE_TYPE_LABELS, VERIFICATION_STATUS_LABELS } from "@/lib/constants"
import type { EvidenceItem, SSRIDomain, SourceType, VerificationStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SchoolEvidenceTableProps {
  evidence: EvidenceItem[]
  loading?: boolean
}

export function SchoolEvidenceTable({ evidence, loading }: SchoolEvidenceTableProps) {
  const [domainFilter, setDomainFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredEvidence = evidence.filter((e) => {
    if (domainFilter !== "all" && e.domain !== domainFilter) return false
    if (sourceFilter !== "all" && e.sourceType !== sourceFilter) return false
    if (statusFilter !== "all" && e.verificationStatus !== statusFilter) return false
    return true
  })

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5" />
            證據列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              證據列表
            </CardTitle>
            <CardDescription>
              共 {evidence.length} 項證據，顯示 {filteredEvidence.length} 項
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="h-8 w-28 text-xs">
                <SelectValue placeholder="範疇" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部範疇</SelectItem>
                {(Object.keys(DOMAIN_LABELS) as SSRIDomain[]).map((d) => (
                  <SelectItem key={d} value={d}>{DOMAIN_LABELS[d].zh}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="h-8 w-28 text-xs">
                <SelectValue placeholder="來源" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部來源</SelectItem>
                {Object.keys(SOURCE_TYPE_LABELS).map((s) => (
                  <SelectItem key={s} value={s}>{SOURCE_TYPE_LABELS[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-28 text-xs">
                <SelectValue placeholder="狀態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部狀態</SelectItem>
                {Object.keys(VERIFICATION_STATUS_LABELS).map((s) => (
                  <SelectItem key={s} value={s}>{VERIFICATION_STATUS_LABELS[s].label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredEvidence.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            沒有符合條件的證據
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">範疇</TableHead>
                  <TableHead className="w-32">指標</TableHead>
                  <TableHead className="min-w-[200px]">證據摘要</TableHead>
                  <TableHead className="w-24">來源類型</TableHead>
                  <TableHead className="w-40">來源標題</TableHead>
                  <TableHead className="w-20">信心</TableHead>
                  <TableHead className="w-24">狀態</TableHead>
                  <TableHead className="w-16">連結</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvidence.map((item) => {
                  const statusConfig = VERIFICATION_STATUS_LABELS[item.verificationStatus]
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {DOMAIN_LABELS[item.domain as SSRIDomain]?.zh || item.domain}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {item.indicator}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {item.evidenceSummary}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {SOURCE_TYPE_LABELS[item.sourceType as SourceType] || item.sourceType}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="line-clamp-1 text-xs">
                          {item.sourceTitle}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <div 
                            className={cn(
                              "h-2 w-2 rounded-full",
                              item.aiConfidence >= 0.8 ? "bg-emerald-500" :
                              item.aiConfidence >= 0.6 ? "bg-sky-500" :
                              item.aiConfidence >= 0.4 ? "bg-amber-500" : "bg-gray-400"
                            )}
                          />
                          <span className="text-xs text-muted-foreground">
                            {Math.round(item.aiConfidence * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={cn("text-xs", statusConfig.color, statusConfig.bgColor)}
                        >
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.sourceUrl && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            asChild
                          >
                            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
