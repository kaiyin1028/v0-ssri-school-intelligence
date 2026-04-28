// SSRI School Intelligence Platform - Mock Data
// TODO: Replace with real FastAPI backend data

import type {
  School,
  EvidenceItem,
  Report,
  CrawlJob,
  TimelineEvent,
  SchoolAISummary,
  AdminDashboardStats,
  SSRIDomainScore
} from "./types"

const createDomainScores = (scores: (number | null)[]): SSRIDomainScore[] => [
  { domain: "Culture", labelZh: "文化歸屬", labelEn: "Culture & Belonging", score: scores[0], confidence: scores[0] ? "High" : "Insufficient", evidenceCount: scores[0] ? 12 : 0 },
  { domain: "Inclusion", labelZh: "共融多元", labelEn: "Inclusion & Diversity", score: scores[1], confidence: scores[1] ? "Medium" : "Insufficient", evidenceCount: scores[1] ? 8 : 0 },
  { domain: "Community", labelZh: "社區連結", labelEn: "Community Engagement", score: scores[2], confidence: scores[2] ? "High" : "Insufficient", evidenceCount: scores[2] ? 15 : 0 },
  { domain: "Innovation", labelZh: "課程創新", labelEn: "Curriculum Innovation", score: scores[3], confidence: scores[3] ? "Medium" : "Insufficient", evidenceCount: scores[3] ? 6 : 0 },
  { domain: "WholePerson", labelZh: "全人發展", labelEn: "Whole-Person Development", score: scores[4], confidence: scores[4] ? "High" : "Insufficient", evidenceCount: scores[4] ? 18 : 0 },
  { domain: "Governance", labelZh: "管治透明", labelEn: "Governance Transparency", score: scores[5], confidence: scores[5] ? "Low" : "Insufficient", evidenceCount: scores[5] ? 4 : 0 }
]

export const mockSchools: School[] = [
  {
    id: "sch-001",
    nameZh: "明德書院",
    nameEn: "Ming Tak College",
    district: "中西區",
    level: "Secondary",
    type: "Aided",
    genderType: "男女校",
    religion: "基督教",
    sponsoringBody: "明德教育基金會",
    website: "https://example.com/mingtakcollege",
    address: "香港中西區堅道123號",
    totalScore: 82,
    grade: "Gold",
    confidence: "High",
    lastUpdated: "2024-03-15",
    domainScores: createDomainScores([85, 78, 88, 75, 82, 80]),
    evidenceCount: 63
  },
  {
    id: "sch-002",
    nameZh: "港島共融中學",
    nameEn: "Island Inclusive Secondary School",
    district: "東區",
    level: "Secondary",
    type: "DSS",
    genderType: "男女校",
    website: "https://example.com/iiss",
    address: "香港東區筲箕灣道456號",
    totalScore: 91,
    grade: "Platinum",
    confidence: "High",
    lastUpdated: "2024-03-18",
    domainScores: createDomainScores([92, 95, 88, 90, 89, 92]),
    evidenceCount: 87
  },
  {
    id: "sch-003",
    nameZh: "九龍創新書院",
    nameEn: "Kowloon Innovation Academy",
    district: "九龍城",
    level: "Secondary",
    type: "Private",
    genderType: "男女校",
    website: "https://example.com/kia",
    address: "九龍城區聯合道789號",
    totalScore: 78,
    grade: "Gold",
    confidence: "Medium",
    lastUpdated: "2024-03-10",
    domainScores: createDomainScores([75, 72, 80, 88, 76, 77]),
    evidenceCount: 45
  },
  {
    id: "sch-004",
    nameZh: "新界仁愛小學",
    nameEn: "New Territories Benevolent Primary School",
    district: "沙田",
    level: "Primary",
    type: "Aided",
    genderType: "男女校",
    religion: "天主教",
    website: "https://example.com/ntbps",
    address: "沙田區大圍道321號",
    totalScore: 68,
    grade: "Silver",
    confidence: "Medium",
    lastUpdated: "2024-03-12",
    domainScores: createDomainScores([70, 65, 72, 62, 75, 64]),
    evidenceCount: 38
  },
  {
    id: "sch-005",
    nameZh: "星河國際學校",
    nameEn: "Galaxy International School",
    district: "南區",
    level: "International",
    type: "International",
    genderType: "男女校",
    website: "https://example.com/gis",
    address: "香港南區淺水灣道100號",
    totalScore: 85,
    grade: "Gold",
    confidence: "High",
    lastUpdated: "2024-03-20",
    domainScores: createDomainScores([88, 90, 82, 85, 83, 82]),
    evidenceCount: 72
  },
  {
    id: "sch-006",
    nameZh: "和平基督教中學",
    nameEn: "Peace Christian Secondary School",
    district: "觀塘",
    level: "Secondary",
    type: "Aided",
    genderType: "男女校",
    religion: "基督教",
    website: "https://example.com/pcss",
    address: "觀塘區秀茂坪道567號",
    totalScore: 55,
    grade: "Developing",
    confidence: "Low",
    lastUpdated: "2024-02-28",
    domainScores: createDomainScores([58, 52, 60, 48, 55, 57]),
    evidenceCount: 22
  },
  {
    id: "sch-007",
    nameZh: "啟智特殊學校",
    nameEn: "Enlightenment Special School",
    district: "屯門",
    level: "Special",
    type: "Aided",
    genderType: "男女校",
    website: "https://example.com/ess",
    address: "屯門區青山道888號",
    totalScore: 76,
    grade: "Gold",
    confidence: "Medium",
    lastUpdated: "2024-03-08",
    domainScores: createDomainScores([80, 85, 72, 68, 78, 73]),
    evidenceCount: 41
  },
  {
    id: "sch-008",
    nameZh: "海濱官立小學",
    nameEn: "Seaside Government Primary School",
    district: "荃灣",
    level: "Primary",
    type: "Government",
    genderType: "男女校",
    website: "https://example.com/sgps",
    address: "荃灣區海濱花園道12號",
    totalScore: null,
    grade: "Insufficient Data",
    confidence: "Insufficient",
    lastUpdated: "2024-01-15",
    domainScores: createDomainScores([null, null, 45, null, null, 50]),
    evidenceCount: 8
  }
]

export const mockAISummaries: Record<string, SchoolAISummary> = {
  "sch-001": {
    schoolId: "sch-001",
    summary: "明德書院在社區連結及學校文化方面表現出色，公開資料顯示學校積極參與社區服務活動，並建立了良好的校園歸屬感文化。課程創新方面有發展空間，建議關注社會責任教育的深化。",
    strengths: [
      "社區服務學習計劃完善，每年組織超過20項社區參與活動",
      "學生輔導及支援系統健全，設有專業團隊",
      "校園文化活動豐富，促進學生歸屬感"
    ],
    improvementAreas: [
      "課程創新方面的公開資料相對較少",
      "管治透明度資料可進一步豐富",
      "建議增加持份者參與的公開報告"
    ],
    generatedAt: "2024-03-15T10:30:00Z"
  },
  "sch-002": {
    schoolId: "sch-002",
    summary: "港島共融中學是一所在共融及多元包容方面表現卓越的學校。公開資料顯示學校在特殊教育需要支援、文化多元共融及全人發展方面均有豐富實踐經驗。整體評分達卓越水平。",
    strengths: [
      "SEN 支援服務完善，設有專業團隊及資源室",
      "多元文化共融活動多樣，定期舉辦國際文化週",
      "管治透明度高，財務報告及決策過程公開",
      "社區參與廣泛，與多間社福機構建立長期合作"
    ],
    improvementAreas: [
      "課程創新方面可考慮更多跨學科協作",
      "建議增加學生主導的社區服務項目"
    ],
    generatedAt: "2024-03-18T14:20:00Z"
  }
}

