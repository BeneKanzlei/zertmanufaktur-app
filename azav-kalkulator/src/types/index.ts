// User types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  created_at: string
}

// AZAV Calculation types
export interface AZAVCalculation {
  id: string
  userId: string
  title: string
  description: string
  measureType: string
  targetGroup: string
  duration: number // in days
  participants: number
  totalCost: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

// Berufe Buch types
export interface BerufeBuchEntry {
  id: string
  code: string
  title: string
  description: string
  category: string
  requirements: string[]
  skills: string[]
}

// BDKS Framework types
export interface BDKSFramework {
  id: string
  code: string
  title: string
  description: string
  level: 'basic' | 'advanced' | 'expert'
  category: string
  competencies: string[]
}

// Curriculum types
export interface Curriculum {
  id: string
  calculationId: string
  title: string
  description: string
  targetGroup: string
  measureObjective: string
  marketRelevance: string
  methodology: string
  didactics: string
  content: CurriculumContent[]
  resources: Resource[]
  qualityAssurance: QualityAssurance
  created_at: string
  updated_at: string
}

export interface CurriculumContent {
  id: string
  day: number
  topic: string
  focus: string
  teachingUnits: number
  description: string
  materials: string[]
}

export interface Resource {
  id: string
  type: 'room' | 'equipment' | 'personnel'
  name: string
  description: string
  quantity: number
  cost: number
}

export interface QualityAssurance {
  completion: string
  learningAssessment: string
  suitabilityAssessment: string
}

// Form types
export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  company?: string
  acceptTerms: boolean
} 