'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function UeberUnsPage() {
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
            <Link href="/features" className="text-sm/6 font-semibold text-white">Features</Link>
            <Link href="/services" className="text-sm/6 font-semibold text-white">Services</Link>
            <Link href="/ueber-uns" className="text-sm/6 font-semibold text-white">Über uns</Link>
            <Link href="/kontakt" className="text-sm/6 font-semibold text-white">Kontakt</Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isAuthenticated ? (
              <Link href="/dashboard" className="text-sm/6 font-semibold text-white">
                Dashboard <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <Link href="/login" className="text-sm/6 font-semibold text-white">
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

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Über uns</h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Zertmanufaktur SIA ist Ihr vertrauensvoller Partner für professionelle AZAV-Zertifizierungen. 
              Seit unserer Gründung verfolgen wir das Ziel, Bildungsträgern innovative Lösungen für ihre Weiterbildungsmaßnahmen zu bieten.
            </p>
          </div>
        </div>

        {/* Stat section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base/7 text-gray-300 lg:max-w-none lg:grid-cols-2">
              <div>
                <p>Zertmanufaktur SIA wurde mit der Vision gegründet, die komplexen Prozesse der AZAV-Zertifizierung zu vereinfachen. Wir verstehen die Herausforderungen, vor denen Bildungsträger stehen, wenn sie ihre Weiterbildungsmaßnahmen für die öffentliche Förderung qualifizieren möchten.</p>
                <p className="mt-8">Unser Expertenteam kombiniert tiefgreifendes Wissen über das deutsche Bildungssystem mit modernster Technologie, um Ihnen maßgeschneiderte Lösungen zu bieten. Von der ersten Kalkulation bis zur finalen Genehmigung begleiten wir Sie durch den gesamten Prozess.</p>
              </div>
              <div>
                <p>Mit unserer innovativen Plattform integrieren wir automatisch das Buch der Berufe und den BDKS-Rahmen in Ihre Kalkulationen. Dies garantiert nicht nur höchste Genauigkeit, sondern spart Ihnen auch wertvolle Zeit und Ressourcen.</p>
                <p className="mt-8">Unsere DSGVO-konforme Lösung bietet Ihnen die Sicherheit, die Sie benötigen, während unsere benutzerfreundliche Oberfläche sicherstellt, dass Sie sich auf das Wesentliche konzentrieren können: Ihre Teilnehmer und deren Erfolg.</p>
              </div>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
              <div className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                <dt className="text-base/7 text-gray-300">Unternehmen gegründet</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">2020</dd>
              </div>
              <div className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                <dt className="text-base/7 text-gray-300">Mitarbeiter im Team</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">25+</dd>
              </div>
              <div className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                <dt className="text-base/7 text-gray-300">Bildungsträger auf der Plattform</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">500+</dd>
              </div>
              <div className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                <dt className="text-base/7 text-gray-300">Erfolgreiche Zertifizierungen</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">2.500+</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80" alt="" className="aspect-9/4 w-full object-cover outline-1 -outline-offset-1 outline-white/10 xl:rounded-3xl" />
        </div>

        {/* Mission section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-base/7 font-semibold text-indigo-400">Unsere Mission</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Bildungsträger bei AZAV-Zertifizierungen unterstützen</h2>
              <p className="mt-6 text-xl/8 text-balance text-gray-300">Wir entwickeln innovative Lösungen, die Bildungsträgern helfen, ihre Weiterbildungsmaßnahmen erfolgreich für die öffentliche Förderung zu qualifizieren und dabei Zeit und Ressourcen zu sparen.</p>
            </div>
            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
              <div className="lg:pr-8">
                <h3 className="text-2xl font-semibold tracking-tight text-pretty text-white">Unsere Mission</h3>
                <p className="mt-6 text-base/7 text-gray-300">Zertmanufaktur SIA hat es sich zur Aufgabe gemacht, die komplexen Prozesse der AZAV-Zertifizierung zu vereinfachen. Wir glauben daran, dass jeder Bildungsträger die Möglichkeit haben sollte, seine Weiterbildungsmaßnahmen für die öffentliche Förderung zu qualifizieren, ohne dabei in bürokratischen Hürden zu ersticken.</p>
                <p className="mt-8 text-base/7 text-gray-300">Durch die Kombination von tiefgreifendem Fachwissen und modernster Technologie schaffen wir eine Plattform, die nicht nur präzise Kalkulationen ermöglicht, sondern auch den gesamten Zertifizierungsprozess transparent und nachvollziehbar macht. Unser Ziel ist es, Bildungsträgern dabei zu helfen, sich auf das zu konzentrieren, was wirklich wichtig ist: die Qualität ihrer Bildungsangebote.</p>
              </div>
              <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
                <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
                  <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-white/10">
                    <img src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?&auto=format&fit=crop&crop=center&w=560&h=560&q=90" alt="" className="block size-full object-cover" />
                  </div>
                  <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-white/10 lg:-mt-40">
                    <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?&auto=format&fit=crop&crop=left&w=560&h=560&q=90" alt="" className="block size-full object-cover" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-white/10">
                    <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?&auto=format&fit=crop&crop=left&w=560&h=560&q=90" alt="" className="block size-full object-cover" />
                  </div>
                  <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-white/10 lg:-mt-40">
                    <img src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?&auto=format&fit=crop&crop=center&w=560&h=560&q=90" alt="" className="block size-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="max-lg:mt-16 lg:col-span-1">
                <p className="text-base/7 font-semibold text-gray-400">Die Zahlen</p>
                <hr className="mt-6 border-t border-gray-700" />
                <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-700 pb-4">
                    <dt className="text-sm/6 text-gray-400">Investiert in Entwicklung</dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-white">€<span>2</span>M</dd>
                  </div>
                  <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-700 pb-4">
                    <dt className="text-sm/6 text-gray-400">Bildungsträger</dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-white"><span>500</span>+</dd>
                  </div>
                  <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-700 max-sm:pb-4">
                    <dt className="text-sm/6 text-gray-400">Abgeschlossene Zertifizierungen</dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-white"><span>2.5</span>K</dd>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <dt className="text-sm/6 text-gray-400">Zeitersparnis pro Antrag</dt>
                    <dd className="order-first text-6xl font-semibold tracking-tight text-white"><span>80</span>%</dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Unsere Werte</h2>
            <p className="mt-6 text-lg/8 text-gray-300">Diese Grundsätze leiten unser Handeln und prägen unsere Beziehungen zu Kunden, Partnern und der Gesellschaft.</p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-gray-400 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <svg viewBox="0 0 20 20" fill="currentColor" className="absolute top-1 left-1 size-5 text-indigo-500">
                  <path d="M4.606 12.97a.75.75 0 0 1-.134 1.051 2.494 2.494 0 0 0-.93 2.437 2.494 2.494 0 0 0 2.437-.93.75.75 0 1 1 1.186.918 3.995 3.995 0 0 1-4.482 1.332.75.75 0 0 1-.461-.461 3.994 3.994 0 0 1 1.332-4.482.75.75 0 0 1 1.052.134Z" clipRule="evenodd" fillRule="evenodd" />
                  <path d="M5.752 12A13.07 13.07 0 0 0 8 14.248v4.002c0 .414.336.75.75.75a5 5 0 0 0 4.797-6.414 12.984 12.984 0 0 0 5.45-10.848.75.75 0 0 0-.735-.735 12.984 12.984 0 0 0-10.849 5.45A5 5 0 0 0 1 11.25c.001.414.337.75.751.75h4.002ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Höchste Qualität.
              </dt>
              <dd className="inline">Wir streben in allem, was wir tun, nach Exzellenz und setzen dabei auf bewährte Methoden und innovative Lösungen.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <svg viewBox="0 0 20 20" fill="currentColor" className="absolute top-1 left-1 size-5 text-indigo-500">
                  <path d="M11 2a1 1 0 1 0-2 0v6.5a.5.5 0 0 1-1 0V3a1 1 0 1 0-2 0v5.5a.5.5 0 0 1-1 0V5a1 1 0 1 0-2 0v7a7 7 0 1 0 14 0V8a1 1 0 1 0-2 0v3.5a.5.5 0 0 1-1 0V3a1 1 0 1 0-2 0v5.5a.5.5 0 0 1-1 0V2Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
                Verantwortung übernehmen.
              </dt>
              <dd className="inline">Wir stehen zu unseren Versprechen und übernehmen die Verantwortung für die Qualität unserer Dienstleistungen und deren Auswirkungen.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <svg viewBox="0 0 20 20" fill="currentColor" className="absolute top-1 left-1 size-5 text-indigo-500">
                  <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                </svg>
                Unterstützend sein.
              </dt>
              <dd className="inline">Wir unterstützen unsere Kunden und Partner aktiv dabei, ihre Ziele zu erreichen und Herausforderungen zu meistern.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <svg viewBox="0 0 20 20" fill="currentColor" className="absolute top-1 left-1 size-5 text-indigo-500">
                  <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
                </svg>
                Ausgewogenheit genießen.
              </dt>
              <dd className="inline">Wir fördern eine gesunde Work-Life-Balance und schaffen eine Umgebung, in der sich unsere Mitarbeiter entfalten können.</dd>
            </div>
          </dl>
        </div>

        {/* Team section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Unser Team</h2>
            <p className="mt-6 text-lg/8 text-gray-400">Wir sind ein dynamisches Team von Experten, die leidenschaftlich daran arbeiten, Bildungsträgern innovative Lösungen für ihre AZAV-Zertifizierungen zu bieten.</p>
          </div>
          <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
            <li>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">Dr. Sarah Weber</h3>
              <p className="text-base/7 text-gray-300">Geschäftsführerin</p>
              <p className="text-sm/6 text-gray-500">München, Deutschland</p>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">Michael Schmidt</h3>
              <p className="text-base/7 text-gray-300">Technischer Leiter</p>
              <p className="text-sm/6 text-gray-500">Berlin, Deutschland</p>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">David Wagner</h3>
              <p className="text-base/7 text-gray-300">Business Development</p>
              <p className="text-sm/6 text-gray-500">Köln, Deutschland</p>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">Lisa Müller</h3>
              <p className="text-base/7 text-gray-300">Frontend-Entwicklerin</p>
              <p className="text-sm/6 text-gray-500">Hamburg, Deutschland</p>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">Claudia Bauer</h3>
              <p className="text-base/7 text-gray-300">UX-Designerin</p>
              <p className="text-sm/6 text-gray-500">Stuttgart, Deutschland</p>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">Thomas Klein</h3>
              <p className="text-base/7 text-gray-300">Produktmanager</p>
              <p className="text-sm/6 text-gray-500">Düsseldorf, Deutschland</p>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">Petra Schulz</h3>
              <p className="text-base/7 text-gray-300">Content Managerin</p>
              <p className="text-sm/6 text-gray-500">Frankfurt, Deutschland</p>
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" className="aspect-14/13 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10" />
              <h3 className="mt-6 text-lg/8 font-semibold tracking-tight text-white">Lars Hoffmann</h3>
              <p className="text-base/7 text-gray-300">Senior Entwickler</p>
              <p className="text-sm/6 text-gray-500">Leipzig, Deutschland</p>
            </li>
          </ul>
        </div>

        {/* CTA section */}
        <div className="relative isolate -z-10 mt-32 sm:mt-40">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/3 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <img src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="" className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm" />
              <div className="w-full flex-auto">
                <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Werden Sie Teil unseres Teams</h2>
                <p className="mt-6 text-lg/8 text-pretty text-gray-400">Suchen Sie nach einer spannenden Herausforderung in der Bildungsbranche? Wir sind immer auf der Suche nach talentierten Menschen, die unsere Mission unterstützen möchten.</p>
                <ul role="list" className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7 text-gray-200 sm:grid-cols-2">
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-5 flex-none text-gray-200">
                      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    Wettbewerbsfähige Gehälter
                  </li>
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-5 flex-none text-gray-200">
                      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    Flexible Arbeitszeiten
                  </li>
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-5 flex-none text-gray-200">
                      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    30 Tage bezahlter Urlaub
                  </li>
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-5 flex-none text-gray-200">
                      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    Jährliche Team-Events
                  </li>
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-5 flex-none text-gray-200">
                      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    Vorteile für Sie und Familie
                  </li>
                  <li className="flex gap-x-3">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-7 w-5 flex-none text-gray-200">
                      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                    Tolle Arbeitsumgebung
                  </li>
                </ul>
                <div className="mt-10 flex">
                  <a href="#" className="text-sm/6 font-semibold text-indigo-400 hover:text-indigo-300">
                    Unsere Stellenangebote ansehen
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl">
            <div style={{clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"}} className="aspect-1318/752 w-329.5 flex-none bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img src="/Zertmanufaktur.svg" alt="Zertmanufaktur SIA" className="h-9" />
            <p className="text-sm/6 text-balance text-gray-400">Zertmanufaktur SIA macht die Welt der AZAV-Zertifizierungen einfacher und effizienter durch innovative Technologie.</p>
            <div className="flex gap-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">X</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">YouTube</span>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
                  <path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" fillRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-white">Lösungen</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm/6 text-gray-400 hover:text-gray-300">Bildungsträger</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm/6 text-gray-400 hover:text-gray-300">Bildungsmaßnahmen</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm/6 text-gray-400 hover:text-gray-300">Solopreneur Förderung</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm/6 text-gray-400 hover:text-gray-300">BAFA Beratung</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm/6 text-gray-400 hover:text-gray-300">Förderungen nutzen</a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm/6 text-gray-400 hover:text-gray-300">Dokumentation</a>
                  </li>
                  <li>
                    <a href="/kontakt" className="text-sm/6 text-gray-400 hover:text-gray-300">Kontakt</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-white">Unternehmen</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="/ueber-uns" className="text-sm/6 text-gray-400 hover:text-gray-300">Über uns</a>
                  </li>
                  <li>
                    <a href="#" className="text-sm/6 text-gray-400 hover:text-gray-300">Blog</a>
                  </li>
                  <li>
                    <a href="/kontakt" className="text-sm/6 text-gray-400 hover:text-gray-300">Kontakt</a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">Rechtliches</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="/nutzungsbedingungen" className="text-sm/6 text-gray-400 hover:text-gray-300">Nutzungsbedingungen</a>
                  </li>
                  <li>
                    <a href="/datenschutz" className="text-sm/6 text-gray-400 hover:text-gray-300">Datenschutz</a>
                  </li>
                  <li>
                    <a href="/impressum" className="text-sm/6 text-gray-400 hover:text-gray-300">Impressum</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm/6 text-gray-400">&copy; 2025 Zertmanufaktur SIA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
} 