export const mockEvidence: EvidenceItem[] = [
  {
    id: "ev-001",
    schoolId: "sch-001",
    domain: "Community",
    indicator: "社區服務學習",
    evidenceSummary: "學校年報記載每年組織學生參與超過20項社區服務活動，包括長者探訪、環保清潔及義工服務。",
    evidenceText: "本校致力推動服務學習，2023-24學年共組織學生參與23項社區服務活動...",
    sourceType: "Annual Report",
    sourceTitle: "明德書院 2023-24 年報",
    sourceUrl: "https://example.com/mingtakcollege/report2024.pdf",
    publishedDate: "2024-01-10",
    crawledAt: "2024-03-15T08:00:00Z",
    aiConfidence: 0.92,
    sourceReliability: 0.85,
    verificationStatus: "Human Verified"
  },
  {
    id: "ev-002",
    schoolId: "sch-001",
    domain: "Culture",
    indicator: "學生輔導服務",
    evidenceSummary: "學校網站顯示設有專業輔導團隊，包括2名註冊社工及1名教育心理學家。",
    sourceType: "School Website",
    sourceTitle: "學生支援服務",
    sourceUrl: "https://example.com/mingtakcollege/support",
    crawledAt: "2024-03-14T10:30:00Z",
    aiConfidence: 0.88,
    sourceReliability: 0.75,
    verificationStatus: "AI Extracted"
  },
  {
    id: "ev-003",
    schoolId: "sch-002",
    domain: "Inclusion",
    indicator: "SEN 支援",
    evidenceSummary: "教育局資料顯示學校獲批融合教育資助，設有特殊教育需要統籌主任及資源教學助理。",
    sourceType: "Government",
    sourceTitle: "教育局融合教育學校名單",
    sourceUrl: "https://example.gov.hk/sen-schools",
    publishedDate: "2024-02-01",
    crawledAt: "2024-03-10T09:00:00Z",
    aiConfidence: 0.95,
    sourceReliability: 0.95,
    verificationStatus: "Human Verified"
  },
  {
    id: "ev-004",
    schoolId: "sch-002",
    domain: "Governance",
    indicator: "財務透明度",
    evidenceSummary: "學校網站公開年度財務報告，包括收入來源、支出分佈及儲備運用情況。",
    sourceType: "School Website",
    sourceTitle: "2023-24 財務報告",
    sourceUrl: "https://example.com/iiss/finance2024",
    publishedDate: "2024-02-15",
    crawledAt: "2024-03-18T11:00:00Z",
    aiConfidence: 0.90,
    sourceReliability: 0.80,
    verificationStatus: "AI Extracted"
  },
  {
    id: "ev-005",
    schoolId: "sch-001",
    domain: "Innovation",
    indicator: "STEM 教育",
    evidenceSummary: "媒體報導顯示學校參與教育局 STEM 先導計劃，設有創客實驗室。",
    sourceType: "Media",
    sourceTitle: "教育新聞網 - STEM 學校專訪",
    sourceUrl: "https://example.com/news/stem-school",
    publishedDate: "2023-11-20",
    crawledAt: "2024-03-12T14:00:00Z",
    aiConfidence: 0.78,
    sourceReliability: 0.65,
    verificationStatus: "Needs Review"
  }
]

export const mockReports: Report[] = [
  {
    id: "rpt-001",
    schoolId: "sch-001",
    schoolName: "明德書院",
    period: "2023-24",
    totalScore: 82,
    grade: "Gold",
    confidence: "High",
    generatedAt: "2024-03-15T12:00:00Z",
    status: "Published"
  },
  {
    id: "rpt-002",
    schoolId: "sch-002",
    schoolName: "港島共融中學",
    period: "2023-24",
    totalScore: 91,
    grade: "Platinum",
    confidence: "High",
    generatedAt: "2024-03-18T15:00:00Z",
    status: "Published"
  },
  {
    id: "rpt-003",
    schoolId: "sch-003",
    schoolName: "九龍創新書院",
    period: "2023-24",
    totalScore: 78,
    grade: "Gold",
    confidence: "Medium",
    generatedAt: "2024-03-10T09:00:00Z",
    status: "Reviewed"
  },
  {
    id: "rpt-004",
    schoolId: "sch-004",
    schoolName: "新界仁愛小學",
    period: "2023-24",
    totalScore: 68,
    grade: "Silver",
    confidence: "Medium",
    generatedAt: "2024-03-12T11:00:00Z",
    status: "Draft"
  }
]

export const mockCrawlJobs: CrawlJob[] = [
  {
    id: "cj-001",
    schoolId: "sch-001",
    schoolName: "明德書院",
    sourceUrl: "https://example.com/mingtakcollege",
    sourceType: "School Website",
    status: "Success",
    pagesCrawled: 45,
    documentsFound: 12,
    lastCrawledAt: "2024-03-15T08:00:00Z"
  },
  {
    id: "cj-002",
    schoolId: "sch-002",
    schoolName: "港島共融中學",
    sourceUrl: "https://example.com/iiss",
    sourceType: "School Website",
    status: "Success",
    pagesCrawled: 62,
    documentsFound: 18,
    lastCrawledAt: "2024-03-18T10:30:00Z"
  },
  {
    id: "cj-003",
    schoolId: "sch-006",
    schoolName: "和平基督教中學",
    sourceUrl: "https://example.com/pcss",
    sourceType: "School Website",
    status: "Warning",
    pagesCrawled: 15,
    documentsFound: 3,
    lastCrawledAt: "2024-02-28T14:00:00Z",
    errorMessage: "部分頁面無法訪問 (403 Forbidden)"
  },
  {
    id: "cj-004",
    schoolId: "sch-008",
    schoolName: "海濱官立小學",
    sourceUrl: "https://example.com/sgps",
    sourceType: "School Website",
    status: "Failed",
    pagesCrawled: 0,
    documentsFound: 0,
    lastCrawledAt: "2024-01-15T09:00:00Z",
    errorMessage: "連線逾時 - 網站無法訪問"
  },
  {
    id: "cj-005",
    schoolId: "sch-005",
    schoolName: "星河國際學校",
    sourceUrl: "https://example.com/gis",
    sourceType: "Annual Report",
    status: "Scheduled",
    pagesCrawled: 0,
    documentsFound: 0,
    lastCrawledAt: "2024-03-01T00:00:00Z"
  }
]

