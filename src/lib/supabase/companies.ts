import { supabase } from './client'

// Create company
export const createCompany = async (companyData: any) => {
  console.log('🏢 Supabase: Erstelle neue Firma:', companyData)
  
  const { data, error } = await supabase
    .from('companies')
    .insert(companyData)
    .select()
    .single()
  
  console.log('🏢 Supabase: Firma-Erstellung Ergebnis:', { data, error })
  
  return { data, error }
}

// Get company by ID
export const getCompany = async (companyId: string) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .single()
  
  return { data, error }
}

// Get company by user ID
export const getCompanyByUserId = async (userId: string) => {
  // First get the user's profile to get the company ID
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('firmen_id')
    .eq('id', userId)
    .single()
  
  if (profileError || !profileData?.firmen_id) {
    return { data: null, error: profileError || new Error('No company linked to user') }
  }
  
  // Then get the company data
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', profileData.firmen_id)
    .single()
  
  return { data, error }
}

// Update company
export const updateCompany = async (companyId: string, updates: any) => {
  const { data, error } = await supabase
    .from('companies')
    .update(updates)
    .eq('id', companyId)
    .select()
    .single()
  
  return { data, error }
}

// Get all companies (for admin purposes)
export const getAllCompanies = async () => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Delete company
export const deleteCompany = async (companyId: string) => {
  const { error } = await supabase
    .from('companies')
    .delete()
    .eq('id', companyId)
  
  return { error }
}
