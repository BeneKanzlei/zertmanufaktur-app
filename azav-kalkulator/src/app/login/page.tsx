'use client'

import AuthLayout from '@/components/shared/AuthLayout'
import LoginForm from '@/components/forms/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout backHref="/">
      <LoginForm />
    </AuthLayout>
  )
} 