'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/supabase'
import Logo from '../shared/Logo'

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log('🔄 Login-Formular abgesendet')
    console.log('📧 E-Mail:', formData.email)

    try {
      console.log('Starte Anmeldung...')
      const { data, error } = await signIn(formData.email, formData.password)
      
      console.log('Anmeldung Ergebnis:', { data, error })
      
      if (error) {
        console.error('Anmeldung Fehler:', error)
        setError(error.message)
      } else {
        // Kein Fehler = erfolgreiche Anmeldung, sende Benachrichtigung
        console.log('Anmeldung erfolgreich (kein Fehler), sende Benachrichtigung...')
        console.log('Data:', data)
        
        // Anmelde-Benachrichtigung senden (nur wenn Benutzer vorhanden)
        if (data?.user) {
          try {
            const notificationPayload = {
              userEmail: formData.email,
              userName: data?.user?.user_metadata?.first_name && data?.user?.user_metadata?.last_name 
                ? `${data.user.user_metadata.first_name} ${data.user.user_metadata.last_name}`
                : data?.user?.user_metadata?.full_name 
                ? data.user.user_metadata.full_name
                : data?.user?.email?.split('@')[0] || formData.email.split('@')[0] || 'Benutzer'
            }
            
            console.log('Sende Anmelde-Benachrichtigung mit Payload:', notificationPayload)
            
            const notificationResponse = await fetch('/api/auth/login-notification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(notificationPayload),
            })
            
            const notificationData = await notificationResponse.json()
            console.log('Anmelde-Benachrichtigung Antwort:', notificationData)
            
            if (!notificationResponse.ok) {
              console.error('Anmelde-Benachrichtigung Fehler:', notificationData)
            } else {
              console.log('Anmelde-Benachrichtigung erfolgreich gesendet!')
            }
          } catch (notificationError) {
            console.error('Fehler beim Senden der Anmelde-Benachrichtigung:', notificationError)
            // Anmelde-Benachrichtigung-Fehler soll die Anmeldung nicht blockieren
          }
        }
        
        console.log('Weiterleitung zur Dashboard...')
        // Weiterleitung zur Dashboard
        router.push('/dashboard')
      }
    } catch (err) {
      console.error('Unerwarteter Fehler:', err)
      setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  return (
    <>
      <Logo />
      
      <div>
        <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
          Im Konto anmelden
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Noch kein Zertmanufaktur-Konto?{' '}
          <Link href="/register" className="font-semibold text-gray-900 hover:text-gray-700">
            Jetzt kostenfrei Account anlegen
          </Link>
        </p>
      </div>

      <div className="mt-10">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Anmeldung fehlgeschlagen
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                E-Mail-Adresse
              </label>
              <div className="mt-2">
                <input 
                  id="email" 
                  type="email" 
                  name="email" 
                  required 
                  autoComplete="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Passwort
              </label>
              <div className="mt-2">
                <input 
                  id="password" 
                  type="password" 
                  name="password" 
                  required 
                  autoComplete="current-password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input 
                      id="remember-me" 
                      type="checkbox" 
                      name="rememberMe" 
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-gray-600 checked:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" 
                    />
                    <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white">
                      <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="remember-me" className="block text-sm text-gray-900">
                  Angemeldet bleiben
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-semibold text-gray-900 hover:text-gray-700">
                  Passwort vergessen?
                </Link>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Anmelden...
                  </div>
                ) : (
                  'Anmelden'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
} 