export const mockTimeline: TimelineEvent[] = [
  {
    id: "tl-001",
    schoolId: "sch-001",
    type: "crawl",
    title: "網站資料更新",
    description: "爬蟲完成明德書院網站掃描，發現 12 份新文件",
    timestamp: "2024-03-15T08:00:00Z"
  },
  {
    id: "tl-002",
    schoolId: "sch-001",
    type: "evidence",
    title: "新證據抽取",
    description: "AI 從年報中抽取 5 項服務學習相關證據",
    timestamp: "2024-03-15T08:30:00Z"
  },
  {
    id: "tl-003",
    schoolId: "sch-001",
    type: "verification",
    title: "人工核實完成",
    description: "分析員核實 3 項社區參與證據",
    timestamp: "2024-03-15T10:00:00Z"
  },
  {
    id: "tl-004",
    schoolId: "sch-001",
    type: "report",
    title: "報告生成",
    description: "2023-24 年度 SSRI 報告已生成並發佈",
    timestamp: "2024-03-15T12:00:00Z"
  }
]

export const mockAdminStats: AdminDashboardStats = {
  totalSchools: 523,
  successfulCrawls: 487,
  failedCrawls: 36,
  newDocuments: 1248,
  pendingEvidence: 156,
  pendingReports: 23,
  dataQualityAlerts: 12
}

export const mockCrawlTrendData = [
  { date: "2024-03-01", success: 450, failed: 25 },
  { date: "2024-03-05", success: 465, failed: 30 },
  { date: "2024-03-10", success: 478, failed: 28 },
  { date: "2024-03-15", success: 485, failed: 32 },
  { date: "2024-03-20", success: 487, failed: 36 }
]

export const mockEvidenceByDomain = [
  { domain: "文化歸屬", count: 1250 },
  { domain: "共融多元", count: 980 },
  { domain: "社區連結", count: 1420 },
  { domain: "課程創新", count: 760 },
  { domain: "全人發展", count: 1680 },
  { domain: "管治透明", count: 540 }
]

export const mockConfidenceDistribution = [
  { name: "高信心", value: 45, fill: "#10b981" },
  { name: "中信心", value: 32, fill: "#0ea5e9" },
  { name: "低信心", value: 15, fill: "#f59e0b" },
  { name: "資料不足", value: 8, fill: "#9ca3af" }
]

// ==================== AI Education Need Module Mock Data ====================

import type { 
  SchoolNeedProfile, 
  SchoolSignal, 
  Solution, 
  Opportunity,
  NeedDimensionScore,
  NeedModelConfig,
  CRMActivity
} from "./types"

const createNeedDimensionScores = (scores: [number, number, number, number, number, number, number, number]): NeedDimensionScore[] => [
  { 
    dimension: "TeacherTraining", 
    labelZh: "教師培訓", 
    score: scores[0], 
    confidence: scores[0] > 70 ? "High" : scores[0] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[0] / 10),
    topSignals: ["教師專業發展日活動", "AI 教學工具培訓"],
    explanation: scores[0] > 60 ? "公開資料顯示教師培訓活動活躍" : "公開資料顯示有進一步發展空間"
  },
  { 
    dimension: "AICurriculum", 
    labelZh: "AI 課程包", 
    score: scores[1], 
    confidence: scores[1] > 70 ? "High" : scores[1] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[1] / 10),
    topSignals: ["STEM 課程規劃", "編程教學活動"],
    explanation: scores[1] > 60 ? "課程創新方面表現活躍" : "AI 課程發展有潛在空間"
  },
  { 
    dimension: "StudentCompetition", 
    labelZh: "學生比賽", 
    score: scores[2], 
    confidence: scores[2] > 70 ? "High" : scores[2] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[2] / 10),
    topSignals: ["機械人比賽參與", "創科比賽獲獎"],
    explanation: scores[2] > 60 ? "學生比賽參與度高" : "比賽活動資料較少"
  },
  { 
    dimension: "AIPolicy", 
    labelZh: "AI 政策", 
    score: scores[3], 
    confidence: scores[3] > 70 ? "High" : scores[3] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[3] / 10),
    topSignals: ["AI 使用指引公告", "資訊科技政策更新"],
    explanation: scores[3] > 60 ? "已有 AI 相關政策" : "AI 政策發展有空間"
  },
  { 
    dimension: "Hardware", 
    labelZh: "硬件設備", 
    score: scores[4], 
    confidence: scores[4] > 70 ? "High" : scores[4] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[4] / 10),
    topSignals: ["電腦室升級", "設備採購公告"],
    explanation: scores[4] > 60 ? "硬件設備投入活躍" : "設備更新有發展空間"
  },
  { 
    dimension: "SoftwarePlatform", 
    labelZh: "軟件平台", 
    score: scores[5], 
    confidence: scores[5] > 70 ? "High" : scores[5] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[5] / 10),
    topSignals: ["學習管理系統採用", "AI 工具試用"],
    explanation: scores[5] > 60 ? "軟件平台應用活躍" : "平台應用有發展潛力"
  },
  { 
    dimension: "SchoolBasedConsulting", 
    labelZh: "校本顧問", 
    score: scores[6], 
    confidence: scores[6] > 70 ? "High" : scores[6] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[6] / 10),
    topSignals: ["外部顧問合作", "專業支援計劃"],
    explanation: scores[6] > 60 ? "有外部顧問合作經驗" : "校本支援有發展空間"
  },
  { 
    dimension: "SafetyCompliance", 
    labelZh: "安全合規", 
    score: scores[7], 
    confidence: scores[7] > 70 ? "High" : scores[7] > 40 ? "Medium" : "Low",
    signalCount: Math.floor(scores[7] / 10),
    topSignals: ["網絡安全措施", "私隱保護政策"],
    explanation: scores[7] > 60 ? "安全合規意識較高" : "安全合規方面有提升空間"
  }
]

