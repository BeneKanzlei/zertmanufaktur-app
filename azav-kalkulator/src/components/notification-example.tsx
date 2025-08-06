'use client'

import { useState } from 'react'
import { useNotifications } from '@/hooks/useNotifications'

export default function NotificationExample() {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const { 
    sendCommentNotification, 
    sendTaskNotification, 
    sendAppointmentNotification, 
    sendWelcomeNotification,
    isLoading, 
    error 
  } = useNotifications()

  const handleSendCommentNotification = async () => {
    try {
      await sendCommentNotification(
        email,
        userName,
        'Das ist ein Beispiel-Kommentar',
        'Beispiel-Post Titel'
      )
      alert('Kommentar-Benachrichtigung gesendet!')
    } catch (err) {
      console.error('Fehler:', err)
    }
  }

  const handleSendTaskNotification = async () => {
    try {
      await sendTaskNotification(
        email,
        userName,
        'Neue Aufgabe zugewiesen',
        'Bitte überprüfen Sie die neuen Dokumente'
      )
      alert('Aufgaben-Benachrichtigung gesendet!')
    } catch (err) {
      console.error('Fehler:', err)
    }
  }

  const handleSendAppointmentNotification = async () => {
    try {
      await sendAppointmentNotification(
        email,
        userName,
        'Beratungsgespräch',
        '15. Dezember 2024',
        '14:00 Uhr'
      )
      alert('Termin-Benachrichtigung gesendet!')
    } catch (err) {
      console.error('Fehler:', err)
    }
  }

  const handleSendWelcomeNotification = async () => {
    try {
      await sendWelcomeNotification(email, userName)
      alert('Willkommens-E-Mail gesendet!')
    } catch (err) {
      console.error('Fehler:', err)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">E-Mail-Benachrichtigungen Test</h2>
      
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

        <div className="space-y-2">
          <button
            onClick={handleSendCommentNotification}
            disabled={isLoading || !email || !userName}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sende...' : 'Kommentar-Benachrichtigung senden'}
          </button>

          <button
            onClick={handleSendTaskNotification}
            disabled={isLoading || !email || !userName}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sende...' : 'Aufgaben-Benachrichtigung senden'}
          </button>

          <button
            onClick={handleSendAppointmentNotification}
            disabled={isLoading || !email || !userName}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sende...' : 'Termin-Benachrichtigung senden'}
          </button>

          <button
            onClick={handleSendWelcomeNotification}
            disabled={isLoading || !email || !userName}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sende...' : 'Willkommens-E-Mail senden'}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            Fehler: {error}
          </div>
        )}
      </div>
    </div>
  )
} 