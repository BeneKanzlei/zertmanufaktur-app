import { supabase } from './client'

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  console.log('🔐 Supabase signUp aufgerufen mit:', { email, userData })
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    console.log('🔐 Supabase signUp Ergebnis:', { 
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
    
    // Falls E-Mail-Bestätigung erforderlich ist, ist das kein Fehler
    if (error && error.message.includes('Email not confirmed')) {
      console.log('📧 E-Mail-Bestätigung erforderlich - das ist normal')
      return { 
        data: { 
          user: data?.user,
          session: null,
          requiresEmailConfirmation: true
        }, 
        error: null 
      }
    }
    
    return { data, error }
  } catch (err) {
    console.error('🔐 Supabase signUp Exception:', err)
    return { 
      data: null, 
      error: { 
        message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
      } 
    }
  }
}

export const signIn = async (email: string, password: string) => {
  console.log('🔐 Supabase signIn aufgerufen mit:', { email })
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  console.log('🔐 Supabase signIn Ergebnis:', { 
    success: !error, 
    hasUser: !!data?.user,
    error: error?.message 
  })
  
  return { data, error }
}

export const signOut = async () => {
  console.log('🔐 Supabase signOut aufgerufen')
  
  const { error } = await supabase.auth.signOut()
  
  console.log('🔐 Supabase signOut Ergebnis:', { 
    success: !error, 
    error: error?.message 
  })
  
  return { error }
}

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Update user profile
export const updateUserProfile = async (updates: any) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates
  })
  return { data, error }
}

// Reset password
export const resetPassword = async (email: string) => {
  console.log('🔐 Supabase resetPassword aufgerufen mit:', { email })
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  
  console.log('🔐 Supabase resetPassword Ergebnis:', { 
    success: !error, 
    data, 
    error: error?.message 
  })
  
  return { data, error }
}
