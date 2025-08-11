import { createClient } from '@supabase/supabase-js'

// Admin-Client für Server-seitige Operationen (ohne RLS-Beschränkungen)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase Admin-Konfiguration fehlt!')
  console.error('Bitte stellen Sie sicher, dass NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY in Ihrer .env.local Datei gesetzt sind.')
  throw new Error('Supabase Admin-Konfiguration fehlt')
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Admin-Funktionen für Profile
export const createProfileAdmin = async (profileData: any) => {
  console.log('🔧 Admin: Erstelle Profil:', profileData)
  
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .insert(profileData)
    .select()
    .single()
  
  console.log('🔧 Admin: Profil-Erstellung Ergebnis:', { data, error })
  
  return { data, error }
}

export const getProfileAdmin = async (userId: string) => {
  console.log('🔧 Admin: Rufe Profil ab:', userId)
  
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  console.log('🔧 Admin: Profil-Abfrage Ergebnis:', { data, error })
  
  return { data, error }
}
