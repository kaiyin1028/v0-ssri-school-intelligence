// SSRI School Intelligence Platform - API Layer
// TODO: Replace mock data with real FastAPI endpoint calls

import type {
  School,
  EvidenceItem,
  Report,
  CrawlJob,
  TimelineEvent,
  SchoolAISummary,
  AdminDashboardStats,
  SchoolSearchParams,
  CorrectionRequest
} from "./types"
import {
  mockSchools,
  mockEvidence,
  mockReports,
  mockCrawlJobs,
  mockTimeline,
  mockAISummaries,
  mockAdminStats,
  mockCrawlTrendData,
  mockEvidenceByDomain,
  mockConfidenceDistribution
} from "./mock-data"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"

// Generic fetch wrapper
// TODO: Add authentication token
// TODO: Add error boundary
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // TODO: Add auth header
        // "Authorization": `Bearer ${token}`,
        ...options?.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  } catch {
    // For now, fall back to mock data when backend is unavailable
    console.warn(`API call to ${path} failed, using mock data`)
    throw new Error("API unavailable")
  }
}

// ==================== School APIs ====================

// GET /api/v1/schools
export async function getSchools(params?: SchoolSearchParams): Promise<School[]> {
  // TODO: Replace with real API call
  // return apiFetch<School[]>('/schools', { method: 'GET' })
  
  let filtered = [...mockSchools]
  
  if (params?.query) {
    const q = params.query.toLowerCase()
    filtered = filtered.filter(
      s => s.nameZh.includes(q) || s.nameEn.toLowerCase().includes(q)
    )
  }
  
  if (params?.district) {
    filtered = filtered.filter(s => s.district === params.district)
  }
  
  if (params?.level) {
    filtered = filtered.filter(s => s.level === params.level)
  }
  
  if (params?.type) {
    filtered = filtered.filter(s => s.type === params.type)
  }
  
  if (params?.confidence) {
    filtered = filtered.filter(s => s.confidence === params.confidence)
  }
  
  if (params?.minScore !== undefined) {
    filtered = filtered.filter(s => s.totalScore !== null && s.totalScore >= params.minScore!)
  }
  
  if (params?.maxScore !== undefined) {
    filtered = filtered.filter(s => s.totalScore !== null && s.totalScore <= params.maxScore!)
  }
  
  // Sort
  if (params?.sortBy) {
    filtered.sort((a, b) => {
      const order = params.sortOrder === "desc" ? -1 : 1
      switch (params.sortBy) {
        case "score":
          return ((a.totalScore || 0) - (b.totalScore || 0)) * order
        case "name":
          return a.nameZh.localeCompare(b.nameZh) * order
        case "lastUpdated":
          return (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()) * order
        default:
          return 0
      }
    })
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return filtered
}

// GET /api/v1/schools/{id}
export async function getSchoolById(id: string): Promise<School | null> {
  // TODO: Replace with real API call
  // return apiFetch<School>(`/schools/${id}`)
  
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockSchools.find(s => s.id === id) || null
}

// GET /api/v1/schools/{id}/scores
export async function getSchoolScores(id: string): Promise<School["domainScores"] | null> {
  // TODO: Replace with real API call
  
  await new Promise(resolve => setTimeout(resolve, 200))
  const school = mockSchools.find(s => s.id === id)
  return school?.domainScores || null
}

// GET /api/v1/schools/{id}/evidence
export async function getSchoolEvidence(schoolId: string): Promise<EvidenceItem[]> {
  // TODO: Replace with real API call
  // TODO: Add pagination
  
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockEvidence.filter(e => e.schoolId === schoolId)
}

// GET /api/v1/schools/{id}/ai-summary
export async function getSchoolAISummary(schoolId: string): Promise<SchoolAISummary | null> {
  // TODO: Replace with real API call
  
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockAISummaries[schoolId] || null
}

// GET /api/v1/schools/{id}/timeline
export async function getSchoolTimeline(schoolId: string): Promise<TimelineEvent[]> {
  // TODO: Replace with real API call
  
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockTimeline.filter(t => t.schoolId === schoolId)
}

// POST /api/v1/schools/{id}/corrections
export async function submitSchoolCorrection(
  schoolId: string, 
  data: CorrectionRequest
): Promise<{ success: boolean; message: string }> {
  // TODO: Replace with real API call
  // TODO: Add file upload integration
  
  console.log("Submitting correction for school:", schoolId, data)
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    success: true,
    message: "感謝您的提交，我們會盡快審核。"
  }
}

