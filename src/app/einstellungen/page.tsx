'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import ProfileCard from '@/components/settings/profile-card'
import PersonalInfoCard from '@/components/settings/personal-info-card'
import CompanyInfoCard from '@/components/settings/company-info-card'
import NotificationsCard from '@/components/settings/notifications-card'
import PasswordEmailCard from '@/components/settings/password-email-card'

export default function Einstellungen() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const breadcrumbItems = [
    { label: 'Einstellungen', current: true }
  ]

  return (
    <div className="h-full bg-white">
      <Sidebar />
      
      <div className="lg:pl-72">
        <Header 
          onSidebarToggle={() => setSidebarOpen(true)} 
          breadcrumbItems={breadcrumbItems}
        />
        
        <main className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              <ProfileCard />
              <PersonalInfoCard />
              <CompanyInfoCard />
              <PasswordEmailCard />
              <NotificationsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 