'use client'

import { useState } from 'react'

export default function TestApiPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log('🧪 Teste API-Route...')
      
      const response = await fetch('/api/check-registration-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'test-user-id'
        }),
      })

      console.log('🧪 API Response Status:', response.status)
      console.log('🧪 API Response Headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('🧪 API Error Response:', errorText)
        setError(`HTTP ${response.status}: ${errorText}`)
        return
      }

      const data = await response.json()
      console.log('🧪 API Success Response:', data)
      setResult(data)

    } catch (err) {
      console.error('🧪 API Test Error:', err)
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
    } finally {
      setLoading(false)
    }
  }

  const testProfilesApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log('🧪 Teste Profiles API-Route...')
      
      const response = await fetch('/api/test-profiles')

      console.log('🧪 Profiles API Response Status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('🧪 Profiles API Error Response:', errorText)
        setError(`HTTP ${response.status}: ${errorText}`)
        return
      }

      const data = await response.json()
      console.log('🧪 Profiles API Success Response:', data)
      setResult(data)

    } catch (err) {
      console.error('🧪 Profiles API Test Error:', err)
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
    } finally {
      setLoading(false)
    }
  }

  const testCompaniesApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log('🧪 Teste Companies API-Route...')
      
      const response = await fetch('/api/test-companies')

      console.log('🧪 Companies API Response Status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('🧪 Companies API Error Response:', errorText)
        setError(`HTTP ${response.status}: ${errorText}`)
        return
      }

      const data = await response.json()
      console.log('🧪 Companies API Success Response:', data)
      setResult(data)

    } catch (err) {
      console.error('🧪 Companies API Test Error:', err)
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Test</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test API Routes</h2>
            
            <div className="space-y-4">
              <button
                onClick={testApi}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Check Registration Status API'}
              </button>
              
              <button
                onClick={testProfilesApi}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 ml-4"
              >
                {loading ? 'Testing...' : 'Test Profiles API'}
              </button>
              
              <button
                onClick={testCompaniesApi}
                disabled={loading}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 ml-4"
              >
                {loading ? 'Testing...' : 'Test Companies API'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold">Error:</h3>
              <pre className="text-red-700 mt-2 whitespace-pre-wrap">{error}</pre>
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-semibold">Success:</h3>
              <pre className="text-green-700 mt-2 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