// ==================== Report APIs ====================

// GET /api/v1/reports
export async function getReports(): Promise<Report[]> {
  // TODO: Replace with real API call
  // TODO: Add pagination
  
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockReports
}

// GET /api/v1/reports/{id}
export async function getReportById(id: string): Promise<Report | null> {
  // TODO: Replace with real API call
  
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockReports.find(r => r.id === id) || null
}

// ==================== Admin APIs ====================

// GET /api/v1/admin/dashboard
export async function getAdminDashboard(): Promise<AdminDashboardStats> {
  // TODO: Replace with real API call
  
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockAdminStats
}

// GET /api/v1/admin/crawl-jobs
export async function getCrawlJobs(): Promise<CrawlJob[]> {
  // TODO: Replace with real API call
  // TODO: Add pagination
  
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockCrawlJobs
}

// POST /api/v1/admin/crawl-jobs/{id}/retry
export async function retryCrawlJob(jobId: string): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  
  console.log("Retrying crawl job:", jobId)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// POST /api/v1/admin/schools/{id}/recrawl
export async function triggerSchoolRecrawl(schoolId: string): Promise<{ success: boolean; jobId: string }> {
  // TODO: Replace with real API call
  
  console.log("Triggering recrawl for school:", schoolId)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true, jobId: `cj-new-${Date.now()}` }
}

// GET /api/v1/admin/evidence-queue
export async function getEvidenceQueue(): Promise<EvidenceItem[]> {
  // TODO: Replace with real API call
  // TODO: Add pagination
  
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockEvidence.filter(e => e.verificationStatus === "Needs Review" || e.verificationStatus === "AI Extracted")
}

// PATCH /api/v1/admin/evidence/{id}/review
export async function updateEvidenceReviewStatus(
  evidenceId: string,
  status: "Human Verified" | "Rejected" | "Needs Review",
  notes?: string
): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  
  console.log("Updating evidence status:", evidenceId, status, notes)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// GET /api/v1/admin/scoring/{schoolId}
export async function getSchoolScoringDetails(schoolId: string): Promise<{
  school: School | null
  evidence: EvidenceItem[]
}> {
  // TODO: Replace with real API call
  
  await new Promise(resolve => setTimeout(resolve, 300))
  return {
    school: mockSchools.find(s => s.id === schoolId) || null,
    evidence: mockEvidence.filter(e => e.schoolId === schoolId)
  }
}

// PATCH /api/v1/admin/scoring/{schoolId}
export async function updateSchoolScoring(
  schoolId: string,
  scores: Record<string, number>,
  reason: string
): Promise<{ success: boolean }> {
  // TODO: Replace with real API call
  
  console.log("Updating school scores:", schoolId, scores, reason)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// ==================== Chart Data APIs ====================

export async function getCrawlTrendData(): Promise<typeof mockCrawlTrendData> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockCrawlTrendData
}

export async function getEvidenceByDomainData(): Promise<typeof mockEvidenceByDomain> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockEvidenceByDomain
}

export async function getConfidenceDistributionData(): Promise<typeof mockConfidenceDistribution> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockConfidenceDistribution
}

// ==================== Utility Functions ====================