export const mockNeedProfiles: SchoolNeedProfile[] = [
  {
    schoolId: "sch-001",
    maturityLevel: "B_Progressive",
    maturityLabelZh: "進取",
    overallNeedScore: 72,
    opportunityScore: 78,
    confidence: "High",
    lastAnalyzedAt: "2024-03-20T10:00:00Z",
    needDimensions: createNeedDimensionScores([75, 68, 80, 55, 70, 65, 72, 60]),
    aiSummary: "公開資料顯示，明德書院近六個月出現多項 STEM、編程及資訊科技相關活動訊號。系統推斷，教師 AI 教學應用培訓、學生專題式課程包及 AI 工具合規使用支援，可能是較合適的初步切入方向。學校在學生比賽方面表現活躍，有進一步發展 AI 教育的潛力。",
    topPotentialNeeds: ["教師生成式 AI 教學培訓", "AI 數據素養學生課程", "AI 使用政策顧問"],
    suggestedEntryPoint: "可從教師培訓切入，配合學校現有 STEM 發展方向",
    recommendedSolutionIds: ["sol-001", "sol-002", "sol-005"],
    recommendedApproach: "建議以免費 AI 教學需要訪談作初步接觸，了解學校具體需要後再提供針對性方案。",
    cautionNote: "此分析根據公開資料及系統訊號推斷，並不代表學校已確認有相關採購或服務需求。"
  },
  {
    schoolId: "sch-002",
    maturityLevel: "A_Leading",
    maturityLabelZh: "領先",
    overallNeedScore: 45,
    opportunityScore: 52,
    confidence: "High",
    lastAnalyzedAt: "2024-03-22T14:00:00Z",
    needDimensions: createNeedDimensionScores([85, 88, 90, 82, 85, 80, 78, 85]),
    aiSummary: "港島共融中學在 AI 教育方面已有豐富實踐經驗，公開資料顯示學校已建立完善的 STEM 及 AI 課程體系。潛在需要集中於進階應用及政策優化方面。",
    topPotentialNeeds: ["進階 AI 應用工作坊", "AI 倫理與政策深化", "教師領袖培訓"],
    suggestedEntryPoint: "可從進階應用或教師領袖培訓切入",
    recommendedSolutionIds: ["sol-004", "sol-005", "sol-008"],
    recommendedApproach: "學校已有豐富經驗，建議以專家交流或進階培訓作切入點。",
    cautionNote: "此分析根據公開資料及系統訊號推斷，並不代表學校已確認有相關採購或服務需求。"
  },
  {
    schoolId: "sch-003",
    maturityLevel: "B_Progressive",
    maturityLabelZh: "進取",
    overallNeedScore: 78,
    opportunityScore: 85,
    confidence: "Medium",
    lastAnalyzedAt: "2024-03-18T09:00:00Z",
    needDimensions: createNeedDimensionScores([70, 75, 82, 48, 72, 68, 65, 45]),
    aiSummary: "九龍創新書院近期發布多項創科活動訊號，系統推斷學校正積極發展 AI 教育。教師培訓及 AI 政策支援可能是較合適的切入方向。",
    topPotentialNeeds: ["教師 AI 培訓", "AI 課程設計顧問", "AI 安全合規工作坊"],
    suggestedEntryPoint: "可從教師培訓及政策支援雙線切入",
    recommendedSolutionIds: ["sol-001", "sol-004", "sol-008"],
    recommendedApproach: "建議以校本 AI 應用成熟度快速評估作初步接觸。",
    cautionNote: "此分析根據公開資料及系統訊號推斷，並不代表學校已確認有相關採購或服務需求。"
  },
  {
    schoolId: "sch-004",
    maturityLevel: "C_Starting",
    maturityLabelZh: "啟動中",
    overallNeedScore: 82,
    opportunityScore: 75,
    confidence: "Medium",
    lastAnalyzedAt: "2024-03-15T11:00:00Z",
    needDimensions: createNeedDimensionScores([55, 48, 42, 35, 50, 45, 52, 38]),
    aiSummary: "新界仁愛小學在 AI 教育方面處於起步階段，公開資料較少但顯示學校有意發展。基礎教師培訓及入門課程可能是較合適的切入方向。",
    topPotentialNeeds: ["教師 AI 入門培訓", "AI 數據素養學生課程", "家長 AI 素養講座"],
    suggestedEntryPoint: "建議從基礎培訓及家長教育切入",
    recommendedSolutionIds: ["sol-001", "sol-002", "sol-006"],
    recommendedApproach: "建議以免費教師 AI 起步清單作初步接觸。",
    cautionNote: "此分析根據公開資料及系統訊號推斷，並不代表學校已確認有相關採購或服務需求。"
  },
  {
    schoolId: "sch-005",
    maturityLevel: "A_Leading",
    maturityLabelZh: "領先",
    overallNeedScore: 38,
    opportunityScore: 42,
    confidence: "High",
    lastAnalyzedAt: "2024-03-21T16:00:00Z",
    needDimensions: createNeedDimensionScores([90, 92, 88, 85, 90, 88, 82, 88]),
    aiSummary: "星河國際學校在 AI 教育方面處於領先水平，已有完善體系。潛在需要集中於最新技術更新及國際認證方面。",
    topPotentialNeeds: ["最新 AI 工具培訓", "國際 AI 認證課程", "AI 教育領導力發展"],
    suggestedEntryPoint: "可從最新技術分享或國際合作切入",
    recommendedSolutionIds: ["sol-004", "sol-007"],
    recommendedApproach: "學校已有完善體系，建議以專家分享或技術更新作切入點。",
    cautionNote: "此分析根據公開資料及系統訊號推斷，並不代表學校已確認有相關採購或服務需求。"
  },
  {
    schoolId: "sch-006",
    maturityLevel: "D_SilentPotential",
    maturityLabelZh: "沉默潛力",
    overallNeedScore: 88,
    opportunityScore: 70,
    confidence: "Low",
    lastAnalyzedAt: "2024-03-10T08:00:00Z",
    needDimensions: createNeedDimensionScores([35, 30, 28, 25, 38, 32, 30, 28]),
    aiSummary: "和平基督教中學公開資料較少，但從有限資料推斷，學校在 AI 教育方面有較大發展空間。建議先了解學校實際情況後再作進一步分析。",
    topPotentialNeeds: ["教師 AI 入門培訓", "基礎 AI 課程包", "AI 政策制定支援"],
    suggestedEntryPoint: "建議從基礎培訓及政策支援切入",
    recommendedSolutionIds: ["sol-001", "sol-002", "sol-005"],
    recommendedApproach: "公開資料較少，建議以免費諮詢了解學校實際需要。",
    cautionNote: "此分析根據公開資料及系統訊號推斷，資料信心較低，建議人工確認。"
  },
  {
    schoolId: "sch-007",
    maturityLevel: "C_Starting",
    maturityLabelZh: "啟動中",
    overallNeedScore: 75,
    opportunityScore: 72,
    confidence: "Medium",
    lastAnalyzedAt: "2024-03-19T10:00:00Z",
    needDimensions: createNeedDimensionScores([58, 52, 45, 48, 55, 50, 62, 52]),
    aiSummary: "啟智特殊學校在 AI 教育方面有特殊需要，公開資料顯示學校重視輔助科技應用。針對特殊教育需要的 AI 工具培訓可能是較合適的切入方向。",
    topPotentialNeeds: ["特殊教育 AI 工具培訓", "輔助科技應用", "個別化學習系統"],
    suggestedEntryPoint: "可從特殊教育 AI 應用切入",
    recommendedSolutionIds: ["sol-001", "sol-007"],
    recommendedApproach: "建議以特殊教育 AI 應用分享作初步接觸。",
    cautionNote: "此分析根據公開資料及系統訊號推斷，並不代表學校已確認有相關採購或服務需求。"
  },
  {
    schoolId: "sch-008",
    maturityLevel: "D_SilentPotential",
    maturityLabelZh: "沉默潛力",
    overallNeedScore: 90,
    opportunityScore: 65,
    confidence: "Insufficient",
    lastAnalyzedAt: "2024-02-28T09:00:00Z",
    needDimensions: createNeedDimensionScores([25, 22, 20, 18, 28, 22, 25, 20]),
    aiSummary: "海濱官立小學公開資料非常有限，系統無法準確推斷 AI 教育需要。建議先行了解學校實際情況。",
    topPotentialNeeds: ["待人工確認"],
    suggestedEntryPoint: "建議先行了解學校實際情況",
    recommendedSolutionIds: ["sol-001"],
    recommendedApproach: "資料不足，建議先行了解學校實際需要。",
    cautionNote: "公開資料非常有限，此分析僅供參考，強烈建議人工確認。"
  }
]

