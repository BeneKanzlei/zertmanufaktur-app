'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestUserDataPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testUserData = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      // 1. Aktueller Benutzer
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        setTestResult({ error: 'Nicht eingeloggt', details: userError })
        return
      }

      if (!user) {
        setTestResult({ error: 'Kein Benutzer gefunden' })
        return
      }

      // 2. Benutzerdaten aus auth.users
      const { data: authUserData, error: authError } = await supabase
        .from('auth.users')
        .select('*')
        .eq('id', user.id)
        .single()

      // 3. Profil aus public.profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // 4. Benutzer-Metadaten
      const userMetadata = user.user_metadata || {}
      const rawUserMetaData = user.raw_user_meta_data || {}

      setTestResult({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          user_metadata: userMetadata,
          raw_user_meta_data: rawUserMetaData
        },
        authUserData: authUserData || null,
        authError: authError?.message || null,
        profileData: profileData || null,
        profileError: profileError?.message || null
      })

    } catch (error) {
      setTestResult({ error: 'Test fehlgeschlagen', details: error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Benutzerdaten Test
          </h1>

          <button
            onClick={testUserData}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Teste...' : 'Benutzerdaten testen'}
          </button>

          {testResult && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Testergebnis:
              </h2>
              
              <div className="bg-gray-100 rounded-lg p-4 overflow-auto">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>

              {testResult.success && (
                <div className="mt-4 space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Benutzer-Metadaten:</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li><strong>first_name:</strong> {testResult.user.user_metadata.first_name || '❌ Fehlt'}</li>
                      <li><strong>last_name:</strong> {testResult.user.user_metadata.last_name || '❌ Fehlt'}</li>
                      <li><strong>phone:</strong> {testResult.user.user_metadata.phone || '❌ Fehlt'}</li>
                      <li><strong>full_name:</strong> {testResult.user.user_metadata.full_name || '❌ Fehlt'}</li>
                      <li><strong>company_name:</strong> {testResult.user.user_metadata.company_name || '❌ Fehlt'}</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Profil-Daten:</h3>
                    {testResult.profileData ? (
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li><strong>email:</strong> {testResult.profileData.email || '❌ Fehlt'}</li>
                        <li><strong>first_name:</strong> {testResult.profileData.first_name || '❌ Fehlt'}</li>
                        <li><strong>last_name:</strong> {testResult.profileData.last_name || '❌ Fehlt'}</li>
                        <li><strong>full_name:</strong> {testResult.profileData.full_name || '❌ Fehlt'}</li>
                        <li><strong>company_name:</strong> {testResult.profileData.company_name || '❌ Fehlt'}</li>
                        <li><strong>phone:</strong> {testResult.profileData.phone || '❌ Fehlt'}</li>
                        <li><strong>is_registration:</strong> {testResult.profileData.is_registration ? '✅ true' : '❌ false'}</li>
                      </ul>
                    ) : (
                      <p className="text-red-600">❌ Kein Profil gefunden: {testResult.profileError}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
