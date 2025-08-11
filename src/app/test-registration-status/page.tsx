'use client'

import { useState } from 'react'
import { signIn } from '@/lib/supabase'

export default function TestRegistrationStatus() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTestLogin = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log('🧪 Teste Login und Registrierungsstatus...')
      
      // 1. Login durchführen
      const { data, error } = await signIn(email, password)
      
      if (error) {
        setResult({ error: error.message })
        return
      }

      if (!data?.user) {
        setResult({ error: 'Kein Benutzer nach Login gefunden' })
        return
      }

      console.log('✅ Login erfolgreich, Benutzer-ID:', data.user.id)

      // 2. Registrierungsstatus prüfen
      const statusResponse = await fetch('/api/check-registration-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: data.user.id }),
      })
      
      const statusData = await statusResponse.json()
      console.log('📋 Registrierungsstatus Antwort:', statusData)
      
      // 3. Falls kein Profil gefunden wurde, erstelle eines
      if (!statusResponse.ok && statusData.error?.includes('Benutzerprofil nicht gefunden')) {
        console.log('🔧 Erstelle fehlendes Profil...')
        
        const createProfileResponse = await fetch('/api/create-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            userId: data.user.id,
            userData: data.user.user_metadata
          }),
        })
        
        const createProfileData = await createProfileResponse.json()
        console.log('🔧 Profil-Erstellung Antwort:', createProfileData)
        
        // 4. Registrierungsstatus erneut prüfen
        const retryStatusResponse = await fetch('/api/check-registration-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: data.user.id }),
        })
        
        const retryStatusData = await retryStatusResponse.json()
        console.log('📋 Registrierungsstatus nach Profil-Erstellung:', retryStatusData)
        
        setResult({
          loginSuccess: true,
          userId: data.user.id,
          statusResponse: retryStatusData,
          statusOk: retryStatusResponse.ok,
          needsRegistration: retryStatusData.needsCompanyRegistration,
          profileCreated: createProfileData.success,
          profileCreationResponse: createProfileData
        })
      } else {
        setResult({
          loginSuccess: true,
          userId: data.user.id,
          statusResponse: statusData,
          statusOk: statusResponse.ok,
          needsRegistration: statusData.needsCompanyRegistration
        })
      }

    } catch (err) {
      console.error('❌ Test-Fehler:', err)
      setResult({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Test: Registrierungsstatus
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
                placeholder="test@example.com"
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
              onClick={handleTestLogin}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Teste...' : 'Login und Status testen'}
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
