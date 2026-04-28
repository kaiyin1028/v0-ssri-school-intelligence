"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { createCRMActivity, updateOpportunity } from "@/lib/api"
import { OPPORTUNITY_STAGE_CONFIG } from "@/lib/constants"
import type { CRMActivity, OpportunityStage } from "@/lib/types"
import { format } from "date-fns"
import { zhTW } from "date-fns/locale"
import { 
  CalendarIcon, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  Calendar as CalendarIconSolid,
  Loader2,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FollowUpNoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  opportunityId: string
  schoolName: string
  currentStage: OpportunityStage
  onSuccess?: () => void
}

type ActivityType = CRMActivity["type"]

export function FollowUpNoteModal({
  open,
  onOpenChange,
  opportunityId,
  schoolName,
  currentStage,
  onSuccess
}: FollowUpNoteModalProps) {
  const [activityType, setActivityType] = useState<ActivityType>("Note")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [nextAction, setNextAction] = useState("")
  const [nextActionDate, setNextActionDate] = useState<Date | undefined>()
  const [newStage, setNewStage] = useState<OpportunityStage>(currentStage)
  const [saving, setSaving] = useState(false)

  const activityTypes: { type: ActivityType; icon: React.ElementType; label: string }[] = [
    { type: "Note", icon: MessageSquare, label: "備註" },
    { type: "Call", icon: Phone, label: "電話" },
    { type: "Email", icon: Mail, label: "電郵" },
    { type: "Meeting", icon: CalendarIconSolid, label: "會議" },
    { type: "Proposal", icon: FileText, label: "提案" }
  ]

  const handleSave = async () => {
    if (!content.trim()) return
    
    setSaving(true)
    try {
      // Create the activity
      await createCRMActivity({
        opportunityId,
        type: activityType,
        title: title || `新增${activityTypes.find(a => a.type === activityType)?.label || "活動"}`,
        content,
        createdBy: "系統用戶"
      })

      // Update opportunity if stage changed or next action set
      const updates: Record<string, unknown> = {}
      if (newStage !== currentStage) {
        updates.stage = newStage
        // Also create a stage change activity
        await createCRMActivity({
          opportunityId,
          type: "StageChange",
          title: `階段更新：${OPPORTUNITY_STAGE_CONFIG[newStage].label}`,
          content: `商機階段已更新為「${OPPORTUNITY_STAGE_CONFIG[newStage].label}」`,
          createdBy: "系統用戶"
        })
      }
      if (nextAction) {
        updates.nextAction = nextAction
      }
      if (nextActionDate) {
        updates.nextActionDate = nextActionDate.toISOString()
      }
      
      if (Object.keys(updates).length > 0) {
        await updateOpportunity(opportunityId, updates)
      }

      // Reset form
      setTitle("")
      setContent("")
      setNextAction("")
      setNextActionDate(undefined)
      
      onSuccess?.()
      onOpenChange(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            新增跟進記錄
          </DialogTitle>
          <DialogDescription>
            為 {schoolName} 添加跟進活動記錄
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {/* Activity Type */}
          <div className="space-y-2">
            <Label>活動類型</Label>
            <div className="grid grid-cols-5 gap-2">
              {activityTypes.map(({ type, icon: Icon, label }) => (
                <Button
                  key={type}
                  type="button"
                  variant={activityType === type ? "default" : "outline"}
                  className="flex flex-col h-auto py-3 gap-1"
                  onClick={() => setActivityType(type)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">標題（選填）</Label>
            <Input
              id="title"
              placeholder={`${activityTypes.find(a => a.type === activityType)?.label}記錄`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">內容 *</Label>
            <Textarea
              id="content"
              placeholder="記錄跟進詳情..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Stage Update */}
          <div className="space-y-2">
            <Label>更新階段</Label>
            <Select value={newStage} onValueChange={(v) => setNewStage(v as OpportunityStage)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(OPPORTUNITY_STAGE_CONFIG) as [OpportunityStage, typeof OPPORTUNITY_STAGE_CONFIG.Won][]).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    <span className={config.color}>{config.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Next Action */}
          <div className="space-y-2">
            <Label htmlFor="nextAction">下一步行動（選填）</Label>
            <Input
              id="nextAction"
              placeholder="例如：致電跟進、安排會議..."
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
            />
          </div>

          {/* Next Action Date */}
          <div className="space-y-2">
            <Label>下一步日期（選填）</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !nextActionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {nextActionDate ? format(nextActionDate, "PPP", { locale: zhTW }) : "選擇日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={nextActionDate}
                  onSelect={setNextActionDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!content.trim() || saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                儲存中...
              </>
            ) : (
              "儲存記錄"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
