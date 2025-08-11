import { supabase } from './client'

// Get user profile from profiles table
export const getUserProfile = async (userId: string) => {
  console.log('🔍 Supabase: Rufe Profil für Benutzer ab:', userId)
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  console.log('🔍 Supabase: Profil-Abfrage Ergebnis:', { data, error })
  
  // Falls kein Profil gefunden wurde, erstelle ein Standard-Profil
  if (error && error.code === 'PGRST116') {
    console.log('🔧 Supabase: Kein Profil gefunden, erstelle Standard-Profil...')
    
    const defaultProfile = {
      id: userId,
      first_name: '',
      last_name: '',
      phone: '',
      is_registration: true, // Standardmäßig true für neue Benutzer
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    console.log('🔧 Supabase: Erstelle Profil mit Daten:', defaultProfile)
    
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert(defaultProfile)
      .select()
      .single()
    
    if (createError) {
      console.error('❌ Supabase: Fehler beim Erstellen des Standard-Profils:', createError)
      return { data: null, error: createError }
    }
    
    console.log('✅ Supabase: Standard-Profil erfolgreich erstellt:', newProfile)
    return { data: newProfile, error: null }
  }
  
  // Falls ein anderes Problem vorliegt, gib den Fehler zurück
  if (error) {
    console.error('❌ Supabase: Unerwarteter Fehler beim Abrufen des Profils:', error)
    return { data: null, error }
  }
  
  console.log('✅ Supabase: Profil erfolgreich abgerufen:', data)
  return { data, error: null }
}

// Update user profile with company ID
export const updateUserWithCompany = async (userId: string, companyId: string) => {
  console.log('🔍 Supabase: Aktualisiere Benutzer mit Firma:', { userId, companyId })
  
  const { data, error } = await supabase
    .from('profiles')
    .update({ 
      firmen_id: companyId,
      is_registration: false 
    })
    .eq('id', userId)
    .select()
    .single()
  
  console.log('🔍 Supabase: Benutzer-Update Ergebnis:', { data, error })
  
  return { data, error }
}

// Get all profiles (for admin purposes)
export const getAllProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Update profile fields
export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}
