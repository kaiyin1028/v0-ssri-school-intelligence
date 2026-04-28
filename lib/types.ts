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

// ==================== AI Education Need Module Types ====================

export type NeedDimension =
  | "TeacherTraining"
  | "AICurriculum"
  | "StudentCompetition"
  | "AIPolicy"
  | "Hardware"
  | "SoftwarePlatform"
  | "SchoolBasedConsulting"
  | "SafetyCompliance"

export type AIMaturityLevel =
  | "A_Leading"
  | "B_Progressive"
  | "C_Starting"
  | "D_SilentPotential"

export type OpportunityStage =
  | "Not Contacted"
  | "Contacted"
  | "Replied"
  | "Meeting Scheduled"
  | "Proposal Sent"
  | "Pilot"
  | "Won"
  | "Paused"
  | "Lost"

export type SignalCategory =
  | "Curriculum"
  | "Activity"
  | "Competition"
  | "TeacherDevelopment"
  | "Equipment"
  | "Tender"
  | "ParentEducation"
  | "Policy"
  | "ManualInput"
  | "Other"

export type SignalSource =
  | "School Website"
  | "Tender"
  | "Competition Site"
  | "Government"
  | "Media"
  | "Social Media"
  | "Manual Input"
  | "Other"

export interface NeedDimensionScore {
  dimension: NeedDimension
  labelZh: string
  score: number
  confidence: "High" | "Medium" | "Low" | "Insufficient"
  signalCount: number
  topSignals: string[]
  explanation: string
}

export interface SchoolNeedProfile {
  schoolId: string
  maturityLevel: AIMaturityLevel
  maturityLabelZh: string
  overallNeedScore: number
  opportunityScore: number
  confidence: "High" | "Medium" | "Low" | "Insufficient"
  lastAnalyzedAt: string
  needDimensions: NeedDimensionScore[]
  aiSummary: string
  topPotentialNeeds: string[]
  suggestedEntryPoint: string
  recommendedSolutionIds: string[]
  recommendedApproach: string
  cautionNote: string
}

export interface SchoolSignal {
  id: string
  schoolId: string
  source: SignalSource
  sourceUrl?: string
  sourceTitle: string
  publishedDate?: string
  crawledAt: string
  title: string
  summary: string
  originalText?: string
  category: SignalCategory
  keywords: string[]
  mappedNeedDimensions: NeedDimension[]
  signalStrength: number
  confidence: number
  sourceReliability: number
  verificationStatus: VerificationStatus
  dedupeHash?: string
}

export interface Solution {
  id: string
  nameZh: string
  nameEn?: string
  description: string
  targetLevels: SchoolLevel[]
  suitableMaturityLevels: AIMaturityLevel[]
  mappedNeedDimensions: NeedDimension[]
  deliveryMode: "Onsite" | "Online" | "Hybrid"
  duration: string
  budgetRange: string
  prerequisites: string[]
  deliverables: string[]
  expectedOutcomes: string[]
  proposalTemplate: string
  emailTemplate: string
  active: boolean
}

export interface Opportunity {
  id: string
  schoolId: string
  schoolName: string
  district: string
  level: SchoolLevel
  maturityLevel: AIMaturityLevel
  opportunityScore: number
  priority: "High" | "Medium" | "Low"
  stage: OpportunityStage
  owner?: string
  estimatedValue?: number
  recommendedSolutionIds: string[]
  topNeedDimensions: NeedDimension[]
  keyReasons: string[]
  latestSignalSummary: string
  nextAction?: string
  nextActionDate?: string
  lastContactedAt?: string
  notes?: string
}

export interface OutreachTemplate {
  id: string
  name: string
  channel: "Email" | "WhatsApp" | "Phone" | "Proposal"
  targetMaturityLevel?: AIMaturityLevel
  targetNeedDimension?: NeedDimension
  subject?: string
  body: string
}

export interface CRMActivity {
  id: string
  opportunityId: string
  type: "Note" | "Email" | "Call" | "Meeting" | "Proposal" | "StageChange"
  title: string
  content: string
  createdAt: string
  createdBy: string
}

export interface NeedModelConfig {
  dimensionWeights: Record<NeedDimension, number>
  signalCategoryWeights: Record<SignalCategory, number>
  sourceReliabilityWeights: Record<SignalSource, number>
  recencyWeights: {
    zeroToThreeMonths: number
    threeToSixMonths: number
    sixToTwelveMonths: number
    twelveMonthsPlus: number
  }
  keywordRules: Array<{
    id: string
    keyword: string
    mappedNeedDimension: NeedDimension
    weight: number
    active: boolean
    lastUpdated: string
  }>
}