export const mockSchoolSignals: SchoolSignal[] = [
  // sch-001 signals
  {
    id: "sig-001",
    schoolId: "sch-001",
    source: "School Website",
    sourceUrl: "https://example.com/mingtakcollege/news/stem-day",
    sourceTitle: "明德書院網站",
    publishedDate: "2024-03-10",
    crawledAt: "2024-03-15T08:00:00Z",
    title: "STEM 探索日活動圓滿舉行",
    summary: "學校舉辦年度 STEM 探索日，逾 200 名學生參與 AI 及編程工作坊。",
    category: "Activity",
    keywords: ["STEM", "AI", "編程", "工作坊"],
    mappedNeedDimensions: ["AICurriculum", "StudentCompetition"],
    signalStrength: 0.85,
    confidence: 0.88,
    sourceReliability: 0.9,
    verificationStatus: "Human Verified"
  },
  {
    id: "sig-002",
    schoolId: "sch-001",
    source: "School Website",
    sourceUrl: "https://example.com/mingtakcollege/news/teacher-pd",
    sourceTitle: "明德書院網站",
    publishedDate: "2024-02-28",
    crawledAt: "2024-03-15T08:00:00Z",
    title: "教師專業發展日：生成式 AI 教學應用",
    summary: "全校教師參與生成式 AI 教學應用培訓，探討 ChatGPT 及 AI 工具在課堂的應用。",
    category: "TeacherDevelopment",
    keywords: ["AI", "ChatGPT", "教師培訓", "專業發展"],
    mappedNeedDimensions: ["TeacherTraining", "SoftwarePlatform"],
    signalStrength: 0.92,
    confidence: 0.90,
    sourceReliability: 0.9,
    verificationStatus: "Human Verified"
  },
  {
    id: "sig-003",
    schoolId: "sch-001",
    source: "Competition Site",
    sourceUrl: "https://example.com/robotics-comp/results",
    sourceTitle: "全港機械人大賽",
    publishedDate: "2024-01-15",
    crawledAt: "2024-03-10T10:00:00Z",
    title: "明德書院機械人隊獲全港賽亞軍",
    summary: "學校機械人隊於全港機械人大賽獲得中學組亞軍。",
    category: "Competition",
    keywords: ["機械人", "比賽", "STEM"],
    mappedNeedDimensions: ["StudentCompetition", "Hardware"],
    signalStrength: 0.88,
    confidence: 0.95,
    sourceReliability: 0.85,
    verificationStatus: "AI Extracted"
  },
  {
    id: "sig-004",
    schoolId: "sch-001",
    source: "Tender",
    sourceUrl: "https://example.gov.hk/tender/2024-003",
    sourceTitle: "政府電子採購網",
    publishedDate: "2024-03-01",
    crawledAt: "2024-03-18T09:00:00Z",
    title: "電腦室設備更新報價邀請",
    summary: "學校邀請報價更新電腦室設備，包括 30 台電腦及網絡設備。",
    category: "Equipment",
    keywords: ["電腦", "設備", "採購"],
    mappedNeedDimensions: ["Hardware"],
    signalStrength: 0.75,
    confidence: 0.85,
    sourceReliability: 0.95,
    verificationStatus: "Human Verified"
  },
  {
    id: "sig-005",
    schoolId: "sch-001",
    source: "School Website",
    sourceUrl: "https://example.com/mingtakcollege/ai-policy",
    sourceTitle: "明德書院網站",
    publishedDate: "2024-02-15",
    crawledAt: "2024-03-15T08:00:00Z",
    title: "學校發布 AI 使用指引",
    summary: "學校發布生成式 AI 工具使用指引，規範學生及教師使用 AI 的原則。",
    category: "Policy",
    keywords: ["AI", "政策", "指引", "生成式AI"],
    mappedNeedDimensions: ["AIPolicy", "SafetyCompliance"],
    signalStrength: 0.82,
    confidence: 0.88,
    sourceReliability: 0.9,
    verificationStatus: "AI Extracted"
  },
  // sch-003 signals
  {
    id: "sig-006",
    schoolId: "sch-003",
    source: "School Website",
    sourceUrl: "https://example.com/kia/news/ai-lab",
    sourceTitle: "九龍創新書院網站",
    publishedDate: "2024-03-05",
    crawledAt: "2024-03-18T10:00:00Z",
    title: "AI 創新實驗室啟用",
    summary: "學校新設 AI 創新實驗室，配備 AI 教學設備及軟件。",
    category: "Equipment",
    keywords: ["AI", "實驗室", "設備"],
    mappedNeedDimensions: ["Hardware", "SoftwarePlatform"],
    signalStrength: 0.90,
    confidence: 0.85,
    sourceReliability: 0.9,
    verificationStatus: "AI Extracted"
  },
  {
    id: "sig-007",
    schoolId: "sch-003",
    source: "Media",
    sourceUrl: "https://example.com/news/kia-coding",
    sourceTitle: "教育新聞網",
    publishedDate: "2024-02-20",
    crawledAt: "2024-03-18T10:00:00Z",
    title: "九龍創新書院推動編程教育",
    summary: "媒體報導學校積極推動編程教育，計劃將 AI 融入常規課程。",
    category: "Curriculum",
    keywords: ["編程", "AI", "課程"],
    mappedNeedDimensions: ["AICurriculum", "TeacherTraining"],
    signalStrength: 0.78,
    confidence: 0.72,
    sourceReliability: 0.7,
    verificationStatus: "Needs Review"
  },
  // sch-004 signals
  {
    id: "sig-008",
    schoolId: "sch-004",
    source: "School Website",
    sourceUrl: "https://example.com/ntbps/news/stem",
    sourceTitle: "新界仁愛小學網站",
    publishedDate: "2024-01-20",
    crawledAt: "2024-03-15T11:00:00Z",
    title: "小學 STEM 工作坊",
    summary: "學校舉辦小學 STEM 工作坊，學生體驗基礎編程活動。",
    category: "Activity",
    keywords: ["STEM", "編程", "工作坊"],
    mappedNeedDimensions: ["AICurriculum", "StudentCompetition"],
    signalStrength: 0.65,
    confidence: 0.75,
    sourceReliability: 0.85,
    verificationStatus: "AI Extracted"
  },
  {
    id: "sig-009",
    schoolId: "sch-004",
    source: "School Website",
    sourceUrl: "https://example.com/ntbps/news/parent-talk",
    sourceTitle: "新界仁愛小學網站",
    publishedDate: "2024-03-08",
    crawledAt: "2024-03-15T11:00:00Z",
    title: "家長講座：認識 AI 時代的學習",
    summary: "學校舉辦家長講座，介紹 AI 對教育的影響及家長如何支援子女學習。",
    category: "ParentEducation",
    keywords: ["家長", "AI", "講座"],
    mappedNeedDimensions: ["TeacherTraining", "SafetyCompliance"],
    signalStrength: 0.70,
    confidence: 0.80,
    sourceReliability: 0.85,
    verificationStatus: "Human Verified"
  },
  // sch-006 signals (limited)
  {
    id: "sig-010",
    schoolId: "sch-006",
    source: "School Website",
    sourceUrl: "https://example.com/pcss/news",
    sourceTitle: "和平基督教中學網站",
    publishedDate: "2023-11-15",
    crawledAt: "2024-03-10T08:00:00Z",
    title: "資訊科技課外活動",
    summary: "學校提供資訊科技課外活動，包括基礎電腦應用。",
    category: "Activity",
    keywords: ["資訊科技", "課外活動"],
    mappedNeedDimensions: ["AICurriculum"],
    signalStrength: 0.45,
    confidence: 0.55,
    sourceReliability: 0.8,
    verificationStatus: "AI Extracted"
  }
]

