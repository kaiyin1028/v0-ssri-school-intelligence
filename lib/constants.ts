// SSRI School Intelligence Platform - Constants

import type { SSRIDomain, SSRIGrade, ConfidenceLevel, SchoolLevel, SchoolType } from "./types"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"

export const DOMAIN_LABELS: Record<SSRIDomain, { zh: string; en: string; description: string }> = {
  Culture: {
    zh: "文化歸屬",
    en: "School Culture & Belonging",
    description: "學校文化與歸屬感"
  },
  Inclusion: {
    zh: "共融多元",
    en: "Inclusion & Diversity",
    description: "共融與多元包容"
  },
  Community: {
    zh: "社區連結",
    en: "Community Engagement",
    description: "社區連結與社會參與"
  },
  Innovation: {
    zh: "課程創新",
    en: "Curriculum Innovation",
    description: "課程創新與社會責任教育"
  },
  WholePerson: {
    zh: "全人發展",
    en: "Whole-Person Development",
    description: "學生全人發展"
  },
  Governance: {
    zh: "管治透明",
    en: "Governance Transparency",
    description: "管治透明度與持份者參與"
  }
}

export const GRADE_CONFIG: Record<SSRIGrade, { color: string; bgColor: string; label: string; range: string }> = {
  Platinum: {
    color: "text-sky-700",
    bgColor: "bg-sky-100",
    label: "卓越",
    range: "90-100"
  },
  Gold: {
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    label: "優良",
    range: "75-89"
  },
  Silver: {
    color: "text-slate-700",
    bgColor: "bg-slate-100",
    label: "良好",
    range: "60-74"
  },
  Developing: {
    color: "text-emerald-700",
    bgColor: "bg-emerald-100",
    label: "發展中",
    range: "40-59"
  },
  "Insufficient Data": {
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    label: "資料不足",
    range: "N/A"
  }
}

export const CONFIDENCE_CONFIG: Record<ConfidenceLevel, { color: string; bgColor: string; label: string }> = {
  High: {
    color: "text-emerald-700",
    bgColor: "bg-emerald-100",
    label: "高"
  },
  Medium: {
    color: "text-sky-700",
    bgColor: "bg-sky-100",
    label: "中"
  },
  Low: {
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    label: "低"
  },
  Insufficient: {
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    label: "不足"
  }
}

export const LEVEL_LABELS: Record<SchoolLevel, string> = {
  Primary: "小學",
  Secondary: "中學",
  Special: "特殊學校",
  International: "國際學校"
}

export const TYPE_LABELS: Record<SchoolType, string> = {
  Government: "官立",
  Aided: "資助",
  DSS: "直資",
  Private: "私立",
  International: "國際"
}

export const SSRI_DIMENSIONS = [
  {
    id: "student-wellbeing",
    name: "學生福祉",
    description: "學生身心健康、輔導服務、校園安全",
    weight: 20,
    color: "#10b981",
    indicators: ["輔導服務質量", "心理健康支援", "校園安全措施", "學生支援多樣性"]
  },
  {
    id: "teacher-development",
    name: "教師發展",
    description: "教師培訓、專業發展、教學創新",
    weight: 18,
    color: "#0ea5e9",
    indicators: ["教師培訓時數", "教師流失率", "專業資格比例", "教學創新"]
  },
  {
    id: "community-engagement",
    name: "社區參與",
    description: "家長參與、社區合作、義工服務",
    weight: 15,
    color: "#8b5cf6",
    indicators: ["家長參與度", "社區合作", "義工服務", "校友網絡"]
  },
  {
    id: "curriculum-innovation",
    name: "課程創新",
    description: "跨學科學習、環境教育、公民教育",
    weight: 17,
    color: "#f59e0b",
    indicators: ["跨學科課程", "環境教育", "公民教育", "STEM教育"]
  },
  {
    id: "governance-transparency",
    name: "管治透明",
    description: "財務公開、決策透明、問責機制",
    weight: 15,
    color: "#ef4444",
    indicators: ["財務公開", "決策透明", "問責機制", "資訊披露"]
  },
  {
    id: "environmental-sustainability",
    name: "環境永續",
    description: "環保措施、資源節約、綠色校園",
    weight: 15,
    color: "#22c55e",
    indicators: ["環保措施", "資源節約", "綠色校園", "環境教育"]
  }
]

export const DISTRICTS = [
  "中西區",
  "灣仔",
  "東區",
  "南區",
  "油尖旺",
  "深水埗",
  "九龍城",
  "黃大仙",
  "觀塘",
  "葵青",
  "荃灣",
  "屯門",
  "元朗",
  "北區",
  "大埔",
  "沙田",
  "西貢",
  "離島"
]

export const SOURCE_TYPE_LABELS: Record<string, string> = {
  Government: "政府資料",
  "School Website": "學校網站",
  "Annual Report": "年報",
  NGO: "非政府組織",
  Media: "媒體報導",
  Social: "社交媒體",
  Other: "其他"
}

export const VERIFICATION_STATUS_LABELS: Record<string, { label: string; color: string; bgColor: string }> = {
  "AI Extracted": {
    label: "AI 抽取",
    color: "text-sky-700",
    bgColor: "bg-sky-100"
  },
  "Human Verified": {
    label: "人工核實",
    color: "text-emerald-700",
    bgColor: "bg-emerald-100"
  },
  Rejected: {
    label: "已拒絕",
    color: "text-red-700",
    bgColor: "bg-red-100"
  },
  "Needs Review": {
    label: "待審核",
    color: "text-amber-700",
    bgColor: "bg-amber-100"
  }
}

