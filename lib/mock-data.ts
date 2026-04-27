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
