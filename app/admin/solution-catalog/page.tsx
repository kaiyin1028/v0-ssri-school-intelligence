"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingState } from "@/components/common/LoadingState"
import { getSolutions, createSolution, updateSolution, deleteSolution } from "@/lib/api"
import { NEED_DIMENSION_LABELS, MATURITY_LEVEL_CONFIG, SCHOOL_LEVELS } from "@/lib/constants"
import type { Solution } from "@/lib/types"
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye,
  Copy,
  Search,
  Filter,
  Package
} from "lucide-react"

export default function SolutionCatalogPage() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  useEffect(() => {
    loadSolutions()
  }, [])

  const loadSolutions = async () => {
    setLoading(true)
    const data = await getSolutions()
    setSolutions(data)
    setLoading(false)
  }

  const handleToggleActive = async (solution: Solution) => {
    await updateSolution(solution.id, { active: !solution.active })
    loadSolutions()
  }

  const handleDelete = async (solutionId: string) => {
    if (confirm("確定要刪除此方案？")) {
      await deleteSolution(solutionId)
      loadSolutions()
    }
  }

  const filteredSolutions = solutions.filter(sol =>
    sol.nameZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sol.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LoadingState message="載入方案庫..." />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">方案管理</h1>
            <p className="mt-2 text-muted-foreground">
              管理服務方案目錄，包括方案詳情、範本及配對規則
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新增方案
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{solutions.length}</p>
                  <p className="text-sm text-muted-foreground">總方案數</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2">
                  <Package className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{solutions.filter(s => s.active).length}</p>
                  <p className="text-sm text-muted-foreground">啟用中</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <Package className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{solutions.filter(s => !s.active).length}</p>
                  <p className="text-sm text-muted-foreground">已停用</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-sky-100 p-2">
                  <Package className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {[...new Set(solutions.flatMap(s => s.mappedNeedDimensions))].length}
                  </p>
                  <p className="text-sm text-muted-foreground">覆蓋維度</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜尋方案名稱或描述..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                篩選
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Solution Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>方案名稱</TableHead>
                  <TableHead>對應維度</TableHead>
                  <TableHead>適用程度</TableHead>
                  <TableHead>預算範圍</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSolutions.map((solution) => (
                  <TableRow key={solution.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{solution.nameZh}</p>
                        <p className="text-sm text-muted-foreground">{solution.deliveryMode} · {solution.duration}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {solution.mappedNeedDimensions.slice(0, 2).map((dim) => (
                          <Badge key={dim} variant="secondary" className="text-xs">
                            {NEED_DIMENSION_LABELS[dim]?.zh || dim}
                          </Badge>
                        ))}
                        {solution.mappedNeedDimensions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{solution.mappedNeedDimensions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {solution.suitableMaturityLevels.slice(0, 2).map((level) => (
                          <Badge 
                            key={level} 
                            variant="outline" 
                            className={`text-xs ${MATURITY_LEVEL_CONFIG[level].bgColor} ${MATURITY_LEVEL_CONFIG[level].color}`}
                          >
                            {MATURITY_LEVEL_CONFIG[level].label}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{solution.budgetRange}</TableCell>
                    <TableCell>
                      <Switch
                        checked={solution.active}
                        onCheckedChange={() => handleToggleActive(solution)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedSolution(solution)
                            setIsDetailOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedSolution(solution)
                            setIsEditOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(solution.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            {selectedSolution && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedSolution.nameZh}</DialogTitle>
                  <DialogDescription>{selectedSolution.nameEn}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-muted-foreground">方案描述</h4>
                    <p className="text-sm">{selectedSolution.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-muted-foreground">交付模式</h4>
                      <p className="text-sm">{selectedSolution.deliveryMode}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-muted-foreground">時長</h4>
                      <p className="text-sm">{selectedSolution.duration}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-muted-foreground">預算範圍</h4>
                      <p className="text-sm">{selectedSolution.budgetRange}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-muted-foreground">對應維度</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSolution.mappedNeedDimensions.map((dim) => (
                          <Badge key={dim} variant="secondary" className="text-xs">
                            {NEED_DIMENSION_LABELS[dim]?.zh || dim}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-muted-foreground">先決條件</h4>
                    <ul className="list-inside list-disc text-sm">
                      {selectedSolution.prerequisites.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-muted-foreground">交付成果</h4>
                    <ul className="list-inside list-disc text-sm">
                      {selectedSolution.deliverables.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-muted-foreground">預期成效</h4>
                    <ul className="list-inside list-disc text-sm">
                      {selectedSolution.expectedOutcomes.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                    關閉
                  </Button>
                  <Button onClick={() => {
                    setIsDetailOpen(false)
                    setIsEditOpen(true)
                  }}>
                    編輯
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>編輯方案</DialogTitle>
              <DialogDescription>
                修改方案詳情及配對規則
              </DialogDescription>
            </DialogHeader>
            {selectedSolution && (
              <div className="space-y-4">
                <div>
                  <Label>方案名稱（中文）</Label>
                  <Input defaultValue={selectedSolution.nameZh} />
                </div>
                <div>
                  <Label>方案名稱（英文）</Label>
                  <Input defaultValue={selectedSolution.nameEn} />
                </div>
                <div>
                  <Label>方案描述</Label>
                  <Textarea defaultValue={selectedSolution.description} rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>交付模式</Label>
                    <Select defaultValue={selectedSolution.deliveryMode}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Onsite">實體</SelectItem>
                        <SelectItem value="Online">線上</SelectItem>
                        <SelectItem value="Hybrid">混合</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>時長</Label>
                    <Input defaultValue={selectedSolution.duration} />
                  </div>
                </div>
                <div>
                  <Label>預算範圍</Label>
                  <Input defaultValue={selectedSolution.budgetRange} />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                取消
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>
                儲存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
