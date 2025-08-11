import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', showText = false, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-20 w-20',
    md: 'h-28 w-28',
    lg: 'h-32 w-32'
  }

  return (
    <Link href="/" className={`flex items-center pt-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src="/Zertmanufaktur.svg"
          alt="Zertmanufaktur Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className="text-3xl font-bold text-gray-950">AZAV Kalkulator</span>
      )}
    </Link>
  )
} 