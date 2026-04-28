"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaturityBadge } from "@/components/common/MaturityBadge"
import { NeedDimensionBadge } from "@/components/common/NeedDimensionBadge"
import { LEVEL_LABELS } from "@/lib/constants"
import type { Solution } from "@/lib/types"
import { 
  Clock, 
  DollarSign, 
  MapPin, 
  CheckCircle, 
  Target, 
  Copy, 
  Check,
  FileText,
  Mail,
  ExternalLink
} from "lucide-react"

interface SolutionDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  solution: Solution | null
  onGenerateProposal?: (solutionId: string) => void
  onGenerateEmail?: (solutionId: string) => void
}

const deliveryModeLabels = {
  Onsite: "實體",
  Online: "線上",
  Hybrid: "混合"
}

export function SolutionDetailModal({
  open,
  onOpenChange,
  solution,
  onGenerateProposal,
  onGenerateEmail
}: SolutionDetailModalProps) {
  const [copiedProposal, setCopiedProposal] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  if (!solution) return null

  const handleCopyProposal = async () => {
    await navigator.clipboard.writeText(solution.proposalTemplate)
    setCopiedProposal(true)
    setTimeout(() => setCopiedProposal(false), 2000)
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(solution.emailTemplate)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl">{solution.nameZh}</DialogTitle>
              {solution.nameEn && (
                <DialogDescription className="mt-1">{solution.nameEn}</DialogDescription>
              )}
            </div>
            <Badge variant={solution.active ? "default" : "secondary"}>
              {solution.active ? "啟用中" : "已停用"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 sticky top-0 bg-background z-10">
              <TabsTrigger value="overview">概覽</TabsTrigger>
              <TabsTrigger value="delivery">交付詳情</TabsTrigger>
              <TabsTrigger value="proposal">提案範本</TabsTrigger>
              <TabsTrigger value="email">Email 範本</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-4 px-1">
              {/* Description */}
              <div>
                <h4 className="font-medium mb-2 text-foreground">服務說明</h4>
                <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
              </div>
              
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">時長</p>
                    <p className="font-medium text-foreground">{solution.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">預算範圍</p>
                    <p className="font-medium text-foreground">{solution.budgetRange}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">交付模式</p>
                    <p className="font-medium text-foreground">{deliveryModeLabels[solution.deliveryMode]}</p>
                  </div>
                </div>
              </div>

              {/* Target Levels */}
              <div>
                <h4 className="font-medium mb-2 text-foreground">適用學校類型</h4>
                <div className="flex flex-wrap gap-2">
                  {solution.targetLevels.map(level => (
                    <Badge key={level} variant="outline">
                      {LEVEL_LABELS[level]}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Suitable Maturity */}
              <div>
                <h4 className="font-medium mb-2 text-foreground">適合 AI 成熟度</h4>
                <div className="flex flex-wrap gap-2">
                  {solution.suitableMaturityLevels.map(level => (
                    <MaturityBadge key={level} level={level} />
                  ))}
                </div>
              </div>

              {/* Need Dimensions */}
              <div>
                <h4 className="font-medium mb-2 text-foreground">對應需要維度</h4>
                <div className="flex flex-wrap gap-2">
                  {solution.mappedNeedDimensions.map(dim => (
                    <NeedDimensionBadge key={dim} dimension={dim} />
                  ))}
                </div>
              </div>

              {/* Expected Outcomes */}
              <div>
                <h4 className="font-medium mb-2 text-foreground">預期成果</h4>
                <ul className="space-y-2">
                  {solution.expectedOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="space-y-6 mt-4 px-1">
              {/* Prerequisites */}
              {solution.prerequisites.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-foreground">先決條件</h4>
                  <ul className="space-y-2">
                    {solution.prerequisites.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-sky-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Deliverables */}
              <div>
                <h4 className="font-medium mb-3 text-foreground">交付物</h4>
                <ul className="space-y-2">
                  {solution.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="proposal" className="mt-4 px-1">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">提案書範本</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyProposal}>
                      {copiedProposal ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1.5" />
                          已複製
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          複製
                        </>
                      )}
                    </Button>
                    {onGenerateProposal && (
                      <Button size="sm" onClick={() => onGenerateProposal(solution.id)}>
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        客製化生成
                      </Button>
                    )}
                  </div>
                </div>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-background rounded-md p-4 border max-h-[300px] overflow-y-auto">
                  {solution.proposalTemplate}
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="mt-4 px-1">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">Email 範本</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyEmail}>
                      {copiedEmail ? (
                        <>
                          <Check className="h-3.5 w-3.5 mr-1.5" />
                          已複製
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          複製
                        </>
                      )}
                    </Button>
                    {onGenerateEmail && (
                      <Button size="sm" onClick={() => onGenerateEmail(solution.id)}>
                        <Mail className="h-3.5 w-3.5 mr-1.5" />
                        客製化生成
                      </Button>
                    )}
                  </div>
                </div>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap bg-background rounded-md p-4 border max-h-[300px] overflow-y-auto">
                  {solution.emailTemplate}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