export const mockSolutions: Solution[] = [
  {
    id: "sol-001",
    nameZh: "教師生成式 AI 教學工作坊",
    nameEn: "Generative AI Teaching Workshop for Teachers",
    description: "為教師提供生成式 AI 工具（如 ChatGPT、Claude、Gemini）在教學中的實際應用培訓，包括課堂設計、評估設計及學生指導策略。",
    targetLevels: ["Primary", "Secondary", "Special", "International"],
    suitableMaturityLevels: ["C_Starting", "D_SilentPotential", "B_Progressive"],
    mappedNeedDimensions: ["TeacherTraining", "SoftwarePlatform"],
    deliveryMode: "Hybrid",
    duration: "3 小時工作坊 × 2 節",
    budgetRange: "HK$15,000 - HK$25,000",
    prerequisites: ["基本電腦操作能力", "學校已有網絡設備"],
    deliverables: ["培訓簡報", "AI 教學工具清單", "課堂設計範例", "跟進支援"],
    expectedOutcomes: ["教師掌握至少 3 種 AI 工具應用", "建立校本 AI 教學資源庫", "提升教師教學創新能力"],
    proposalTemplate: "## 教師生成式 AI 教學工作坊建議書\n\n### 目標\n協助貴校教師掌握生成式 AI 教學應用...",
    emailTemplate: "敬啟者：\n\n感謝貴校對 AI 教育的重視。我們誠意為貴校教師提供生成式 AI 教學工作坊...",
    active: true
  },
  {
    id: "sol-002",
    nameZh: "AI 數據素養學生課程",
    nameEn: "AI & Data Literacy Student Course",
    description: "針對中小學生設計的 AI 及數據素養課程，涵蓋 AI 基礎概念、數據分析思維及負責任使用 AI 的態度培養。",
    targetLevels: ["Primary", "Secondary"],
    suitableMaturityLevels: ["C_Starting", "B_Progressive"],
    mappedNeedDimensions: ["AICurriculum", "StudentCompetition"],
    deliveryMode: "Onsite",
    duration: "8 課時（每課 80 分鐘）",
    budgetRange: "HK$20,000 - HK$35,000",
    prerequisites: ["電腦室設備", "每班 30 人以下"],
    deliverables: ["學生課程材料", "教師教學指引", "評估工具", "學生作品集"],
    expectedOutcomes: ["學生理解 AI 基本概念", "培養數據分析思維", "建立負責任使用 AI 態度"],
    proposalTemplate: "## AI 數據素養學生課程建議書\n\n### 課程目標\n培養學生 AI 及數據素養...",
    emailTemplate: "敬啟者：\n\n我們為貴校學生設計了一套 AI 數據素養課程...",
    active: true
  },
  {
    id: "sol-003",
    nameZh: "STEM / AI 比賽訓練營",
    nameEn: "STEM / AI Competition Training Camp",
    description: "為學校 STEM / AI 比賽隊伍提供專業訓練，包括機械人編程、AI 專題設計及比賽策略指導。",
    targetLevels: ["Secondary"],
    suitableMaturityLevels: ["B_Progressive", "A_Leading"],
    mappedNeedDimensions: ["StudentCompetition", "AICurriculum", "Hardware"],
    deliveryMode: "Onsite",
    duration: "10 週（每週 2 小時）",
    budgetRange: "HK$30,000 - HK$50,000",
    prerequisites: ["已有 STEM 設備", "學生有基礎編程經驗"],
    deliverables: ["訓練課程", "比賽作品指導", "技術支援", "賽前模擬"],
    expectedOutcomes: ["提升比賽成績", "培養學生創新能力", "建立長期訓練機制"],
    proposalTemplate: "## STEM / AI 比賽訓練營建議書\n\n### 目標\n協助貴校比賽隊伍取得佳績...",
    emailTemplate: "敬啟者：\n\n我們為貴校 STEM / AI 比賽隊伍提供專業訓練...",
    active: true
  },
  {
    id: "sol-004",
    nameZh: "AI 校本課程設計顧問",
    nameEn: "AI School-based Curriculum Design Consulting",
    description: "為學校提供校本 AI 課程設計顧問服務，協助將 AI 元素融入現有課程，建立可持續發展的 AI 教育體系。",
    targetLevels: ["Primary", "Secondary", "International"],
    suitableMaturityLevels: ["B_Progressive", "A_Leading"],
    mappedNeedDimensions: ["SchoolBasedConsulting", "AICurriculum", "TeacherTraining"],
    deliveryMode: "Hybrid",
    duration: "6 個月顧問服務",
    budgetRange: "HK$80,000 - HK$150,000",
    prerequisites: ["學校管理層支持", "已有初步 AI 教育經驗"],
    deliverables: ["課程框架", "教學資源", "教師培訓", "進度報告"],
    expectedOutcomes: ["建立校本 AI 課程", "培養教師課程設計能力", "形成可持續發展機制"],
    proposalTemplate: "## AI 校本課程設計顧問建議書\n\n### 服務範圍\n協助貴校建立校本 AI 課程...",
    emailTemplate: "敬啟者：\n\n我們為貴校提供校本 AI 課程設計顧問服務...",
    active: true
  },
  {
    id: "sol-005",
    nameZh: "生成式 AI 使用政策與倫理講座",
    nameEn: "Generative AI Usage Policy & Ethics Seminar",
    description: "為學校管理層及教師提供生成式 AI 使用政策及倫理講座，協助制定校本 AI 使用指引。",
    targetLevels: ["Primary", "Secondary", "Special", "International"],
    suitableMaturityLevels: ["C_Starting", "B_Progressive", "D_SilentPotential"],
    mappedNeedDimensions: ["AIPolicy", "SafetyCompliance"],
    deliveryMode: "Onsite",
    duration: "2 小時講座",
    budgetRange: "HK$8,000 - HK$12,000",
    prerequisites: [],
    deliverables: ["講座簡報", "政策範本", "FAQ 文件"],
    expectedOutcomes: ["了解 AI 政策要點", "獲得政策範本", "明確學校 AI 使用方向"],
    proposalTemplate: "## 生成式 AI 使用政策與倫理講座建議書\n\n### 目標\n協助貴校制定 AI 使用政策...",
    emailTemplate: "敬啟者：\n\n我們為貴校提供生成式 AI 使用政策與倫理講座...",
    active: true
  },
  {
    id: "sol-006",
    nameZh: "家長 AI 素養講座",
    nameEn: "AI Literacy Seminar for Parents",
    description: "為家長提供 AI 素養講座，介紹 AI 對教育的影響及家長如何支援子女在 AI 時代的學習。",
    targetLevels: ["Primary", "Secondary"],
    suitableMaturityLevels: ["C_Starting", "D_SilentPotential", "B_Progressive"],
    mappedNeedDimensions: ["TeacherTraining", "SafetyCompliance"],
    deliveryMode: "Hybrid",
    duration: "1.5 小時講座",
    budgetRange: "HK$5,000 - HK$8,000",
    prerequisites: [],
    deliverables: ["講座簡報", "家長指引", "常見問題解答"],
    expectedOutcomes: ["家長了解 AI 教育趨勢", "建立家校合作基礎", "提升家長支援能力"],
    proposalTemplate: "## 家長 AI 素養講座建議書\n\n### 目標\n提升家長對 AI 教育的認識...",
    emailTemplate: "敬啟者：\n\n我們為貴校家長提供 AI 素養講座...",
    active: true
  },
  {
    id: "sol-007",
    nameZh: "校園 AI 工具導入顧問",
    nameEn: "Campus AI Tool Implementation Consulting",
    description: "協助學校評估、選擇及導入適合的 AI 教學工具，包括技術支援及教師培訓。",
    targetLevels: ["Secondary", "International"],
    suitableMaturityLevels: ["B_Progressive", "A_Leading"],
    mappedNeedDimensions: ["SoftwarePlatform", "Hardware", "SchoolBasedConsulting"],
    deliveryMode: "Hybrid",
    duration: "3 個月導入服務",
    budgetRange: "HK$50,000 - HK$100,000",
    prerequisites: ["學校有明確 AI 工具需求", "IT 團隊配合"],
    deliverables: ["工具評估報告", "導入計劃", "技術支援", "教師培訓"],
    expectedOutcomes: ["成功導入 AI 工具", "教師掌握工具應用", "建立持續支援機制"],
    proposalTemplate: "## 校園 AI 工具導入顧問建議書\n\n### 服務範圍\n協助貴校導入 AI 教學工具...",
    emailTemplate: "敬啟者：\n\n我們為貴校提供 AI 工具導入顧問服務...",
    active: true
  },
  {
    id: "sol-008",
    nameZh: "AI 安全、私隱與版權工作坊",
    nameEn: "AI Safety, Privacy & Copyright Workshop",
    description: "為教師及學生提供 AI 安全、私隱保護及版權議題工作坊，建立負責任使用 AI 的意識。",
    targetLevels: ["Primary", "Secondary", "Special", "International"],
    suitableMaturityLevels: ["C_Starting", "B_Progressive", "A_Leading"],
    mappedNeedDimensions: ["SafetyCompliance", "AIPolicy"],
    deliveryMode: "Onsite",
    duration: "2 小時工作坊",
    budgetRange: "HK$8,000 - HK$15,000",
    prerequisites: [],
    deliverables: ["工作坊材料", "安全指引", "案例分析"],
    expectedOutcomes: ["了解 AI 安全風險", "掌握私隱保護要點", "建立負責任使用態度"],
    proposalTemplate: "## AI 安全、私隱與版權工作坊建議書\n\n### 目標\n提升師生 AI 安全意識...",
    emailTemplate: "敬啟者：\n\n我們為貴校提供 AI 安全、私隱與版權工作坊...",
    active: true
  }
]

