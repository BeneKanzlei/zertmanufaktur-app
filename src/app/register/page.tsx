'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/supabase'
import { signUpDev } from '@/lib/supabase/auth-dev'
import { signUpSimple } from '@/lib/supabase/auth-simple'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

// DACH Länderliste
const dachCountries = [
  { code: '+49', name: 'Deutschland', flag: '🇩🇪' },
  { code: '+43', name: 'Österreich', flag: '🇦🇹' },
  { code: '+41', name: 'Schweiz', flag: '🇨🇭' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCountry: '+49',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    company: '',
    acceptTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      console.log('🚀 Starte Registrierung für:', formData.email)
      
      // Direkte Supabase-Registrierung mit Benutzerdaten
      console.log('🔐 Direkte Supabase-Registrierung mit Benutzerdaten...')
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: `${formData.phoneCountry}${formData.phoneNumber}`,
            full_name: `${formData.firstName} ${formData.lastName}`,
            company_name: formData.company || ''
          }
        }
      })
      
      // Falls erfolgreich, erstelle Profil manuell
      if (data?.user && !error) {
        console.log('✅ Benutzer erfolgreich erstellt mit Metadaten')
        
        // Profil manuell erstellen (falls Trigger nicht funktioniert)
        console.log('🔧 Erstelle Profil manuell...')
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
            company_name: formData.company || '',
            phone: `${formData.phoneCountry}${formData.phoneNumber}`,
            is_registration: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single()
        
        if (profileError) {
          console.error('⚠️ Fehler beim Erstellen des Profils:', profileError)
          // Das ist kein kritischer Fehler, da der Benutzer bereits erstellt wurde
        } else {
          console.log('✅ Profil erfolgreich erstellt:', profileData)
        }
      }
      
      if (error) {
        console.error('❌ Registrierungsfehler:', error)
        
        // Benutzerfreundliche Fehlermeldungen
        let errorMessage = error.message
        if (error.message.includes('User already registered')) {
          errorMessage = 'Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich an oder verwenden Sie eine andere E-Mail-Adresse.'
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Das Passwort muss mindestens 6 Zeichen lang sein.'
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
        } else if (error.message.includes('Supabase-Konfiguration')) {
          errorMessage = 'Die Datenbank-Konfiguration ist nicht korrekt. Bitte kontaktieren Sie den Administrator.'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Bitte bestätigen Sie Ihre E-Mail-Adresse, bevor Sie sich anmelden.'
        }
        
        setError(errorMessage)
      } else if (data?.user) {
        console.log('✅ Registrierung erfolgreich für:', data.user.email)
        
        // Profil manuell erstellen (falls Trigger nicht funktioniert)
        try {
          console.log('🔧 Erstelle Profil manuell...')
          
          const profileResponse = await fetch('/api/create-profile-after-registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: data.user.id,
              userData: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: `${formData.phoneCountry}${formData.phoneNumber}`
              }
            }),
          })
          
          const profileData = await profileResponse.json()
          console.log('🔧 Profil-Erstellung Antwort:', profileData)
          
          if (!profileResponse.ok) {
            console.error('⚠️ Profil-Erstellung Fehler:', profileData)
            // Profil-Erstellung-Fehler soll die Registrierung nicht blockieren
          } else {
            console.log('✅ Profil erfolgreich erstellt!')
          }
        } catch (profileError) {
          console.error('❌ Fehler beim Erstellen des Profils:', profileError)
          // Profil-Erstellung-Fehler soll die Registrierung nicht blockieren
        }
        
        // Registrierungsbenachrichtigung senden
        try {
          const notificationPayload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: `${formData.phoneCountry}${formData.phoneNumber}`,
            company: formData.company
          }
          
          console.log('📧 Sende Registrierungsbenachrichtigung mit Payload:', notificationPayload)
          
          const notificationResponse = await fetch('/api/registration-notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationPayload),
          })
          
          const notificationData = await notificationResponse.json()
          console.log('📧 Registrierungsbenachrichtigung Antwort:', notificationData)
          
          if (!notificationResponse.ok) {
            console.error('⚠️ Registrierungsbenachrichtigung Fehler:', notificationData)
            // Registrierungsbenachrichtigung-Fehler soll die Registrierung nicht blockieren
          } else {
            console.log('✅ Registrierungsbenachrichtigung erfolgreich gesendet!')
          }
        } catch (notificationError) {
          console.error('❌ Fehler beim Senden der Registrierungsbenachrichtigung:', notificationError)
          // Registrierungsbenachrichtigung-Fehler soll die Registrierung nicht blockieren
        }
        
        setSuccess(true)
        // Optional: Weiterleitung zur E-Mail-Bestätigungsseite
        // router.push('/verify-email')
      }
    } catch (err) {
      console.error('❌ Unerwarteter Registrierungsfehler:', err)
      setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const isPasswordValid = formData.password.length >= 8
  const isPasswordMatch = formData.password === formData.confirmPassword
  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.phoneNumber && isPasswordValid && isPasswordMatch && formData.acceptTerms

  if (success) {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Zurück-Link oben links */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Zurück</span>
          </Link>
        </div>

        <div className="flex w-full md:w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo mittig über dem Registrierungs-Bereich */}
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
                Registrierung erfolgreich!
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Wir haben Ihnen eine E-Mail zur Bestätigung Ihres Kontos gesendet. 
                Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Bestätigungslink.
              </p>
              <div className="mt-6">
                <Link 
                  href="/login" 
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Zur Anmeldung
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-1/2">
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
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Zurück</span>
        </Link>
      </div>

      <div className="flex w-full md:w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo mittig über dem Registrierungs-Bereich */}
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
              Kostenfrei Account anlegen
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Bereits registriert?{' '}
              <Link href="/login" className="font-semibold text-gray-900 hover:text-gray-700">
                Jetzt anmelden
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
                          Registrierung fehlgeschlagen
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          {error}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                      Vorname *
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                      Nachname *
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    E-Mail-Adresse *
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
                    Mobilfunknummer *
                  </label>
                  <div className="mt-2 flex">
                    <div className="relative">
                      <select
                        name="phoneCountry"
                        value={formData.phoneCountry}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        required
                        className="block w-26 rounded-l-md border-0 py-1.5 pl-2 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed bg-white h-full [&::-ms-expand]:hidden [&::-webkit-select-placeholder]:hidden"
                        style={{
                          backgroundImage: 'none',
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none'
                        }}
                      >
                        {dachCountries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="block w-full rounded-r-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="1512345678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-900">
                    Unternehmen *
                  </label>
                  <div className="mt-2">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Ihr Unternehmen"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Passwort *
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed ${
                        formData.password ? (isPasswordValid ? 'ring-green-300 focus:ring-green-600' : 'ring-red-300 focus:ring-red-600') : 'ring-gray-300 focus:ring-gray-600'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {formData.password && (
                    <p className={`mt-1 text-xs ${isPasswordValid ? 'text-green-600' : 'text-red-600'}`}>
                      {isPasswordValid ? '✓ Mindestens 8 Zeichen' : '✗ Mindestens 8 Zeichen erforderlich'}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                    Passwort bestätigen *
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed ${
                        formData.confirmPassword ? (isPasswordMatch ? 'ring-green-300 focus:ring-green-600' : 'ring-red-300 focus:ring-red-600') : 'ring-gray-300 focus:ring-gray-600'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {formData.confirmPassword && (
                    <p className={`mt-1 text-xs ${isPasswordMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {isPasswordMatch ? '✓ Passwörter stimmen überein' : '✗ Passwörter stimmen nicht überein'}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        required
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-gray-600 checked:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <svg viewBox="0 0 14 14" fill="none" className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white">
                        <path d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                      </svg>
                    </div>
                  </div>
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                    Ich akzeptiere die{' '}
                    <Link href="/terms" className="font-semibold text-gray-900 hover:text-gray-700">
                      Nutzungsbedingungen
                    </Link>{' '}
                    und{' '}
                    <Link href="/privacy" className="font-semibold text-gray-900 hover:text-gray-700">
                      Datenschutzerklärung
                    </Link>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Account erstellen...
                      </div>
                    ) : (
                      'Account erstellen'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/2">
        <img 
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" 
          alt="" 
          className="h-full w-full object-cover" 
        />
      </div>
    </div>
  )
} 