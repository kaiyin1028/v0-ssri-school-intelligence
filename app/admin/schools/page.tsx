"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  RefreshCw,
  Download,
  Upload
} from "lucide-react"
import { ScoreBadge } from "@/components/common/ScoreBadge"

const mockSchools = [
  { id: "sch-001", name: "聖保羅男女中學", district: "中西區", type: "直資", score: 87, status: "active", lastUpdate: "2024-01-15" },
  { id: "sch-002", name: "拔萃男書院", district: "九龍城區", type: "直資", score: 85, status: "active", lastUpdate: "2024-01-14" },
  { id: "sch-003", name: "喇沙書院", district: "九龍城區", type: "資助", score: 82, status: "active", lastUpdate: "2024-01-13" },
  { id: "sch-004", name: "皇仁書院", district: "灣仔區", type: "官立", score: 80, status: "pending", lastUpdate: "2024-01-12" },
  { id: "sch-005", name: "英皇書院", district: "中西區", type: "官立", score: 78, status: "active", lastUpdate: "2024-01-11" },
  { id: "sch-006", name: "聖士提反女子中學", district: "中西區", type: "資助", score: 76, status: "inactive", lastUpdate: "2024-01-10" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">啟用</Badge>
    case "pending":
      return <Badge className="bg-amber-100 text-amber-700 border-amber-200">待審核</Badge>
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-700 border-gray-200">停用</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function AdminSchoolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSchools, setSelectedSchools] = useState<string[]>([])

  const filteredSchools = mockSchools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.district.includes(searchQuery)
  )

  const toggleSelectAll = () => {
    if (selectedSchools.length === filteredSchools.length) {
      setSelectedSchools([])
    } else {
      setSelectedSchools(filteredSchools.map(s => s.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedSchools(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">學校管理</h1>
            <p className="text-muted-foreground mt-1">管理學校資料與分析狀態</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              匯入
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              匯出
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新增學校
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋學校名稱或地區..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                重新分析選取項目
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>學校列表</CardTitle>
            <CardDescription>
              共 {filteredSchools.length} 間學校
              {selectedSchools.length > 0 && ` (已選取 ${selectedSchools.length} 間)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedSchools.length === filteredSchools.length && filteredSchools.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead>學校名稱</TableHead>
                  <TableHead>地區</TableHead>
                  <TableHead>類型</TableHead>
                  <TableHead>SSRI 分數</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>最後更新</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedSchools.includes(school.id)}
                        onChange={() => toggleSelect(school.id)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell>{school.district}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{school.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <ScoreBadge score={school.score} size="sm" />
                    </TableCell>
                    <TableCell>{getStatusBadge(school.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{school.lastUpdate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            檢視
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            編輯
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            重新分析
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            刪除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
