import { cn } from "@/lib/utils"
import { 
  Brain, 
  Sparkles, 
  School, 
  BarChart3, 
  Users, 
  FileSearch,
  Network,
  ShieldCheck
} from "lucide-react"

interface AIIllustrationCardProps {
  variant: "school-insight" | "evidence-trail" | "parent-report"
  className?: string
}

export function AIIllustrationCard({ variant, className }: AIIllustrationCardProps) {
  if (variant === "school-insight") {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 p-6",
        className
      )}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-100/50" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-100/50" />
        
        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
            <School className="h-7 w-7 text-sky-600" />
          </div>
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-sky-700">AI 智能分析</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 rounded bg-sky-200/60" />
              <div className="h-2 w-1/2 rounded bg-emerald-200/60" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="flex h-12 items-center justify-center rounded-lg bg-white/80 shadow-sm">
            <BarChart3 className="h-5 w-5 text-sky-500" />
          </div>
          <div className="flex h-12 items-center justify-center rounded-lg bg-white/80 shadow-sm">
            <Users className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex h-12 items-center justify-center rounded-lg bg-white/80 shadow-sm">
            <Brain className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "evidence-trail") {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-sky-50 p-6",
        className
      )}>
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-100/50" />
        
        <div className="relative space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
              <FileSearch className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="h-2 w-2/3 rounded bg-amber-200/80" />
            </div>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>
          
          <div className="ml-5 border-l-2 border-dashed border-sky-200 py-2 pl-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-sky-400" />
              <div className="h-2 w-1/2 rounded bg-sky-200/60" />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
              <Network className="h-5 w-5 text-sky-600" />
            </div>
            <div className="flex-1">
              <div className="h-2 w-3/4 rounded bg-sky-200/80" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // parent-report variant
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-6",
      className
    )}>
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-emerald-100/50" />
      
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
            <Users className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-700">家長報告</p>
            <p className="text-xs text-muted-foreground">清晰易讀</p>
          </div>
        </div>
        
        <div className="space-y-2 rounded-lg bg-white/80 p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-2 w-1/3 rounded bg-emerald-200/80" />
            <div className="flex gap-1">
              <div className="h-3 w-3 rounded bg-sky-300" />
              <div className="h-3 w-3 rounded bg-emerald-300" />
              <div className="h-3 w-3 rounded bg-amber-300" />
            </div>
          </div>
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-2/3 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
