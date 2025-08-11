'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function FeaturesPage() {
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
    <div className="bg-gray-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Zertmanufaktur</span>
              <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button 
              type="button" 
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/" className="text-sm/6 font-semibold text-gray-900">Home</Link>
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
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Zertmanufaktur</span>
                  <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur" className="h-8 w-auto" />
                </Link>
                <button 
                  type="button" 
                  className="-m-2.5 rounded-md p-2.5 text-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                      Home
                    </Link>
                    <Link href="/features" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                      Features
                    </Link>
                    <Link href="/services" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                      Services
                    </Link>
                    <Link href="/ueber-uns" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                      Über uns
                    </Link>
                    <Link href="/kontakt" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                      Kontakt
                    </Link>
                  </div>
                  <div className="py-6">
                    {isAuthenticated ? (
                      <Link href="/dashboard" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                        Dashboard
                      </Link>
                    ) : (
                      <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                        Anmelden
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="relative isolate">
        {/* Background */}
        <div aria-hidden="true" className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl">
          <div style={{clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"}} className="aspect-1108/632 w-277 flex-none bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25"></div>
        </div>

        {/* Hero section */}
        <div className="relative isolate overflow-hidden bg-white h-[calc(100vh-200px)]">
          <svg aria-hidden="true" className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200">
            <defs>
              <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" strokeWidth="0" />
          </svg>
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8 h-full">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 flex flex-col justify-center h-full">
              <div className="mb-8">
                <a href="#" className="inline-flex space-x-6">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/20 ring-inset">Neu</span>
                  <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                    <span>Jetzt verfügbar</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 text-gray-400">
                      <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  </span>
                </a>
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">Unsere Lösungen für Ihre Zukunft</h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Entdecken Sie unsere umfassenden Services für Bildungsträger, Berater und Solopreneure. Wir unterstützen Sie dabei, Förderungen optimal zu nutzen und Ihr Geschäft zu erweitern.</p>
              <div className="mt-10 flex items-center gap-x-6">
                <a href="#solutions" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lösungen entdecken</a>
                <a href="#contact" className="text-sm/6 font-semibold text-gray-900">Mehr erfahren <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="mx-auto flex max-w-2xl lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32 h-full items-center">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img width="2432" height="1442" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80" alt="Team bei der Arbeit" className="w-304 rounded-md bg-gray-50 shadow-xl ring-1 ring-gray-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Cloud Section */}
        <div className="bg-white h-[200px] flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <h2 className="text-center text-lg/8 font-semibold text-gray-900">Vertraut von den innovativsten Teams</h2>
            <div className="mx-auto mt-8 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" className="col-span-2 max-h-16 w-full object-contain lg:col-span-1" />
              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" className="col-span-2 max-h-16 w-full object-contain lg:col-span-1" />
              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" className="col-span-2 max-h-16 w-full object-contain lg:col-span-1" />
              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" className="col-span-2 max-h-16 w-full object-contain sm:col-start-2 lg:col-span-1" />
              <img width="158" height="48" src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" className="col-span-2 col-start-2 max-h-16 w-full object-contain sm:col-start-auto lg:col-span-1" />
            </div>
          </div>
        </div>

        {/* Lösungsbereiche */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Unsere Lösungsbereiche</h2>
              <p className="mt-2 text-lg/8 text-gray-600">Entdecken Sie unsere umfassenden Services für Ihre Geschäftsentwicklung.</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              
              {/* Marktvorteil durch geförderte Angebote nutzen */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40"></div>
                <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10"></div>

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                  <time dateTime="2024-01-15" className="mr-8">Jan 15, 2024</time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50">
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-6 flex-none rounded-full bg-white/10" />
                      Zertmanufaktur
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Marktvorteil durch geförderte Angebote nutzen
                  </a>
                </h3>
              </article>

              {/* BAFA Berater werden */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
                <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40"></div>
                <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10"></div>

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                  <time dateTime="2024-01-10" className="mr-8">Jan 10, 2024</time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50">
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-6 flex-none rounded-full bg-white/10" />
                      Zertmanufaktur
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    BAFA Berater werden
                  </a>
                </h3>
              </article>

              {/* Bildungsträger werden */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
                <img src="https://images.unsplash.com/photo-1523240798132-875193f9e2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40"></div>
                <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10"></div>

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                  <time dateTime="2024-01-05" className="mr-8">Jan 05, 2024</time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50">
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-6 flex-none rounded-full bg-white/10" />
                      Zertmanufaktur
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Bildungsträger werden
                  </a>
                </h3>
              </article>

              {/* Bildungsmaßnahmen bauen */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40"></div>
                <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10"></div>

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                  <time dateTime="2024-01-01" className="mr-8">Jan 01, 2024</time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50">
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-6 flex-none rounded-full bg-white/10" />
                      Zertmanufaktur
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Bildungsmaßnahmen bauen
                  </a>
                </h3>
              </article>

              {/* Solopreneur-Förderung (Kompass) */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40"></div>
                <div className="absolute inset-0 -z-10 rounded-2xl inset-ring inset-ring-gray-900/10"></div>

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                  <time dateTime="2023-12-28" className="mr-8">Dez 28, 2023</time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50">
                      <circle r="1" cx="1" cy="1" />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-6 flex-none rounded-full bg-white/10" />
                      Zertmanufaktur
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    Solopreneur-Förderung (Kompass) anbieten dürfen
                  </a>
                </h3>
              </article>

            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <p className="text-base/7 font-semibold text-indigo-600">Förderungen optimal nutzen</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Ihr Weg zum Erfolg</h1>
              <p className="mt-6 text-xl/8 text-gray-700">Entdecken Sie, wie Sie mit unseren Services Ihr Geschäft erweitern und neue Märkte erschließen können. Wir unterstützen Sie dabei, Förderungen optimal zu nutzen und Ihre Angebote marktfähig zu machen.</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
              <div className="relative lg:order-last lg:col-span-5">
                <svg aria-hidden="true" className="absolute -top-160 left-1 -z-10 h-256 w-702 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)] stroke-gray-900/10">
                  <defs>
                    <pattern id="e87443c8-56e4-4c20-9111-55b82fa704e3" width="200" height="200" patternUnits="userSpaceOnUse">
                      <path d="M0.5 0V200M200 0.5L0 0.499983" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)" strokeWidth="0" />
                </svg>
                <figure className="border-l border-indigo-600 pl-8">
                  <blockquote className="text-xl/8 font-semibold tracking-tight text-gray-900">
                    <p>"Dank der Unterstützung von Zertmanufaktur konnten wir unsere Bildungsangebote erfolgreich erweitern und neue Förderprogramme erschließen. Das hat unser Geschäft nachhaltig verändert."</p>
                  </blockquote>
                  <figcaption className="mt-8 flex gap-x-4">
                    <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="mt-1 size-10 flex-none rounded-full bg-gray-50" />
                    <div className="text-sm/6">
                      <div className="font-semibold text-gray-900">Sarah Müller</div>
                      <div className="text-gray-600">Bildungsträger</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className="max-w-xl text-base/7 text-gray-600 lg:col-span-7">
                <p>Unsere umfassenden Services helfen Ihnen dabei, Ihr Geschäft zu erweitern und neue Einnahmequellen zu erschließen. Von der Beantragung von Förderungen bis hin zur Entwicklung maßgeschneiderter Bildungsprogramme unterstützen wir Sie bei jedem Schritt.</p>
                <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600">
                      <path d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    <span><strong className="font-semibold text-gray-900">Schnelle Umsetzung.</strong> Wir unterstützen Sie dabei, Ihre Angebote schnell förderfähig zu machen und neue Märkte zu erschließen.</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600">
                      <path d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    <span><strong className="font-semibold text-gray-900">Sichere Förderungen.</strong> Wir helfen Ihnen dabei, die richtigen Förderprogramme zu identifizieren und erfolgreich zu beantragen.</span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600">
                      <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                      <path d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    <span><strong className="font-semibold text-gray-900">Maßgeschneiderte Lösungen.</strong> Wir entwickeln mit Ihnen individuelle Strategien, die zu Ihrem Geschäftsmodell passen.</span>
                  </li>
                </ul>
                <p className="mt-8">Unsere Expertise umfasst alle Bereiche der Bildungsförderung und Beratung. Von der ersten Idee bis zur erfolgreichen Umsetzung begleiten wir Sie durch den gesamten Prozess und stellen sicher, dass Sie die maximale Unterstützung erhalten.</p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Keine Erfahrung? Kein Problem.</h2>
                <p className="mt-6">Auch wenn Sie noch keine Erfahrung mit Bildungsförderungen haben, unterstützen wir Sie dabei, Ihre ersten Schritte zu machen. Unsere erfahrenen Berater helfen Ihnen dabei, die richtigen Entscheidungen zu treffen und Ihr Geschäft erfolgreich zu erweitern.</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
} 