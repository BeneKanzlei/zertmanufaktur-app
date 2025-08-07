import Image from 'next/image'

interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 120, className = "h-16 w-auto" }: LogoProps) {
  return (
    <div className="flex justify-center mb-8">
      <Image 
        src="/Logo_header.svg" 
        alt="Zertmanufaktur Logo" 
        width={size} 
        height={size} 
        className={className}
      />
    </div>
  )
} 