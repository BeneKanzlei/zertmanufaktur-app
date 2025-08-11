'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestRegistrationNoTrigger() {
  const [email, setEmail] = useState('test2@example.com')
  const [password, setPassword] = useState('testpassword123')
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTestSignUp = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log('🧪 Teste Registrierung ohne Trigger...')
      console.log('📧 E-Mail:', email)
      console.log('🔑 Passwort:', password)
      
      // Schritt 1: Benutzer registrieren
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      
      console.log('🔐 Supabase signUp Ergebnis:', { data, error })
      
      if (error) {
        setResult({
          success: false,
          step: 'signup',
          error: {
            message: error.message,
            status: error.status,
            name: error.name
          }
        })
        return
      }
      
      if (!data?.user) {
        setResult({
          success: false,
          step: 'signup',
          error: {
            message: 'Kein Benutzer nach Registrierung erhalten'
          }
        })
        return
      }
      
      // Schritt 2: Profil manuell erstellen
      console.log('🔧 Erstelle Profil manuell...')
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          first_name: '',
          last_name: '',
          phone: '',
          is_registration: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()
      
      console.log('🔧 Profil-Erstellung Ergebnis:', { profileData, profileError })
      
      setResult({
        success: true,
        step: 'complete',
        user: {
          id: data.user.id,
          email: data.user.email,
          emailConfirmed: data.user.email_confirmed_at
        },
        profile: profileData,
        profileError: profileError ? {
          message: profileError.message,
          code: profileError.code
        } : null
      })

    } catch (err) {
      console.error('❌ Test-Fehler:', err)
      setResult({ 
        success: false, 
        step: 'exception',
        error: { 
          message: err instanceof Error ? err.message : 'Unbekannter Fehler',
          type: 'exception'
        } 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Test: Registrierung ohne Trigger
          </h1>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="test2@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passwort
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Passwort"
              />
            </div>

            <button
              onClick={handleTestSignUp}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Teste...' : 'Registrierung ohne Trigger testen'}
            </button>
          </div>

          {result && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Ergebnis:</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
