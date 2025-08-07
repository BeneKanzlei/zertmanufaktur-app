'use client'

import { useState } from 'react'
import LoginNotificationTest from '@/components/login-notification-test'

export default function TestLoginNotification() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Anmelde-Benachrichtigung Test</h1>
        <LoginNotificationTest />
      </div>
    </div>
  )
} 