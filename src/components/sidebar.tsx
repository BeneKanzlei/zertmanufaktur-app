'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface SidebarProps {
  currentPath?: string
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  // Verwende den aktuellen Pfad oder den übergebenen currentPath
  const activePath = currentPath || pathname

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Fehler beim Abmelden:', error.message)
      } else {
        // Erfolgreich abgemeldet, zur Login-Seite weiterleiten
        router.push('/login')
      }
    } catch (error) {
      console.error('Unerwarteter Fehler beim Abmelden:', error)
    }
  }

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'dashboard', active: activePath === '/dashboard' },
    { type: 'divider' },
    { href: '/qm-systeme', label: 'QM-Systeme', icon: 'checkmark', active: activePath === '/qm-systeme' },
    { href: '/massnahmen', label: 'Massnahmen', icon: 'lightning', active: activePath === '/massnahmen' },
    { href: '/kalkulationen', label: 'Kalkulationen', icon: 'users', active: activePath === '/kalkulationen' },
    { href: '/lehrplaene', label: 'Lehrpläne', icon: 'book', active: activePath === '/lehrplaene' },
    { href: '/curriculas', label: 'Curriculas', icon: 'document', active: activePath === '/curriculas' },
    { type: 'divider' },
    { href: '/kalender', label: 'Kalender', icon: 'calendar', active: activePath === '/kalender' },
    { href: '/berichte', label: 'Berichte', icon: 'chart', active: activePath === '/berichte' },
    { href: '/aufgaben', label: 'Aufgaben', icon: 'checkmark', active: activePath === '/aufgaben' },
    { type: 'divider' },
    { href: '/unternehmen-team', label: 'Unternehmen & Team', icon: 'users', active: activePath === '/unternehmen-team' },
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'checkmark':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'lightning':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'users':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'book':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'document':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-13.5-1.5a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0012 20.904a48.627 48.627 0 008.232-4.41 60.46 60.46 0 00-.491-6.347M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-13.5-1.5a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0012 20.904a48.627 48.627 0 008.232-4.41 60.46 60.46 0 00-.491-6.347" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'calendar':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'chart':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0">
            <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      default:
        return null
    }
  }

  const renderMenuItem = (item: any) => {
    const isActive = item.active || activePath === item.href
    const baseClasses = "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
    const activeClasses = "bg-gray-50 text-indigo-600"
    const inactiveClasses = "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
    const iconClasses = `size-6 shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}`

    if (item.type === 'divider') {
      return <li key={`divider-${item.href}`} className="my-2 h-px bg-gray-200" />
    }

    return (
      <li key={item.href}>
        <Link 
          href={item.href} 
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <div className={iconClasses}>
            {getIcon(item.icon)}
          </div>
          {item.label}
        </Link>
      </li>
    )
  }

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white">
          <div className="flex h-20 items-center justify-center px-6">
            <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur" className="h-16 w-auto" />
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-y-5 px-6 pb-4">
            <ul className="flex flex-1 flex-col gap-y-2">
              <li>
                <ul className="-mx-2 space-y-1">
                  {menuItems.map((item, index) => {
                    if (item.type === 'divider') {
                      return <li key={`divider-${index}`} className="my-2 h-px bg-gray-200" />
                    }
                    return renderMenuItem(item)
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <Link 
                  href="/einstellungen" 
                  className={`group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold ${
                    activePath === '/einstellungen' 
                      ? 'bg-gray-50 text-indigo-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`size-6 shrink-0 ${
                    activePath === '/einstellungen' 
                      ? 'text-indigo-600' 
                      : 'text-gray-400 group-hover:text-indigo-600'
                  }`}>
                    <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Einstellungen
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600">
                    <path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Abmelden
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-20 shrink-0 items-center justify-center">
            <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur" className="h-16 w-auto" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              <li>
                <ul className="-mx-2 space-y-1">
                  {menuItems.map((item, index) => {
                    if (item.type === 'divider') {
                      return <li key={`divider-${index}`} className="my-2 h-px bg-gray-200" />
                    }
                    return renderMenuItem(item)
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <Link 
                  href="/einstellungen" 
                  className={`group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold ${
                    activePath === '/einstellungen' 
                      ? 'bg-gray-50 text-indigo-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`size-6 shrink-0 ${
                    activePath === '/einstellungen' 
                      ? 'text-indigo-600' 
                      : 'text-gray-400 group-hover:text-indigo-600'
                  }`}>
                    <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Einstellungen
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600">
                    <path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Abmelden
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
} 