export function getSimilarSchools(schoolId: string, limit: number = 3): Promise<School[]> {
  const school = mockSchools.find(s => s.id === schoolId)
  if (!school) return Promise.resolve([])
  
  // Find schools in same district or level
  const similar = mockSchools
    .filter(s => s.id !== schoolId && (s.district === school.district || s.level === school.level))
    .slice(0, limit)
  
  return Promise.resolve(similar)
}

// ==================== AI Education Need Module APIs ====================

import type {
  SchoolNeedProfile,
  SchoolSignal,
  Solution,
  Opportunity,
  NeedModelConfig,
  CRMActivity
} from "./types"
import {
  mockNeedProfiles,
  mockSchoolSignals,
  mockSolutions,
  mockOpportunities,
  mockNeedModelConfig,
  mockCRMActivities,
  mockNeedsStats,
  mockOpportunityStats
} from "./mock-data"

// GET /api/v1/needs
export async function getNeedProfiles(): Promise<SchoolNeedProfile[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockNeedProfiles
}

// GET /api/v1/needs/{schoolId}
export async function getNeedProfileBySchoolId(schoolId: string): Promise<SchoolNeedProfile | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockNeedProfiles.find(p => p.schoolId === schoolId) || null
}

// GET /api/v1/needs/{schoolId}/signals
export async function getSchoolSignals(schoolId: string): Promise<SchoolSignal[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockSchoolSignals.filter(s => s.schoolId === schoolId)
}

// POST /api/v1/needs/{schoolId}/reanalyze
export async function reanalyzeSchoolNeeds(schoolId: string): Promise<{ success: boolean; message: string }> {
  console.log("Reanalyzing needs for school:", schoolId)
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: "需求分析已重新執行" }
}

// GET /api/v1/needs/stats
export async function getNeedsStats(): Promise<typeof mockNeedsStats> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockNeedsStats
}

// GET /api/v1/opportunities
export async function getOpportunities(): Promise<Opportunity[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockOpportunities
}

// GET /api/v1/opportunities/{id}
export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockOpportunities.find(o => o.id === id) || null
}

// POST /api/v1/opportunities
export async function createOpportunity(payload: Partial<Opportunity>): Promise<Opportunity> {
  console.log("Creating opportunity:", payload)
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    id: `opp-new-${Date.now()}`,
    schoolId: payload.schoolId || "",
    schoolName: payload.schoolName || "",
    district: payload.district || "",
    level: payload.level || "Secondary",
    maturityLevel: payload.maturityLevel || "C_Starting",
    opportunityScore: payload.opportunityScore || 50,
    priority: payload.priority || "Medium",
    stage: payload.stage || "Not Contacted",
    recommendedSolutionIds: payload.recommendedSolutionIds || [],
    topNeedDimensions: payload.topNeedDimensions || [],
    keyReasons: payload.keyReasons || [],
    latestSignalSummary: payload.latestSignalSummary || "",
    ...payload
  }
}

// PATCH /api/v1/opportunities/{id}
export async function updateOpportunity(id: string, payload: Partial<Opportunity>): Promise<{ success: boolean }> {
  console.log("Updating opportunity:", id, payload)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// GET /api/v1/opportunities/stats
export async function getOpportunityStats(): Promise<typeof mockOpportunityStats> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockOpportunityStats
}

// GET /api/v1/solutions
export async function getSolutions(): Promise<Solution[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockSolutions
}

// GET /api/v1/solutions/{id}
export async function getSolutionById(id: string): Promise<Solution | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockSolutions.find(s => s.id === id) || null
}

