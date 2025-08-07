'use client'

import { useState } from 'react'

export default function LoginNotificationTest() {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSendLoginNotification = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/auth/login-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: email,
          userName: userName,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Fehler beim Senden der Benachrichtigung' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Anmelde-Benachrichtigung Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Mail-Adresse
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
            Benutzername
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="Max Mustermann"
          />
        </div>

        <button
          onClick={handleSendLoginNotification}
          disabled={isLoading || !email || !userName}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sende...' : 'Anmelde-Benachrichtigung senden'}
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
  )
} 