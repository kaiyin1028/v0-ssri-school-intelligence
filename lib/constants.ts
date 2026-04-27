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

export const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "管理總覽", icon: "LayoutDashboard" },
  { href: "/admin/crawling", label: "爬蟲監控", icon: "Database" },
  { href: "/admin/evidence", label: "證據審核", icon: "FileSearch" },
  { href: "/admin/scoring", label: "評分審核", icon: "Calculator" }
]
