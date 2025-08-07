'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import Calendar from '@/components/calendar'

export default function Kalender() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const breadcrumbItems = [
    { label: 'Kalender', current: true }
  ]

  // Beispiel-Events für den Kalender
  const calendarEvents = [
    {
      id: '1',
      title: 'Design Review',
      time: '10:00',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Team Meeting',
      time: '14:00',
      date: '2024-01-15'
    },
    {
      id: '3',
      title: 'Kundenbesprechung',
      time: '09:30',
      date: '2024-01-18'
    },
    {
      id: '4',
      title: 'Projektabgabe',
      time: '16:00',
      date: '2024-01-22'
    },
    {
      id: '5',
      title: 'Workshop QM-System',
      time: '13:00',
      date: '2024-01-25'
    }
  ]

  return (
    <div className="h-full bg-white">
      <Sidebar currentPath="/kalender" />
      
      <div className="lg:pl-72">
        <Header 
          onSidebarToggle={() => setSidebarOpen(true)} 
          breadcrumbItems={breadcrumbItems}
        />
        
        <Calendar events={calendarEvents} />
      </div>
    </div>
  )
} 