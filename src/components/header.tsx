'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Breadcrumb from './breadcrumb'
import Logo from './Logo'

interface HeaderProps {
  onSidebarToggle: () => void
  breadcrumbItems?: Array<{ label: string; href?: string; current?: boolean }>
}

export default function Header({ onSidebarToggle, breadcrumbItems }: HeaderProps) {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, avatar_url, email')
            .eq('id', user.id)
            .single()
          
          setUserProfile(profile)
        }
      } catch (error) {
        console.error('Fehler beim Laden des Benutzerprofils:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  const displayName = userProfile?.first_name || 'Benutzer'

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Fehler beim Abmelden:', error.message)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Unerwarteter Fehler beim Abmelden:', error)
    }
  }

  // Schließe Dropdown beim Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.user-dropdown')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="sticky top-0 z-40 flex flex-col border-b border-gray-200 bg-white">
      {/* Breadcrumbs */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb items={breadcrumbItems} />
      )}
      
      {/* Main Header */}
      <div className="flex h-16 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={onSidebarToggle}
        >
          <span className="sr-only">Open sidebar</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="h-6 w-px bg-gray-200 lg:hidden"></div>

        <div className="flex items-center">
          <Logo size="sm" className="h-8 w-auto" />
        </div>

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form action="#" method="GET" className="grid flex-1 grid-cols-1">
            <input
              type="search"
              name="search"
              placeholder="Suchen..."
              aria-label="Search"
              className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
            />
            <svg viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400">
              <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"></div>

            <div className="relative user-dropdown">
              <button 
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={userProfile?.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt={`${displayName} Avatar`}
                  className="size-6 rounded-full bg-gray-50 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }}
                />
                <span className="hidden lg:block">
                  {isLoading ? 'Laden...' : displayName}
                </span>
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="-mr-1 size-5 text-gray-400">
                  <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5 focus:outline-none transition-all duration-100 ease-out">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-700">Eingeloggt als</p>
                    <p className="truncate text-sm font-medium text-gray-900">{userProfile?.email || 'Benutzer'}</p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsDropdownOpen(false)
                        router.push('/einstellungen')
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden"
                    >
                      Einstellungen
                    </a>
                  </div>
                  <div className="py-1">
                    <form action="#" method="POST">
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault()
                          setIsDropdownOpen(false)
                          handleLogout()
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden"
                      >
                        Abmelden
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 