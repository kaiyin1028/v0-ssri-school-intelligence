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
