import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
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
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Password reset
export const resetPassword = async (email: string) => {
  console.log('🔐 Supabase resetPassword aufgerufen mit:', { email })
  
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    
    console.log('🔐 Supabase resetPassword Ergebnis:', { 
      success: !error, 
      data, 
      error: error?.message 
    })
    
    return { data, error }
  } catch (err) {
    console.error('🔐 Supabase resetPassword Exception:', err)
    return { 
      data: null, 
      error: { 
        message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' 
      } 
    }
  }
}

// Update user profile
export const updateUserProfile = async (updates: any) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates
  })
  return { data, error }
}

// Get session
export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
} 