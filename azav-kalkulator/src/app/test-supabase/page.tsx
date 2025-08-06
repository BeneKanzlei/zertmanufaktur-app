'use client'

import { useState } from 'react'
import { signIn } from '@/lib/supabase'

export default function TestSupabase() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTestSignIn = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log('🧪 Teste Supabase-Anmeldung...')
      const { data, error } = await signIn(email, password)
      
      const testResult = {
        success: !error,
        hasUser: !!data?.user,
        error: error?.message,
        userData: data?.user ? {
          id: data.user.id,
          email: data.user.email,
          metadata: data.user.user_metadata
        } : null
      }
      
      setResult(testResult)
      console.log('🧪 Test-Ergebnis:', testResult)
      
      // Wenn Login erfolgreich war, sende E-Mail-Benachrichtigung
      if (testResult.success && testResult.hasUser) {
        console.log('✅ Login erfolgreich, sende E-Mail-Benachrichtigung...')
        
        try {
          const notificationPayload = {
            userEmail: email,
            userName: data?.user?.user_metadata?.first_name && data?.user?.user_metadata?.last_name 
              ? `${data.user.user_metadata.first_name} ${data.user.user_metadata.last_name}`
              : data?.user?.user_metadata?.full_name 
              ? data.user.user_metadata.full_name
              : data?.user?.email?.split('@')[0] || email.split('@')[0] || 'Benutzer'
          }
          
          console.log('📧 Sende Anmelde-Benachrichtigung mit Payload:', notificationPayload)
          
          const notificationResponse = await fetch('/api/auth/login-notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationPayload),
          })
          
          const notificationData = await notificationResponse.json()
          console.log('📧 Anmelde-Benachrichtigung Antwort:', notificationData)
          
          if (!notificationResponse.ok) {
            console.error('❌ Anmelde-Benachrichtigung Fehler:', notificationData)
          } else {
            console.log('✅ Anmelde-Benachrichtigung erfolgreich gesendet!')
          }
        } catch (notificationError) {
          console.error('❌ Fehler beim Senden der Anmelde-Benachrichtigung:', notificationError)
          // Anmelde-Benachrichtigung-Fehler soll die Anmeldung nicht blockieren
        }
      }
    } catch (err) {
      setResult({ error: 'Unerwarteter Fehler', details: err })
      console.error('🧪 Test-Fehler:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Supabase Anmeldung Test</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Passwort"
            />
          </div>

          <button
            onClick={handleTestSignIn}
            disabled={isLoading || !email || !password}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Teste...' : 'Supabase Anmeldung testen'}
          </button>

          {result && (
            <div className={`text-sm p-3 rounded-md ${
              result.success 
                ? 'text-green-600 bg-green-50' 
                : 'text-red-600 bg-red-50'
            }`}>
              <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 