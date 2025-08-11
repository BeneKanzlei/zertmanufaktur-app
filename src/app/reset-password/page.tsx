'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValidToken, setIsValidToken] = useState(false)

  useEffect(() => {
    // Prüfe, ob der Benutzer einen gültigen Reset-Token hat
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsValidToken(true)
      } else {
        setError('Ungültiger oder abgelaufener Reset-Link. Bitte fordern Sie einen neuen Link an.')
      }
    }
    
    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Das Passwort muss mindestens 8 Zeichen lang sein.')
      setIsLoading(false)
      return
    }

    try {
      console.log('🔄 Passwort-Update-Formular abgesendet')

      const { data, error } = await supabase.auth.updateUser({
        password: password
      })
      
      console.log('🔐 Supabase updateUser Ergebnis:', { 
        success: !error, 
        data, 
        error: error?.message 
      })
      
      if (error) {
        console.error('Passwort-Update Fehler:', error)
        setError(error.message || 'Fehler beim Aktualisieren des Passworts. Bitte versuchen Sie es erneut.')
      } else {
        console.log('Passwort erfolgreich aktualisiert')
        setSuccess(true)
        
        // Nach 3 Sekunden zur Login-Seite weiterleiten
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
      
    } catch (err) {
      console.error('Unerwarteter Fehler:', err)
      setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Zurück-Link oben links */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Zurück</span>
          </Link>
        </div>

        <div className="flex w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo mittig über dem Bereich */}
            <div className="flex justify-center mb-8">
              <Image 
                src="/Zertmanufaktur.svg" 
                alt="Zertmanufaktur Logo" 
                width={120} 
                height={120} 
                className="h-16 w-auto"
              />
            </div>

            <div>
              <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
                Passwort erfolgreich geändert!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Ihr Passwort wurde erfolgreich aktualisiert. Sie werden in wenigen Sekunden zur Anmeldeseite weitergeleitet.
              </p>
              <div className="mt-6">
                <Link 
                  href="/login" 
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Jetzt anmelden
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" 
            alt="" 
            className="h-full w-full object-cover" 
          />
        </div>
      </div>
    )
  }

  if (!isValidToken) {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Zurück-Link oben links */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Zurück</span>
          </Link>
        </div>

        <div className="flex w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo mittig über dem Bereich */}
            <div className="flex justify-center mb-8">
              <Image 
                src="/Zertmanufaktur.svg" 
                alt="Zertmanufaktur Logo" 
                width={120} 
                height={120} 
                className="h-16 w-auto"
              />
            </div>

            <div>
              <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
                Ungültiger Link
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {error || 'Der Reset-Link ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen Link an.'}
              </p>
              <div className="mt-6">
                <Link 
                  href="/forgot-password" 
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Neuen Link anfordern
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" 
            alt="" 
            className="h-full w-full object-cover" 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Zurück-Link oben links */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/login" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Zurück</span>
        </Link>
      </div>

      <div className="flex w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo mittig über dem Bereich */}
          <div className="flex justify-center mb-8">
            <Image 
              src="/Zertmanufaktur.svg" 
              alt="Zertmanufaktur Logo" 
              width={120} 
              height={120} 
              className="h-16 w-auto"
            />
          </div>

          <div>
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
              Neues Passwort setzen
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Geben Sie Ihr neues Passwort ein. Es muss mindestens 8 Zeichen lang sein.
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
                          Fehler beim Aktualisieren
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          {error}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Neues Passwort
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                    Passwort bestätigen
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || !password || !confirmPassword}
                    className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Passwort aktualisieren...
                      </div>
                    ) : (
                      'Passwort aktualisieren'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <Link href="/login" className="text-sm font-semibold text-gray-900 hover:text-gray-700">
                    Zurück zur Anmeldung
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img 
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" 
          alt="" 
          className="h-full w-full object-cover" 
        />
      </div>
    </div>
  )
} 