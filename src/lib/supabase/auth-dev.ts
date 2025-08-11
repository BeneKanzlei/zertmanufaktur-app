import { supabase } from './client'

// Entwicklungsversion der Auth-Funktionen (ohne E-Mail-Bestätigung)
export const signUpDev = async (email: string, password: string, userData: any) => {
  console.log('🔐 Supabase signUp (Dev) aufgerufen mit:', { email, userData })
  
  try {
    // Für die Entwicklung: E-Mail-Bestätigung deaktiviert
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    console.log('🔐 Supabase signUp (Dev) Ergebnis:', { 
      success: !error, 
      hasUser: !!data?.user,
      error: error?.message,
      session: !!data?.session,
      user: data?.user ? {
        id: data.user.id,
        email: data.user.email,
        email_confirmed_at: data.user.email_confirmed_at
      } : null
    })
    
    // In der Entwicklung: Benutzer direkt anmelden
    if (data?.user && !data.session) {
      console.log('🔐 Entwicklungsmodus: Melde Benutzer direkt an...')
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (signInError) {
        console.error('❌ Direkte Anmeldung fehlgeschlagen:', signInError)
        return { data: { user: data.user, session: null }, error: signInError }
      }
      
      console.log('✅ Direkte Anmeldung erfolgreich:', signInData)
      return { data: signInData, error: null }
    }
    
    return { data, error }
  } catch (err) {
    console.error('🔐 Supabase signUp (Dev) Exception:', err)
    return { 
      data: null, 
      error: { 
        message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
      } 
    }
  }
}