export const mockOpportunities: Opportunity[] = [
  {
    id: "opp-001",
    schoolId: "sch-001",
    schoolName: "明德書院",
    district: "中西區",
    level: "Secondary",
    maturityLevel: "B_Progressive",
    opportunityScore: 78,
    priority: "High",
    stage: "Meeting Scheduled",
    owner: "陳顧問",
    estimatedValue: 45000,
    recommendedSolutionIds: ["sol-001", "sol-002", "sol-005"],
    topNeedDimensions: ["TeacherTraining", "AICurriculum", "StudentCompetition"],
    keyReasons: ["教師培訓活動活躍", "STEM 比賽成績優異", "已有 AI 政策基礎"],
    latestSignalSummary: "學校近期發布 AI 使用指引，並舉辦教師專業發展日。",
    nextAction: "3月25日下午會議：討論教師培訓需要",
    nextActionDate: "2024-03-25",
    lastContactedAt: "2024-03-18",
    notes: "校長對 AI 教育有興趣，希望了解教師培訓方案。"
  },
  {
    id: "opp-002",
    schoolId: "sch-003",
    schoolName: "九龍創新書院",
    district: "九龍城",
    level: "Secondary",
    maturityLevel: "B_Progressive",
    opportunityScore: 85,
    priority: "High",
    stage: "Proposal Sent",
    owner: "李顧問",
    estimatedValue: 80000,
    recommendedSolutionIds: ["sol-001", "sol-004", "sol-008"],
    topNeedDimensions: ["TeacherTraining", "AICurriculum", "AIPolicy"],
    keyReasons: ["新設 AI 實驗室", "積極推動編程教育", "需要政策支援"],
    latestSignalSummary: "學校新設 AI 創新實驗室，正積極發展 AI 教育。",
    nextAction: "跟進方案書回覆",
    nextActionDate: "2024-03-28",
    lastContactedAt: "2024-03-20",
    notes: "已提交教師培訓及課程設計顧問方案，等待回覆。"
  },
  {
    id: "opp-003",
    schoolId: "sch-004",
    schoolName: "新界仁愛小學",
    district: "沙田",
    level: "Primary",
    maturityLevel: "C_Starting",
    opportunityScore: 75,
    priority: "Medium",
    stage: "Contacted",
    owner: "陳顧問",
    estimatedValue: 25000,
    recommendedSolutionIds: ["sol-001", "sol-002", "sol-006"],
    topNeedDimensions: ["TeacherTraining", "AICurriculum"],
    keyReasons: ["起步階段適合基礎培訓", "已有家長教育活動"],
    latestSignalSummary: "學校舉辦家長 AI 講座，顯示對 AI 教育的興趣。",
    nextAction: "致電跟進",
    nextActionDate: "2024-03-26",
    lastContactedAt: "2024-03-15",
    notes: "已發送初步介紹郵件，等待回覆。"
  },
  {
    id: "opp-004",
    schoolId: "sch-006",
    schoolName: "和平基督教中學",
    district: "觀塘",
    level: "Secondary",
    maturityLevel: "D_SilentPotential",
    opportunityScore: 70,
    priority: "Medium",
    stage: "Not Contacted",
    owner: undefined,
    estimatedValue: 15000,
    recommendedSolutionIds: ["sol-001", "sol-002", "sol-005"],
    topNeedDimensions: ["TeacherTraining", "AICurriculum", "AIPolicy"],
    keyReasons: ["公開資料較少但有發展空間", "需要基礎培訓支援"],
    latestSignalSummary: "公開資料有限，建議先了解學校實際需要。",
    nextAction: "安排初步接觸",
    nextActionDate: "2024-03-30",
    notes: "資料不足，需要人工確認實際需要。"
  },
  {
    id: "opp-005",
    schoolId: "sch-002",
    schoolName: "港島共融中學",
    district: "東區",
    level: "Secondary",
    maturityLevel: "A_Leading",
    opportunityScore: 52,
    priority: "Low",
    stage: "Replied",
    owner: "李顧問",
    estimatedValue: 120000,
    recommendedSolutionIds: ["sol-004", "sol-005", "sol-008"],
    topNeedDimensions: ["AIPolicy", "SafetyCompliance"],
    keyReasons: ["已有完善體系", "需要進階支援"],
    latestSignalSummary: "學校 AI 教育體系完善，潛在需要集中於進階應用。",
    nextAction: "等待學校決定下一步",
    nextActionDate: "2024-04-15",
    lastContactedAt: "2024-03-10",
    notes: "學校表示有興趣了解進階培訓，但需要內部討論。"
  },
  {
    id: "opp-006",
    schoolId: "sch-007",
    schoolName: "啟智特殊學校",
    district: "屯門",
    level: "Special",
    maturityLevel: "C_Starting",
    opportunityScore: 72,
    priority: "Medium",
    stage: "Contacted",
    owner: "陳顧問",
    estimatedValue: 35000,
    recommendedSolutionIds: ["sol-001", "sol-007"],
    topNeedDimensions: ["TeacherTraining", "SoftwarePlatform"],
    keyReasons: ["特殊教育需要專門支援", "重視輔助科技"],
    latestSignalSummary: "學校重視輔助科技應用，對 AI 教育有興趣。",
    nextAction: "準備特殊教育 AI 應用分享",
    nextActionDate: "2024-03-29",
    lastContactedAt: "2024-03-12",
    notes: "需要針對特殊教育需要設計方案。"
  },
  {
    id: "opp-007",
    schoolId: "sch-005",
    schoolName: "星河國際學校",
    district: "南區",
    level: "International",
    maturityLevel: "A_Leading",
    opportunityScore: 42,
    priority: "Low",
    stage: "Paused",
    owner: "李顧問",
    estimatedValue: 150000,
    recommendedSolutionIds: ["sol-004", "sol-007"],
    topNeedDimensions: ["SchoolBasedConsulting", "SoftwarePlatform"],
    keyReasons: ["領先水平", "需要最新技術更新"],
    latestSignalSummary: "學校 AI 教育處於領先水平，暫無急切需要。",
    nextAction: "6月再跟進",
    nextActionDate: "2024-06-01",
    lastContactedAt: "2024-02-28",
    notes: "學校表示現階段沒有新項目計劃，下學年再考慮。"
  },
  {
    id: "opp-008",
    schoolId: "sch-008",
    schoolName: "海濱官立小學",
    district: "荃灣",
    level: "Primary",
    maturityLevel: "D_SilentPotential",
    opportunityScore: 65,
    priority: "Low",
    stage: "Not Contacted",
    owner: undefined,
    estimatedValue: undefined,
    recommendedSolutionIds: ["sol-001"],
    topNeedDimensions: ["TeacherTraining"],
    keyReasons: ["資料不足", "需要人工確認"],
    latestSignalSummary: "公開資料非常有限，無法準確評估。",
    nextAction: "待人工確認後再跟進",
    notes: "資料不足，需要先了解學校實際情況。"
  }
]

