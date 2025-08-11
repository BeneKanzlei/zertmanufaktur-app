import { createClient } from '@supabase/supabase-js'

// Validierung der Umgebungsvariablen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔧 Supabase-Konfiguration:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'FEHLT',
  key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'FEHLT'
})

// Erstelle Supabase-Client mit Fehlerbehandlung
let supabase: any

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase-Konfiguration fehlt!')
    console.error('Bitte stellen Sie sicher, dass NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY in Ihrer .env.local Datei gesetzt sind.')
    throw new Error('Supabase-Konfiguration fehlt')
  }

  // Überprüfung auf Platzhalter-Werte
  if (supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
    console.error('❌ Supabase-Konfiguration verwendet Platzhalter-Werte!')
    console.error('Bitte ersetzen Sie die Platzhalter in Ihrer .env.local Datei mit echten Supabase-Werten.')
    throw new Error('Supabase-Konfiguration verwendet Platzhalter')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('✅ Supabase-Client erfolgreich erstellt')
} catch (error) {
  console.error('❌ Fehler beim Erstellen des Supabase-Clients:', error)
  
  // Erstelle einen Mock-Client für Entwicklung
  console.warn('⚠️ Erstelle Mock-Client für Entwicklung...')
  supabase = {
    auth: {
      signUp: async () => ({ data: null, error: { message: 'Supabase nicht konfiguriert' } }),
      signIn: async () => ({ data: null, error: { message: 'Supabase nicht konfiguriert' } }),
      signOut: async () => ({ error: { message: 'Supabase nicht konfiguriert' } }),
      getSession: async () => ({ data: { session: null }, error: { message: 'Supabase nicht konfiguriert' } }),
      getUser: async () => ({ data: { user: null }, error: { message: 'Supabase nicht konfiguriert' } }),
      updateUser: async () => ({ data: null, error: { message: 'Supabase nicht konfiguriert' } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { message: 'Supabase nicht konfiguriert' } })
        })
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: null, error: { message: 'Supabase nicht konfiguriert' } })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: async () => ({ data: null, error: { message: 'Supabase nicht konfiguriert' } })
          })
        })
      })
    })
  }
}

export { supabase }
