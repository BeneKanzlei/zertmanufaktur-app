'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabaseConfig() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testConfig = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log('🧪 Teste Supabase-Konfiguration...')
      
      // Test 1: Prüfe Umgebungsvariablen
      const envVars = {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***' : 'FEHLT'
      }
      
      console.log('🔧 Umgebungsvariablen:', envVars)
      
      // Test 2: Prüfe Supabase-Client
      const clientTest = {
        hasClient: !!supabase,
        clientType: typeof supabase,
        hasAuth: !!supabase.auth
      }
      
      console.log('🔧 Supabase-Client:', clientTest)
      
      // Test 3: Prüfe Verbindung
      const { data: healthData, error: healthError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      
      const connectionTest = {
        success: !healthError,
        error: healthError?.message,
        data: healthData
      }
      
      console.log('🔧 Verbindungstest:', connectionTest)
      
      setResult({
        envVars,
        clientTest,
        connectionTest
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
            Test: Supabase-Konfiguration
          </h1>

          <button
            onClick={testConfig}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Teste...' : 'Konfiguration testen'}
          </button>

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
