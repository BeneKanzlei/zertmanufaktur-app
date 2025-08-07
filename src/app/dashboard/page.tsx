'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import ContentHeader from '@/components/content-header'
import Stats from '@/components/stats'
import ActivityTable from '@/components/activity-table'
import Projects from '@/components/projects'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock-Daten für die Komponenten
  const statsData = [
    { label: 'Kalkulationen', value: 24, change: '+12.5%', changeType: 'positive' as const },
    { label: 'Aktive Projekte', value: 12, change: '+8.2%', changeType: 'positive' as const },
    { label: 'Genehmigte Maßnahmen', value: 18, change: '+2.1%', changeType: 'neutral' as const },
    { label: 'Durchschnittliche Kosten', value: '€2,450', change: '+5.3%', changeType: 'negative' as const },
  ]

  const activitiesData = [
    {
      id: '1',
      amount: '€2,800.00',
      status: 'approved' as const,
      taxes: '€280.00 Steuern',
      project: 'Webentwicklung',
      projectDetails: 'Frontend-Entwicklung',
      calculationId: '#001',
      date: '2024-01-15'
    }
  ]

  const projectsData = [
    {
      id: '1',
      name: 'Webentwicklung',
      status: 'active' as const,
      budget: '€15,000.00'
    }
  ]

  const breadcrumbItems = [
    { label: 'Dashboard', current: true }
  ]

  return (
    <div className="h-full bg-white">
      <Sidebar currentPath="/dashboard" />
      
      <div className="lg:pl-72">
        <Header 
          onSidebarToggle={() => setSidebarOpen(true)} 
          breadcrumbItems={breadcrumbItems}
        />
        
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <ContentHeader 
              title="AZAV Kalkulator"
              actionButton={{
                label: 'Neue Kalkulation',
                href: '/kalkulationen/neu'
              }}
            />
            
            <Stats stats={statsData} />
            
            <div className="space-y-16 py-16 xl:space-y-20">
              <ActivityTable activities={activitiesData} />
              <Projects projects={projectsData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 