export const mockCRMActivities: CRMActivity[] = [
  {
    id: "act-001",
    opportunityId: "opp-001",
    type: "Email",
    title: "發送初步介紹郵件",
    content: "向學校發送 AI 教育服務介紹郵件，附上教師培訓方案摘要。",
    createdAt: "2024-03-15T10:00:00Z",
    createdBy: "陳顧問"
  },
  {
    id: "act-002",
    opportunityId: "opp-001",
    type: "Call",
    title: "電話跟進",
    content: "致電學校跟進郵件，校長表示有興趣了解更多，安排會議。",
    createdAt: "2024-03-18T14:30:00Z",
    createdBy: "陳顧問"
  },
  {
    id: "act-003",
    opportunityId: "opp-001",
    type: "StageChange",
    title: "階段更新：會議已安排",
    content: "已與校長確認 3 月 25 日下午會議時間。",
    createdAt: "2024-03-18T15:00:00Z",
    createdBy: "陳顧問"
  },
  {
    id: "act-004",
    opportunityId: "opp-002",
    type: "Meeting",
    title: "初步會議",
    content: "與學校 STEM 統籌主任會面，了解學校 AI 教育發展計劃及需要。",
    createdAt: "2024-03-15T11:00:00Z",
    createdBy: "李顧問"
  },
  {
    id: "act-005",
    opportunityId: "opp-002",
    type: "Proposal",
    title: "提交方案書",
    content: "根據會議內容，提交教師培訓及課程設計顧問方案書。",
    createdAt: "2024-03-20T16:00:00Z",
    createdBy: "李顧問"
  }
]

export const mockNeedModelConfig: NeedModelConfig = {
  dimensionWeights: {
    TeacherTraining: 1.2,
    AICurriculum: 1.1,
    StudentCompetition: 0.9,
    AIPolicy: 1.0,
    Hardware: 0.8,
    SoftwarePlatform: 0.9,
    SchoolBasedConsulting: 1.0,
    SafetyCompliance: 1.1
  },
  signalCategoryWeights: {
    Curriculum: 1.2,
    Activity: 1.0,
    Competition: 0.9,
    TeacherDevelopment: 1.3,
    Equipment: 0.8,
    Tender: 1.1,
    ParentEducation: 0.7,
    Policy: 1.2,
    ManualInput: 1.0,
    Other: 0.5
  },
  sourceReliabilityWeights: {
    "School Website": 0.9,
    Tender: 0.95,
    "Competition Site": 0.85,
    Government: 0.95,
    Media: 0.7,
    "Social Media": 0.5,
    "Manual Input": 0.8,
    Other: 0.4
  },
  recencyWeights: {
    zeroToThreeMonths: 1.0,
    threeToSixMonths: 0.8,
    sixToTwelveMonths: 0.5,
    twelveMonthsPlus: 0.2
  },
  keywordRules: [
    { id: "kw-001", keyword: "AI", mappedNeedDimension: "AICurriculum", weight: 1.0, active: true, lastUpdated: "2024-03-01" },
    { id: "kw-002", keyword: "ChatGPT", mappedNeedDimension: "SoftwarePlatform", weight: 1.2, active: true, lastUpdated: "2024-03-01" },
    { id: "kw-003", keyword: "機械人", mappedNeedDimension: "StudentCompetition", weight: 1.1, active: true, lastUpdated: "2024-03-01" },
    { id: "kw-004", keyword: "編程", mappedNeedDimension: "AICurriculum", weight: 1.0, active: true, lastUpdated: "2024-03-01" },
    { id: "kw-005", keyword: "STEM", mappedNeedDimension: "AICurriculum", weight: 0.9, active: true, lastUpdated: "2024-03-01" },
    { id: "kw-006", keyword: "培訓", mappedNeedDimension: "TeacherTraining", weight: 1.1, active: true, lastUpdated: "2024-03-01" },
    { id: "kw-007", keyword: "私隱", mappedNeedDimension: "SafetyCompliance", weight: 1.2, active: true, lastUpdated: "2024-03-01" },
    { id: "kw-008", keyword: "政策", mappedNeedDimension: "AIPolicy", weight: 1.0, active: true, lastUpdated: "2024-03-01" }
  ]
}

export const mockNeedsStats = {
  totalSchoolsAnalyzed: 523,
  newSignalsThisMonth: 156,
  highPriorityOpportunities: 12,
  needsManualReview: 8,
  averageConfidence: 72
}

export const mockOpportunityStats = {
  highPriority: 12,
  newThisWeek: 5,
  meetingsScheduled: 8,
  proposalsSent: 15,
  estimatedTotalValue: 1250000
}