// POST /api/v1/solutions
export async function createSolution(payload: Partial<Solution>): Promise<Solution> {
  console.log("Creating solution:", payload)
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    id: `sol-new-${Date.now()}`,
    nameZh: payload.nameZh || "",
    description: payload.description || "",
    targetLevels: payload.targetLevels || [],
    suitableMaturityLevels: payload.suitableMaturityLevels || [],
    mappedNeedDimensions: payload.mappedNeedDimensions || [],
    deliveryMode: payload.deliveryMode || "Onsite",
    duration: payload.duration || "",
    budgetRange: payload.budgetRange || "",
    prerequisites: payload.prerequisites || [],
    deliverables: payload.deliverables || [],
    expectedOutcomes: payload.expectedOutcomes || [],
    proposalTemplate: payload.proposalTemplate || "",
    emailTemplate: payload.emailTemplate || "",
    active: payload.active ?? true,
    ...payload
  }
}

// PATCH /api/v1/solutions/{id}
export async function updateSolution(id: string, payload: Partial<Solution>): Promise<{ success: boolean }> {
  console.log("Updating solution:", id, payload)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// DELETE /api/v1/solutions/{id}
export async function deleteSolution(id: string): Promise<{ success: boolean }> {
  console.log("Deleting solution:", id)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// POST /api/v1/outreach/generate
export async function generateOutreach(payload: {
  schoolId: string
  channel: "Email" | "WhatsApp" | "Phone" | "Proposal"
  tone: "formal" | "friendly" | "concise"
  solutionId?: string
}): Promise<{ subject?: string; body: string }> {
  console.log("Generating outreach:", payload)
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Mock AI-generated content
  if (payload.channel === "Email") {
    return {
      subject: "AI 教育服務介紹 - 誠邀合作",
      body: `敬啟者：

我們是專注於 AI 教育服務的團隊。根據公開資料，了解到貴校在創科教育方面的發展，特此聯繫。

我們提供以下服務：
• 教師生成式 AI 教學工作坊
• AI 數據素養學生課程
• AI 校本課程設計顧問

如貴校有興趣了解更多，歡迎安排簡短會議。

順祝 教安

AI 教育服務團隊`
    }
  }
  
  return {
    body: "感謝貴校對 AI 教育的重視，我們誠意為貴校提供專業支援..."
  }
}

// POST /api/v1/proposal/generate
export async function generateProposal(payload: {
  schoolId: string
  solutionIds: string[]
}): Promise<{ content: string }> {
  console.log("Generating proposal:", payload)
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    content: `# AI 教育服務方案建議書

## 1. 背景
根據貴校在 AI 教育發展的需要...

## 2. 建議方案
...

## 3. 預期成果
...`
  }
}

// GET /api/v1/crm/activities/{opportunityId}
export async function getCRMActivities(opportunityId: string): Promise<CRMActivity[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockCRMActivities.filter(a => a.opportunityId === opportunityId)
}

// POST /api/v1/crm/activities
export async function createCRMActivity(payload: Partial<CRMActivity>): Promise<CRMActivity> {
  console.log("Creating CRM activity:", payload)
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    id: `act-new-${Date.now()}`,
    opportunityId: payload.opportunityId || "",
    type: payload.type || "Note",
    title: payload.title || "",
    content: payload.content || "",
    createdAt: new Date().toISOString(),
    createdBy: payload.createdBy || "系統用戶",
    ...payload
  }
}

// GET /api/v1/admin/need-model
export async function getNeedModelConfig(): Promise<NeedModelConfig> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockNeedModelConfig
}

// PATCH /api/v1/admin/need-model
export async function updateNeedModelConfig(payload: Partial<NeedModelConfig>): Promise<{ success: boolean }> {
  console.log("Updating need model config:", payload)
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

// POST /api/v1/admin/need-model/test
export async function testNeedModel(schoolId: string): Promise<{
  before: SchoolNeedProfile | null
  after: SchoolNeedProfile | null
  changes: string[]
}> {
  console.log("Testing need model for school:", schoolId)
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const profile = mockNeedProfiles.find(p => p.schoolId === schoolId)
  return {
    before: profile || null,
    after: profile ? { ...profile, opportunityScore: profile.opportunityScore + 5 } : null,
    changes: ["商機分數 +5", "教師培訓維度權重已更新"]
  }
}
