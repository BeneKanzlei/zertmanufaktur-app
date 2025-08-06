import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex border-b border-gray-200 bg-white">
      <ol role="list" className="flex w-full justify-start space-x-4 px-4 sm:px-6 lg:px-8">
        {/* Home Icon */}
        <li className="flex">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-500">
              <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5 shrink-0">
                <path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <li key={index} className="flex">
            <div className="flex items-center">
              <svg viewBox="0 0 24 44" fill="currentColor" preserveAspectRatio="none" aria-hidden="true" className="h-full w-6 shrink-0 text-gray-200">
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              {item.current ? (
                <span 
                  aria-current="page" 
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href || '#'} 
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
} 