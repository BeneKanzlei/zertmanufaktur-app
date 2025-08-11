'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { resetPassword } from '@/lib/supabase/auth'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      console.log('🔄 Passwort-Reset-Formular abgesendet')
      console.log('📧 E-Mail:', email)

      // Supabase Passwort-Reset aufrufen
      const { data, error } = await resetPassword(email)
      
      console.log('🔐 Supabase resetPassword Ergebnis:', { 
        success: !error, 
        data, 
        error: error?.message 
      })
      
      if (error) {
        console.error('Passwort-Reset Fehler:', error)
        setError(error.message || 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.')
      } else {
        console.log('Passwort-Reset-E-Mail erfolgreich gesendet')
        setSuccess(true)
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
                E-Mail gesendet!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Wir haben Ihnen eine E-Mail mit einem Link zum Zurücksetzen Ihres Passworts gesendet. 
                Bitte überprüfen Sie Ihren Posteingang und folgen Sie den Anweisungen.
              </p>
              <div className="mt-6">
                <Link 
                  href="/login" 
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Zurück zur Anmeldung
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
              Passwort zurücksetzen
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
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
                          Fehler beim Senden
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
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        E-Mail senden...
                      </div>
                    ) : (
                      'E-Mail senden'
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