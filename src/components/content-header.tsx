import Link from 'next/link'

interface ContentHeaderProps {
  title: string
  timeRanges?: Array<{ label: string; href: string; active?: boolean }>
  actionButton?: {
    label: string
    href: string
    icon?: React.ReactNode
  }
}

export default function ContentHeader({ 
  title, 
  timeRanges = [
    { label: 'Letzte 7 Tage', href: '#', active: true },
    { label: 'Letzte 30 Tage', href: '#' },
    { label: 'Gesamt', href: '#' }
  ], 
  actionButton 
}: ContentHeaderProps) {
  return (
    <header className="pt-6 pb-4 sm:pb-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold text-gray-900">{title}</h1>
        <div className="order-last flex w-full gap-x-8 text-sm font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6">
          {timeRanges.map((range, index) => (
            <a 
              key={range.label}
              href={range.href} 
              className={range.active ? 'text-indigo-600' : 'text-gray-700'}
            >
              {range.label}
            </a>
          ))}
        </div>
        {actionButton && (
          <Link
            href={actionButton.href}
            className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {actionButton.icon && (
              <svg viewBox="0 0 20 20" fill="currentColor" className="-ml-1.5 size-5">
                <path d="M10.75 6.75a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
              </svg>
            )}
            {actionButton.label}
          </Link>
        )}
      </div>
    </header>
  )
} 