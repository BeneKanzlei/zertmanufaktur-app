'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function PasswordEmailCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setMessageType('')

    if (newPassword !== confirmPassword) {
      setMessage('Die neuen Passwörter stimmen nicht überein.')
      setMessageType('error')
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setMessage('Das neue Passwort muss mindestens 8 Zeichen lang sein.')
      setMessageType('error')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        setMessage(error.message || 'Fehler beim Ändern des Passworts.')
        setMessageType('error')
      } else {
        setMessage('Passwort erfolgreich geändert!')
        setMessageType('success')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      setMessage('Ein unerwarteter Fehler ist aufgetreten.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setMessageType('')

    if (!newEmail || !newEmail.includes('@')) {
      setMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      setMessageType('error')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail
      })

      if (error) {
        setMessage(error.message || 'Fehler beim Ändern der E-Mail-Adresse.')
        setMessageType('error')
      } else {
        setMessage('E-Mail-Adresse erfolgreich geändert! Bitte bestätigen Sie die neue E-Mail-Adresse.')
        setMessageType('success')
        setNewEmail('')
      }
    } catch (err) {
      setMessage('Ein unerwarteter Fehler ist aufgetreten.')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-12">
      <div className="md:col-span-4">
        <h2 className="text-base/7 font-semibold text-gray-900">Passwort & E-Mail ändern</h2>
        <p className="mt-1 text-sm/6 text-gray-600">Ändern Sie Ihr Passwort oder Ihre E-Mail-Adresse für zusätzliche Sicherheit.</p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-8">
        {/* Passwort ändern */}
        <div className="col-span-full">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Passwort ändern</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm/6 font-medium text-gray-900">Neues Passwort</label>
              <div className="mt-2">
                <input 
                  id="new-password" 
                  type="password" 
                  name="new-password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">Neues Passwort bestätigen</label>
              <div className="mt-2">
                <input 
                  id="confirm-password" 
                  type="password" 
                  name="confirm-password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !newPassword || !confirmPassword}
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Ändern...' : 'Passwort ändern'}
              </button>
            </div>
          </form>
        </div>

        {/* E-Mail ändern */}
        <div className="col-span-full">
          <h3 className="text-lg font-medium text-gray-900 mb-4">E-Mail-Adresse ändern</h3>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div>
              <label htmlFor="new-email" className="block text-sm/6 font-medium text-gray-900">Neue E-Mail-Adresse</label>
              <div className="mt-2">
                <input 
                  id="new-email" 
                  type="email" 
                  name="new-email" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !newEmail}
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Ändern...' : 'E-Mail ändern'}
              </button>
            </div>
          </form>
        </div>

        {/* Nachrichten */}
        {message && (
          <div className={`col-span-full rounded-md p-4 ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            <div className="flex">
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  messageType === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {messageType === 'success' ? 'Erfolgreich' : 'Fehler'}
                </h3>
                <div className={`mt-2 text-sm ${
                  messageType === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {message}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
