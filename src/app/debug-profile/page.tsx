'use client'

import { useState } from 'react'
import { getUserProfile } from '@/lib/supabase'

export default function DebugProfile() {
  const [userId, setUserId] = useState('ed94adab-91a5-4349-9b2c-641a7ccf6c2e')
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTestProfile = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log('🧪 Teste Profil-Abruf für Benutzer:', userId)
      
      const { data, error } = await getUserProfile(userId)
      
      setResult({
        success: !error,
        data,
        error,
        hasProfile: !!data,
        isRegistration: data?.is_registration
      })

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
            Debug: Profil-Abruf
          </h1>

          <div className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                Benutzer-ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="user-uuid"
              />
            </div>

            <button
              onClick={handleTestProfile}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Teste...' : 'Profil abrufen'}
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
