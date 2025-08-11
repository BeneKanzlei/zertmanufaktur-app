'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function TestConfigPage() {
  const [configStatus, setConfigStatus] = useState<{
    supabase: 'loading' | 'success' | 'error'
    resend: 'loading' | 'success' | 'error'
  }>({
    supabase: 'loading',
    resend: 'loading'
  })
  const [error, setError] = useState('')
  const [details, setDetails] = useState<{
    supabase?: string
    resend?: string
  }>({})

  useEffect(() => {
    testConfigurations()
  }, [])

  const testConfigurations = async () => {
    // Test Supabase
    try {
      console.log('🔍 Teste Supabase-Konfiguration...')
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('❌ Supabase-Fehler:', error)
        setConfigStatus(prev => ({ ...prev, supabase: 'error' }))
        setDetails((prev: { supabase?: string; resend?: string }) => ({ ...prev, supabase: error.message }))
      } else {
        console.log('✅ Supabase-Konfiguration erfolgreich')
        setConfigStatus(prev => ({ ...prev, supabase: 'success' }))
        setDetails((prev: { supabase?: string; resend?: string }) => ({ ...prev, supabase: 'Verbindung erfolgreich' }))
      }
    } catch (err) {
      console.error('❌ Supabase-Exception:', err)
      setConfigStatus(prev => ({ ...prev, supabase: 'error' }))
              setDetails((prev: { supabase?: string; resend?: string }) => ({ ...prev, supabase: err instanceof Error ? err.message : 'Unbekannter Fehler' }))
    }

    // Test Resend (nur Konfiguration, kein E-Mail-Versand)
    try {
      console.log('🔍 Teste Resend-Konfiguration...')
      
      // Überprüfe nur die Umgebungsvariable
      const resendApiKey = process.env.RESEND_API_KEY
      if (!resendApiKey) {
        throw new Error('RESEND_API_KEY ist nicht gesetzt')
      }
      
      if (resendApiKey.includes('placeholder') || resendApiKey.includes('ihr-resend-api-key')) {
        throw new Error('RESEND_API_KEY verwendet Platzhalter-Werte')
      }
      
      console.log('✅ Resend-Konfiguration erfolgreich')
      setConfigStatus(prev => ({ ...prev, resend: 'success' }))
      setDetails((prev: { supabase?: string; resend?: string }) => ({ ...prev, resend: 'API-Schlüssel konfiguriert' }))
      
    } catch (err) {
      console.error('❌ Resend-Fehler:', err)
      setConfigStatus(prev => ({ ...prev, resend: 'error' }))
      setDetails((prev: { supabase?: string; resend?: string }) => ({ ...prev, resend: err instanceof Error ? err.message : 'Unbekannter Fehler' }))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      default: return 'text-yellow-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      default: return '⏳'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Konfigurationstest
            </h1>
            
            <div className="space-y-6">
              {/* Supabase Status */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Supabase Datenbank
                    </h3>
                    <p className="text-sm text-gray-500">
                      Verbindung zur externen Supabase-Datenbank
                    </p>
                  </div>
                  <div className={`flex items-center ${getStatusColor(configStatus.supabase)}`}>
                    <span className="text-xl mr-2">{getStatusIcon(configStatus.supabase)}</span>
                    <span className="font-medium">
                      {configStatus.supabase === 'loading' && 'Wird getestet...'}
                      {configStatus.supabase === 'success' && 'Erfolgreich'}
                      {configStatus.supabase === 'error' && 'Fehler'}
                    </span>
                  </div>
                </div>
                {details.supabase && (
                  <div className="mt-2 text-sm text-gray-600">
                    {details.supabase}
                  </div>
                )}
              </div>

              {/* Resend Status */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      E-Mail Service (Resend)
                    </h3>
                    <p className="text-sm text-gray-500">
                      E-Mail-Versand für Registrierungsbenachrichtigungen
                    </p>
                  </div>
                  <div className={`flex items-center ${getStatusColor(configStatus.resend)}`}>
                    <span className="text-xl mr-2">{getStatusIcon(configStatus.resend)}</span>
                    <span className="font-medium">
                      {configStatus.resend === 'loading' && 'Wird getestet...'}
                      {configStatus.resend === 'success' && 'Erfolgreich'}
                      {configStatus.resend === 'error' && 'Fehler'}
                    </span>
                  </div>
                </div>
                {details.resend && (
                  <div className="mt-2 text-sm text-gray-600">
                    {details.resend}
                  </div>
                )}
              </div>

              {/* Aktions-Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={testConfigurations}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Erneut testen
                </button>
                <a
                  href="/register"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Zur Registrierung
                </a>
              </div>

              {/* Hilfreiche Links */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Hilfreiche Links:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    <a href="/SUPABASE_SETUP.md" className="underline hover:no-underline">
                      📋 Supabase Setup Anleitung
                    </a>
                  </li>
                  <li>
                    <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                      🔗 Supabase Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                      📧 Resend Dashboard
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
