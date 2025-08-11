import { supabase } from './client'

// Einfache Auth-Funktion ohne komplexe Optionen
export const signUpSimple = async (email: string, password: string, userData: any) => {
  console.log('🔐 Supabase signUp (Simple) aufgerufen mit:', { email, userData })
  
  try {
    // Einfache Registrierung ohne zusätzliche Optionen
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    
    console.log('🔐 Supabase signUp (Simple) Ergebnis:', { 
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
    
    // Falls erfolgreich, aktualisiere die Benutzerdaten
    if (data?.user && !error) {
      console.log('🔐 Aktualisiere Benutzerdaten...')
      
      const { error: updateError } = await supabase.auth.updateUser({
        data: userData
      })
      
      if (updateError) {
        console.error('⚠️ Fehler beim Aktualisieren der Benutzerdaten:', updateError)
        // Das ist kein kritischer Fehler, da der Benutzer bereits erstellt wurde
      } else {
        console.log('✅ Benutzerdaten erfolgreich aktualisiert')
      }
    }
    
    return { data, error }
  } catch (err) {
    console.error('🔐 Supabase signUp (Simple) Exception:', err)
    return { 
      data: null, 
      error: { 
        message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
      } 
    }
  }
}
