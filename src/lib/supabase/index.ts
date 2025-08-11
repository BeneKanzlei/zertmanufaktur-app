// Re-export all Supabase functions for easy importing
export { supabase } from './client'

// Auth functions
export {
  signUp,
  signIn,
  signOut,
  getSession,
  getCurrentUser,
  updateUserProfile
} from './auth'

// Profile functions
export {
  getUserProfile,
  updateUserWithCompany,
  getAllProfiles,
  updateProfile
} from './profiles'

// Company functions
export {
  createCompany,
  getCompany,
  getCompanyByUserId,
  updateCompany,
  getAllCompanies,
  deleteCompany
} from './companies'
