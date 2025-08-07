import Link from 'next/link'

interface BackButtonProps {
  href: string
  className?: string
}

export default function BackButton({ href, className = "flex items-center text-gray-600 hover:text-gray-900 transition-colors" }: BackButtonProps) {
  return (
    <div className="absolute top-6 left-6 z-10">
      <Link href={href} className={className}>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Zurück</span>
      </Link>
    </div>
  )
} 