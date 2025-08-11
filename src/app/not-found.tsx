import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="grid min-h-full grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr]">
      <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
        <Link href="/">
          <span className="sr-only">Zertmanufaktur</span>
          <Image 
            src="/Zertmanufaktur.svg" 
            alt="Zertmanufaktur Logo" 
            width={120} 
            height={48} 
            className="h-10 w-auto sm:h-12" 
          />
        </Link>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="max-w-lg">
          <p className="text-base/8 font-semibold text-gray-900">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">Seite nicht gefunden</h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Entschuldigung, die gesuchte Seite konnte nicht gefunden werden.</p>
          <div className="mt-10 flex gap-4">
            <Link href="/" className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
              Zurück zur Startseite
            </Link>
            <Link href="/kontakt" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
              Kontakt
            </Link>
          </div>
        </div>
      </main>
      <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
        <div className="border-t border-gray-100 bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-4">
                <Image src="/Zertmanufaktur.svg" alt="Zertmanufaktur" width={100} height={30} className="h-8" />
                <div className="flex gap-4 text-sm text-gray-600">
                  <Link href="/kontakt" className="hover:text-gray-900">Kontakt</Link>
                  <Link href="/impressum" className="hover:text-gray-900">Impressum</Link>
                  <Link href="/datenschutz" className="hover:text-gray-900">Datenschutz</Link>
                </div>
              </div>
              <p className="text-sm text-gray-600">&copy; 2025 Zertmanufaktur SIA</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <Image 
          src="/Hintergrund_404.png" 
          alt="Hintergrundbild" 
          fill
          className="object-cover" 
        />
      </div>
    </div>
  )
}
