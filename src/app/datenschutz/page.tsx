'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function DatenschutzPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await getCurrentUser()
        setIsAuthenticated(!!user)
      } catch (error) {
        console.error('Fehler beim Prüfen des Auth-Status:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Laden...</h1>
          <p className="text-gray-600">Prüfe Anmeldestatus...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50 h-16 bg-white/95 backdrop-blur-sm">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-16 flex-nowrap">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Zertmanufaktur</span>
              <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex lg:hidden flex-shrink-0">
            <button 
              type="button" 
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/features" className="text-sm/6 font-semibold text-gray-900">Features</Link>
            <Link href="/services" className="text-sm/6 font-semibold text-gray-900">Services</Link>
            <Link href="/ueber-uns" className="text-sm/6 font-semibold text-gray-900">Über uns</Link>
            <Link href="/kontakt" className="text-sm/6 font-semibold text-gray-900">Kontakt</Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isAuthenticated ? (
              <Link href="/dashboard" className="text-sm/6 font-semibold text-gray-900">
                Dashboard <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <Link href="/login" className="text-sm/6 font-semibold text-gray-900">
                Anmelden <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </nav>
      </header>
      
      {/* Mobile menu - outside header */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[70]">
          <div className="fixed inset-0 bg-black/20" />
          <div className="fixed inset-y-0 right-0 z-[70] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Zertmanufaktur</span>
                <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur" className="h-8 w-auto" />
              </Link>
              <button 
                type="button" 
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link href="/features" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Features
                  </Link>
                  <Link href="/services" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Services
                  </Link>
                  <Link href="/ueber-uns" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Über uns
                  </Link>
                  <Link href="/kontakt" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                    Kontakt
                  </Link>
                </div>
                <div className="py-6">
                  {isAuthenticated ? (
                    <Link href="/dashboard" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  ) : (
                    <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                      Anmelden
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="pt-16">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
          <div aria-hidden="true" className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
            <div style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}} className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
          </div>
          <div aria-hidden="true" className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0 sm:transform-gpu">
            <div style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}} className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Datenschutzerklärung</h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Informationen zum Schutz Ihrer persönlichen Daten. Hier erfahren Sie, wie wir Ihre Privatsphäre schützen und Ihre Daten verarbeiten.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <hgroup>
              <h2 className="text-base/7 font-semibold text-gray-900">Get started</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Boost your productivity. Start using our app today.</p>
            </hgroup>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
            <div className="mt-8 flex justify-center">
              <a href="#" className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Get started</a>
            </div>
          </div>
          <div className="mt-24 border-t border-gray-900/10 pt-12 xl:grid xl:grid-cols-3 xl:gap-8">
            <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur" className="h-9" />
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-gray-950">Lösungen</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">Bildungsträger</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">Bildungsmaßnahmen</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">Solopreneur Förderung</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">BAFA Beratung</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">Förderungen nutzen</a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-gray-950">Support</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">Dokumentation</a>
                    </li>
                    <li>
                      <a href="/kontakt" className="text-sm/6 text-gray-600 hover:text-gray-900">Kontakt</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm/6 font-semibold text-gray-950">Unternehmen</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="/ueber-uns" className="text-sm/6 text-gray-600 hover:text-gray-900">Über uns</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">Blog</a>
                    </li>
                    <li>
                      <a href="/kontakt" className="text-sm/6 text-gray-600 hover:text-gray-900">Kontakt</a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm/6 font-semibold text-gray-950">Rechtliches</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="/nutzungsbedingungen" className="text-sm/6 text-gray-600 hover:text-gray-900">Nutzungsbedingungen</a>
                    </li>
                    <li>
                      <a href="/datenschutz" className="text-sm/6 text-gray-600 hover:text-gray-900">Datenschutz</a>
                    </li>
                    <li>
                      <a href="/impressum" className="text-sm/6 text-gray-600 hover:text-gray-900">Impressum</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex gap-x-6 md:order-2">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <span className="sr-only">Facebook</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <span className="sr-only">Instagram</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <span className="sr-only">X</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <span className="sr-only">GitHub</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <span className="sr-only">YouTube</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">&copy; 2025 Zertmanufaktur SIA. All rights reserved.</p>
          </div>
        </div>
      </footer>


    </div>
  )
} 