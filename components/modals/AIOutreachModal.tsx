"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateOutreach } from "@/lib/api"
import { Sparkles, Copy, Send, RefreshCw, Mail, MessageSquare, Phone, FileText, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIOutreachModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schoolId: string
  schoolName: string
  solutionId?: string
}

type Channel = "Email" | "WhatsApp" | "Phone" | "Proposal"
type Tone = "formal" | "friendly" | "concise"

export function AIOutreachModal({
  open,
  onOpenChange,
  schoolId,
  schoolName,
  solutionId
}: AIOutreachModalProps) {
  const [channel, setChannel] = useState<Channel>("Email")
  const [tone, setTone] = useState<Tone>("formal")
  const [generating, setGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<{ subject?: string; body: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [editedContent, setEditedContent] = useState("")

  const handleGenerate = async () => {
    setGenerating(true)
    setCopied(false)
    try {
      const result = await generateOutreach({
        schoolId,
        channel,
        tone,
        solutionId
      })
      setGeneratedContent(result)
      setEditedContent(result.body)
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = async () => {
    const textToCopy = generatedContent?.subject 
      ? `主旨：${generatedContent.subject}\n\n${editedContent}`
      : editedContent
    
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const channelConfig = {
    Email: { icon: Mail, label: "電郵", hasSubject: true },
    WhatsApp: { icon: MessageSquare, label: "WhatsApp", hasSubject: false },
    Phone: { icon: Phone, label: "電話腳本", hasSubject: false },
    Proposal: { icon: FileText, label: "提案", hasSubject: true }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 外展內容生成
          </DialogTitle>
          <DialogDescription>
            為 {schoolName} 生成個性化聯絡文案
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {/* Channel Selection */}
          <div className="space-y-2">
            <Label>聯絡渠道</Label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.entries(channelConfig) as [Channel, typeof channelConfig.Email][]).map(([key, config]) => {
                const Icon = config.icon
                return (
                  <Button
                    key={key}
                    type="button"
                    variant={channel === key ? "default" : "outline"}
                    className="flex flex-col h-auto py-3 gap-1"
                    onClick={() => setChannel(key)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{config.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-2">
            <Label>語氣風格</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">正式專業</SelectItem>
                <SelectItem value="friendly">親切友善</SelectItem>
                <SelectItem value="concise">簡潔直接</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            disabled={generating}
            className="w-full"
          >
            {generating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                生成內容
              </>
            )}
          </Button>

          {/* Generated Content */}
          {generatedContent && (
            <div className="space-y-4 pt-4 border-t">
              {generatedContent.subject && (
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">主旨</Label>
                  <p className="font-medium text-foreground bg-muted/50 rounded-md px-3 py-2">
                    {generatedContent.subject}
                  </p>
                </div>
              )}
              
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">內容（可編輯）</Label>
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 border-t pt-4">
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              取消
            </Button>
            {generatedContent && (
              <>
                <Button variant="outline" onClick={handleGenerate} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  重新生成
                </Button>
                <Button onClick={handleCopy} className="flex-1">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      已複製
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      複製內容
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
