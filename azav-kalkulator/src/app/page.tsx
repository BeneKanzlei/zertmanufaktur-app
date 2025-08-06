'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const [isBottomBannerVisible, setIsBottomBannerVisible] = useState(true)
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
              <img src="/Logo_header.png" alt="Zertmanufaktur" className="h-8 w-auto" />
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
                <img src="/Logo_header.png" alt="Zertmanufaktur" className="h-8 w-auto" />
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
        <div className="relative isolate w-screen h-[calc(100vh-4rem)]">
          <svg aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-full w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-300">
            <defs>
              <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="100" height="100" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 100V.5H100" fill="none" strokeWidth="1" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
              <path d="M-100 0h101v101h-101Z M300 0h101v101h-101Z M-200 300h101v101h-101Z M100 400h101v101h-101Z" strokeWidth="0" />
            </svg>
            <rect width="100%" height="100%" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" strokeWidth="0" />
          </svg>
          <div aria-hidden="true" className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48">
            <div style={{clipPath: "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"}} className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"></div>
          </div>
          <div className="overflow-hidden h-full">
            <div className="mx-auto max-w-7xl px-6 h-full flex items-center lg:px-8">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center h-full">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl max-w-[100ch]">
                    Wir verändern die Art, wie Menschen sich weiterbilden
                  </h1>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none max-w-[100ch]">
                    Professionelle AZAV-Kalkulationen mit Buch der Berufe und BDKS-Rahmen. 
                    Starten Sie Ihre Karriere mit unserer bewährten Plattform für Zertifizierungen.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    {isAuthenticated ? (
                      <Link href="/dashboard" className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                        Zum Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link href="/register" className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                          Jetzt starten
                        </Link>
                        <Link href="/login" className="text-sm/6 font-semibold text-gray-900">
                          Anmelden <span aria-hidden="true">→</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80" alt="" className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80" alt="" className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
                    </div>
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80" alt="" className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80" alt="" className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
                    </div>
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80" alt="" className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Logo Carousel */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-lg/8 font-semibold text-white">Vertraut von Deutschlands führenden Bildungseinrichtungen</h2>
            <div className="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/transistor-logo-white.svg" alt="Bildungseinrichtung 1" className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" />

              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/reform-logo-white.svg" alt="Bildungseinrichtung 2" className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" />

              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/tuple-logo-white.svg" alt="Bildungseinrichtung 3" className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" />

              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-white.svg" alt="Bildungseinrichtung 4" className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" />

              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/statamic-logo-white.svg" alt="Bildungseinrichtung 5" className="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base/7 font-semibold text-gray-900">Alles was Sie brauchen</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance">Keine Komplexität? Kein Problem.</p>
            <p className="mt-6 text-lg/8 text-gray-600">Unsere Plattform macht AZAV-Zertifizierungen einfach und effizient. Von der ersten Kalkulation bis zur finalen Genehmigung.</p>
          </div>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <img width="2432" height="1442" src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png" alt="Zertmanufaktur App Screenshot" className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10" />
            <div aria-hidden="true" className="relative">
              <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]"></div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="absolute top-1 left-1 size-5 text-gray-500">
                  <path d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Schnelle Berechnung.
              </dt>
              <dd className="inline">Automatische AZAV-Kalkulationen mit integriertem Buch der Berufe und BDKS-Rahmen für maximale Genauigkeit.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="absolute top-1 left-1 size-5 text-gray-500">
                  <path d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Sichere Daten.
              </dt>
              <dd className="inline">Ihre sensiblen Daten sind bei uns sicher. Wir verwenden modernste Verschlüsselung und DSGVO-konforme Datenschutzmaßnahmen.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="absolute top-1 left-1 size-5 text-gray-500">
                  <path d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Einfache Synchronisation.
              </dt>
              <dd className="inline">Automatische Synchronisation mit offiziellen Datenbanken für immer aktuelle Informationen.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="absolute top-1 left-1 size-5 text-gray-500">
                  <path d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 0 1-.82-1.256A8 8 0 0 1 18 9a22.47 22.47 0 0 1-1.228 7.351.75.75 0 1 1-1.417-.49A20.97 20.97 0 0 0 16.5 9 6.5 6.5 0 0 0 10 2.5ZM4.333 4.416a.75.75 0 0 1 .218 1.038A6.466 6.466 0 0 0 3.5 9a7.966 7.966 0 0 1-1.293 4.362.75.75 0 0 1-1.257-.819A6.466 6.466 0 0 0 2 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 0 1 1.038-.219ZM10 6.12a3 3 0 0 0-3.001 3.041 11.455 11.455 0 0 1-2.697 7.24.75.75 0 0 1-1.148-.965A9.957 9.957 0 0 0 5.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 0 1 8.996.084V9.15l-.005.297a.75.75 0 1 1-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 0 0-3-2.965Zm0 2.13a.75.75 0 0 1 .75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 1 1-1.186-.918A13.687 13.687 0 0 0 9.25 9a.75.75 0 0 1 .75-.75Zm3.529 3.698a.75.75 0 0 1 .584.885 18.883 18.883 0 0 1-2.257 5.84.75.75 0 1 1-1.29-.764 17.386 17.386 0 0 0 2.078-5.377.75.75 0 0 1 .885-.584Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Erweiterte Sicherheit.
              </dt>
              <dd className="inline">Mehrschichtige Sicherheit mit DSGVO-Konformität und regelmäßigen Sicherheitsaudits für Ihre Daten.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="absolute top-1 left-1 size-5 text-gray-500">
                  <path d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Leistungsstarke API.
              </dt>
              <dd className="inline">Integrieren Sie unsere Services in Ihre bestehenden Systeme mit unserer umfassenden API.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="absolute top-1 left-1 size-5 text-gray-500">
                  <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                  <path d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Automatische Backups.
              </dt>
              <dd className="inline">Ihre Daten werden automatisch und regelmäßig gesichert, damit Sie nie etwas verlieren.</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA Section - Productivity Boost */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Steigern Sie Ihre Produktivität heute</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">Optimieren Sie Ihre AZAV-Zertifizierungsprozesse und sparen Sie wertvolle Zeit mit unserer intelligenten Plattform. Starten Sie jetzt und erleben Sie den Unterschied.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Jetzt starten</a>
              <a href="#" className="text-sm/6 font-semibold text-white">
                Mehr erfahren
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <svg viewBox="0 0 1024 1024" aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]">
              <circle r="512" cx="512" cy="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#7775D6" />
                  <stop offset="1" stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Bento Grid - Advanced Features */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                      <h2 className="text-center text-base/7 font-semibold text-gray-900">Deploy faster</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">Everything you need to deploy your app</p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Mobile friendly</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
                </div>
                <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png" alt="" className="size-full object-cover object-top" />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl"></div>
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.</p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png" alt="" className="w-full max-lg:max-w-xs" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.</p>
                </div>
                <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png" alt="" className="h-[min(152px,40cqw)] object-cover" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5"></div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Powerful APIs</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.</p>
                </div>
                <div className="relative min-h-120 w-full grow">
                  <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10">
                    <div className="flex bg-gray-900 outline outline-white/5">
                      <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                        <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">NotificationSetting.jsx</div>
                        <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                      </div>
                    </div>
                    <div className="px-6 pt-6 pb-14">
                      {/* Your code example */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative isolate bg-white pt-24 pb-32 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
          <div style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}} className="ml-[max(50%,38rem)] aspect-1313/771 w-328.25 bg-linear-to-tr from-[#ff80b5] to-[#9089fc]"></div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end">
          <div style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}} className="-ml-88 aspect-1313/771 w-328.25 flex-none origin-top-right rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] xl:mr-[calc(50%-12rem)] xl:ml-0"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-gray-900">Kundenstimmen</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Wir haben mit tausenden von zufriedenen Kunden gearbeitet</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
              <blockquote className="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8">
                <p>"Zertmanufaktur hat unsere AZAV-Zertifizierung komplett revolutioniert. Die automatischen Kalkulationen sparen uns wertvolle Zeit und die Plattform ist intuitiv zu bedienen. Sehr empfehlenswert!"</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80" alt="" className="size-10 flex-none rounded-full bg-gray-50" />
                <div className="flex-auto">
                  <div className="font-semibold text-gray-900">Dr. Sarah Weber</div>
                  <div className="text-gray-600">Bildungszentrum München</div>
                </div>
                <img src="https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-gray-900.svg" alt="" className="h-10 w-auto flex-none" />
              </figcaption>
            </figure>
            <div className="space-y-8 xl:contents xl:space-y-0">
              <div className="space-y-8 xl:row-span-2">
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Endlich eine Plattform, die AZAV-Zertifizierungen einfach macht. Die Integration mit dem Buch der Berufe ist genial und spart uns viel Recherchearbeit."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Lisa Müller</div>
                      <div className="text-gray-600">Weiterbildungsinstitut Hamburg</div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Die DSGVO-Konformität und Sicherheit waren für uns entscheidend. Zertmanufaktur erfüllt alle unsere Anforderungen und mehr."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Michael Schmidt</div>
                      <div className="text-gray-600">Berufsakademie Berlin</div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Die API-Integration ermöglicht es uns, Zertmanufaktur nahtlos in unsere bestehenden Systeme einzubinden. Ein echter Gamechanger!"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1506794778202-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">David Wagner</div>
                      <div className="text-gray-600">Technologie-Campus Köln</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className="space-y-8 xl:row-start-1">
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Der Support ist erstklassig. Bei Fragen bekommen wir sofort kompetente Hilfe und die Plattform wird ständig weiterentwickelt."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Anna Fischer</div>
                      <div className="text-gray-600">Bildungszentrum Stuttgart</div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Die automatischen Backups geben uns Sicherheit. Wir wissen, dass unsere Daten immer sicher sind und nie verloren gehen können."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Claudia Bauer</div>
                      <div className="text-gray-600">Akademie für Weiterbildung</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="space-y-8 xl:contents xl:space-y-0">
              <div className="space-y-8 xl:row-start-1">
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Die Benutzeroberfläche ist so intuitiv, dass unsere Mitarbeiter ohne Schulung sofort produktiv arbeiten können. Das spart uns viel Zeit und Geld."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Thomas Klein</div>
                      <div className="text-gray-600">Fortbildungsinstitut Düsseldorf</div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Die regelmäßigen Updates und neuen Features zeigen, dass Zertmanufaktur sich ständig weiterentwickelt. Wir fühlen uns gut aufgehoben."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Petra Schulz</div>
                      <div className="text-gray-600">Bildungszentrum Frankfurt</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className="space-y-8 xl:row-span-2">
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Die Integration mit offiziellen Datenbanken ist fantastisch. Wir haben immer die aktuellsten Informationen und müssen nicht manuell recherchieren."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Lars Hoffmann</div>
                      <div className="text-gray-600">Weiterbildungsakademie</div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Die Kostenersparnis durch die effizienten Prozesse hat sich bereits im ersten Jahr amortisiert. Eine kluge Investition in unsere Zukunft."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Frank Meyer</div>
                      <div className="text-gray-600">Bildungszentrum Leipzig</div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>"Zertmanufaktur hat unsere Arbeitsabläufe komplett digitalisiert. Was früher Wochen gedauert hat, schaffen wir jetzt in Tagen."</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-10 rounded-full bg-gray-50" />
                    <div>
                      <div className="font-semibold text-gray-900">Eva Schneider</div>
                      <div className="text-gray-600">Akademie für Berufliche Bildung</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg viewBox="0 0 1024 1024" aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0">
              <circle r="512" cx="512" cy="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset="1" stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">Steigern Sie Ihre Effizienz. Starten Sie noch heute mit unserer App.</h2>
              <p className="mt-6 text-lg/8 text-pretty text-gray-300">Optimieren Sie Ihre AZAV-Zertifizierungen mit unserer bewährten Plattform. Von der ersten Kalkulation bis zur finalen Genehmigung - alles in einem System.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                {isAuthenticated ? (
                  <Link href="/dashboard" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    Zum Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/register" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                      Jetzt starten
                    </Link>
                    <Link href="/login" className="text-sm/6 font-semibold text-white hover:text-gray-100">
                      Anmelden
                      <span aria-hidden="true">→</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img width="1824" height="1080" src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="Zertmanufaktur App Screenshot" className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Bento Grid Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                      <h2 className="text-base/7 font-semibold text-gray-900">Deploy faster</h2>
          <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">Everything you need to deploy your app</p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-performance.png" alt="" className="h-80 object-cover object-left" />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-gray-900">Performance</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Lightning-fast builds</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus egestas sem pellentesque.</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl"></div>
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-white lg:rounded-tr-4xl"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-releases.png" alt="" className="h-80 object-cover object-left lg:object-right" />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-gray-900">Releases</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Push to deploy</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus massa, laoreet dapibus ex elit vitae odio.</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl"></div>
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white lg:rounded-bl-4xl"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-speed.png" alt="" className="h-80 object-cover object-left" />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-gray-900">Speed</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Built for power users</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">Sed congue eros non finibus molestie. Vestibulum euismod augue.</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl"></div>
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png" alt="" className="h-80 object-cover" />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-gray-900">Integrations</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Connect your favorite tools</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">Maecenas at augue sed elit dictum vulputate, in nisi aliquam maximus arcu.</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5"></div>
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                <img src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-network.png" alt="" className="h-80 object-cover" />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-gray-900">Network</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Globally distributed CDN</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">Aenean vulputate justo commodo auctor vehicula in malesuada semper.</p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Frequently asked questions</h2>
            <dl className="mt-16 divide-y divide-white/10">
              <div className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button type="button" className="flex w-full items-start justify-between text-left text-white">
                    <span className="text-base/7 font-semibold">What's the best thing about Switzerland?</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-400">I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
                </dd>
              </div>
              <div className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button type="button" className="flex w-full items-start justify-between text-left text-white">
                    <span className="text-base/7 font-semibold">How do you make holy water?</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-400">You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.</p>
                </dd>
              </div>
              <div className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button type="button" className="flex w-full items-start justify-between text-left text-white">
                    <span className="text-base/7 font-semibold">What do you call someone with no body and no nose?</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-400">Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptas ipsa quia excepturi, quibusdam natus exercitationem sapiente tempore labore voluptatem.</p>
                </dd>
              </div>
              <div className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button type="button" className="flex w-full items-start justify-between text-left text-white">
                    <span className="text-base/7 font-semibold">Why do you never see elephants hiding in trees?</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-400">Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.</p>
                </dd>
              </div>
              <div className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button type="button" className="flex w-full items-start justify-between text-left text-white">
                    <span className="text-base/7 font-semibold">Why can't you hear a pterodactyl go to the bathroom?</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-400">Because the pee is silent. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, quas voluptatibus ex culpa ipsum, aspernatur blanditiis fugiat ullam magnam suscipit deserunt illum natus facilis atque vero consequatur! Quisquam, debitis error.</p>
                </dd>
              </div>
              <div className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button type="button" className="flex w-full items-start justify-between text-left text-white">
                    <span className="text-base/7 font-semibold">Why did the invisible man turn down the job offer?</span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-400">He couldn't see himself doing it. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet perspiciatis officiis corrupti tenetur. Temporibus ut voluptatibus, perferendis sed unde rerum deserunt eius.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      {isBottomBannerVisible && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
          <div className="pointer-events-auto flex flex-row items-center justify-between gap-2 mx-4 mb-4 sm:mx-0 sm:mb-0 px-3 py-2 sm:px-6 sm:py-2.5 sm:gap-x-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4 relative bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" style={{borderRadius: '45px'}}>
            <div className="flex items-center gap-2 sm:gap-x-4 sm:gap-y-2 flex-1 sm:w-auto min-w-0">
              <p className="text-xs sm:text-sm/6 text-white relative z-10 truncate">
                <strong className="font-semibold">GeneriCon 2023</strong><svg viewBox="0 0 2 2" aria-hidden="true" className="mx-1 sm:mx-2 inline size-0.5 fill-current"><circle r="1" cx="1" cy="1" /></svg>Join us in Denver from June 7 – 9 to see what's coming next.
              </p>
              <a href="#" className="flex-none rounded-full bg-white px-2 py-1 sm:px-3.5 sm:py-1 text-xs sm:text-sm font-semibold text-gray-900 shadow-lg hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white relative z-10 transition-all duration-200 hover:scale-105 whitespace-nowrap">Register now <span aria-hidden="true">&rarr;</span></a>
            </div>
            <button 
              type="button" 
              className="-m-1.5 flex-none p-1.5 relative z-10 hover:bg-white/10 rounded-full transition-colors duration-200"
              onClick={() => setIsBottomBannerVisible(false)}
            >
              <span className="sr-only">Dismiss</span>
              <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 text-white">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

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
            <img src="/Logo_header.png" alt="Zertmanufaktur" className="h-9" />
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
            <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">&copy; 2024 Zertmanufaktur. Eine Marke der Cert & Consulting SIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 