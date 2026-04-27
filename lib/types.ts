// SSRI School Intelligence Platform - Type Definitions

export type SchoolLevel = "Primary" | "Secondary" | "Special" | "International"
export type SchoolType = "Government" | "Aided" | "DSS" | "Private" | "International"
export type SSRIGrade = "Platinum" | "Gold" | "Silver" | "Developing" | "Insufficient Data"
export type ConfidenceLevel = "High" | "Medium" | "Low" | "Insufficient"
export type SSRIDomain = "Culture" | "Inclusion" | "Community" | "Innovation" | "WholePerson" | "Governance"
export type SourceType = "Government" | "School Website" | "Annual Report" | "NGO" | "Media" | "Social" | "Other"
export type VerificationStatus = "AI Extracted" | "Human Verified" | "Rejected" | "Needs Review"
export type ReportStatus = "Draft" | "Reviewed" | "Published"
export type CrawlStatus = "Success" | "Warning" | "Failed" | "Scheduled" | "Running"
export type UserRole = "Parent" | "School" | "Analyst"

export interface SSRIDomainScore {
  domain: SSRIDomain
  labelZh: string
  labelEn: string
  score: number | null
  confidence: ConfidenceLevel
  evidenceCount: number
  description?: string
}

export interface School {
  id: string
  nameZh: string
  nameEn: string
  district: string
  level: SchoolLevel
  type: SchoolType
  genderType?: string
  religion?: string
  sponsoringBody?: string
  website?: string
  address?: string
  totalScore: number | null
  grade: SSRIGrade
  confidence: ConfidenceLevel
  lastUpdated: string
  domainScores: SSRIDomainScore[]
  evidenceCount: number
}

export interface SchoolAISummary {
  schoolId: string
  summary: string
  strengths: string[]
  improvementAreas: string[]
  generatedAt: string
}

export interface EvidenceItem {
  id: string
  schoolId: string
  domain: SSRIDomain
  indicator: string
  evidenceSummary: string
  evidenceText?: string
  sourceType: SourceType
  sourceTitle: string
  sourceUrl?: string
  publishedDate?: string
  crawledAt: string
  aiConfidence: number
  sourceReliability: number
  verificationStatus: VerificationStatus
}

export interface Report {
  id: string
  schoolId: string
  schoolName: string
  period: string
  totalScore: number | null
  grade: SSRIGrade
  confidence: ConfidenceLevel
  generatedAt: string
  status: ReportStatus
}

export interface CrawlJob {
  id: string
  schoolId: string
  schoolName: string
  sourceUrl: string
  sourceType: string
  status: CrawlStatus
  pagesCrawled: number
  documentsFound: number
  lastCrawledAt: string
  errorMessage?: string
}

export interface TimelineEvent {
  id: string
  schoolId: string
  type: "crawl" | "evidence" | "report" | "verification" | "correction"
  title: string
  description: string
  timestamp: string
  icon?: string
}

export interface CorrectionRequest {
  name: string
  email: string
  role: string
  message: string
  attachments?: File[]
}

export interface AdminDashboardStats {
  totalSchools: number
  successfulCrawls: number
  failedCrawls: number
  newDocuments: number
  pendingEvidence: number
  pendingReports: number
  dataQualityAlerts: number
}

export interface FilterOptions {
  districts: string[]
  levels: SchoolLevel[]
  types: SchoolType[]
  grades: SSRIGrade[]
  confidenceLevels: ConfidenceLevel[]
}

export interface SchoolSearchParams {
  query?: string
  district?: string
  level?: SchoolLevel
  type?: SchoolType
  minScore?: number
  maxScore?: number
  confidence?: ConfidenceLevel
  sortBy?: "score" | "confidence" | "lastUpdated" | "name"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}