export const NAV_ITEMS = [
  { href: "/", label: "首頁", icon: "Home" },
  { href: "/schools", label: "學校搜尋", icon: "Search" },
  { href: "/compare", label: "比較學校", icon: "GitCompare" },
  { href: "/reports", label: "報告庫", icon: "FileText" },
  { href: "/methodology", label: "評分方法", icon: "BookOpen" }
]

export const AI_NEEDS_NAV_ITEMS = [
  { href: "/needs", label: "需求雷達", icon: "Radar" },
  { href: "/opportunities", label: "商機名單", icon: "Target" },
  { href: "/solutions", label: "服務方案庫", icon: "Briefcase" },
  { href: "/crm", label: "跟進工作台", icon: "ClipboardList" }
]

export const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "管理總覽", icon: "LayoutDashboard" },
  { href: "/admin/crawling", label: "爬蟲監控", icon: "Database" },
  { href: "/admin/evidence", label: "證據審核", icon: "FileSearch" },
  { href: "/admin/scoring", label: "評分審核", icon: "Calculator" },
  { href: "/admin/need-model", label: "需求模型", icon: "Brain" },
  { href: "/admin/solution-catalog", label: "方案管理", icon: "Package" }
]

// AI Education Needs Module Constants
import type { NeedDimension, AIMaturityLevel, OpportunityStage, SignalCategory, SignalSource } from "./types"

export const NEED_DIMENSION_LABELS: Record<NeedDimension, { zh: string; en: string; icon: string }> = {
  TeacherTraining: { zh: "教師培訓", en: "Teacher Training", icon: "GraduationCap" },
  AICurriculum: { zh: "AI 課程包", en: "AI Curriculum", icon: "BookOpenCheck" },
  StudentCompetition: { zh: "學生比賽", en: "Student Competition", icon: "Trophy" },
  AIPolicy: { zh: "AI 政策", en: "AI Policy", icon: "ShieldAlert" },
  Hardware: { zh: "硬件設備", en: "Hardware", icon: "MonitorCog" },
  SoftwarePlatform: { zh: "軟件平台", en: "Software Platform", icon: "PanelsTopLeft" },
  SchoolBasedConsulting: { zh: "校本顧問", en: "School-based Consulting", icon: "Lightbulb" },
  SafetyCompliance: { zh: "安全合規", en: "Safety & Compliance", icon: "LockKeyhole" }
}

export const MATURITY_LEVEL_CONFIG: Record<AIMaturityLevel, { label: string; color: string; bgColor: string; description: string }> = {
  A_Leading: { 
    label: "領先", 
    color: "text-emerald-700", 
    bgColor: "bg-emerald-100",
    description: "已有完善 AI 教育體系"
  },
  B_Progressive: { 
    label: "進取", 
    color: "text-sky-700", 
    bgColor: "bg-sky-100",
    description: "積極發展 AI 教育"
  },
  C_Starting: { 
    label: "啟動中", 
    color: "text-amber-700", 
    bgColor: "bg-amber-100",
    description: "開始探索 AI 教育"
  },
  D_SilentPotential: { 
    label: "沉默潛力", 
    color: "text-slate-600", 
    bgColor: "bg-slate-100",
    description: "公開資料較少"
  }
}

export const OPPORTUNITY_STAGE_CONFIG: Record<OpportunityStage, { label: string; color: string; bgColor: string }> = {
  "Not Contacted": { label: "未聯繫", color: "text-slate-600", bgColor: "bg-slate-100" },
  "Contacted": { label: "已聯繫", color: "text-sky-700", bgColor: "bg-sky-100" },
  "Replied": { label: "已回覆", color: "text-blue-700", bgColor: "bg-blue-100" },
  "Meeting Scheduled": { label: "會議已排", color: "text-violet-700", bgColor: "bg-violet-100" },
  "Proposal Sent": { label: "已提案", color: "text-amber-700", bgColor: "bg-amber-100" },
  "Pilot": { label: "試點中", color: "text-orange-700", bgColor: "bg-orange-100" },
  "Won": { label: "成功", color: "text-emerald-700", bgColor: "bg-emerald-100" },
  "Paused": { label: "暫停", color: "text-gray-600", bgColor: "bg-gray-100" },
  "Lost": { label: "失敗", color: "text-red-700", bgColor: "bg-red-100" }
}

export const PRIORITY_CONFIG: Record<"High" | "Medium" | "Low", { label: string; color: string; bgColor: string }> = {
  High: { label: "高", color: "text-emerald-700", bgColor: "bg-emerald-100" },
  Medium: { label: "中", color: "text-sky-700", bgColor: "bg-sky-100" },
  Low: { label: "低", color: "text-slate-600", bgColor: "bg-slate-100" }
}

export const SIGNAL_CATEGORY_LABELS: Record<SignalCategory, string> = {
  Curriculum: "課程",
  Activity: "活動",
  Competition: "比賽",
  TeacherDevelopment: "教師發展",
  Equipment: "設備",
  Tender: "招標",
  ParentEducation: "家長教育",
  Policy: "政策",
  ManualInput: "人工輸入",
  Other: "其他"
}

export const SIGNAL_SOURCE_LABELS: Record<SignalSource, string> = {
  "School Website": "學校網站",
  Tender: "招標平台",
  "Competition Site": "比賽網站",
  Government: "政府資料",
  Media: "媒體報導",
  "Social Media": "社交媒體",
  "Manual Input": "人工輸入",
  Other: "其他"
}
