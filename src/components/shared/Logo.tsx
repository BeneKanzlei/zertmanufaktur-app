import Image from 'next/image'

interface LogoProps {
  size?: number
  className?: string
  showContainer?: boolean
}

export default function Logo({ size = 120, className = "h-16 w-auto", showContainer = true }: LogoProps) {
  const logoElement = (
    <Image 
      src="/Zertmanufaktur.svg" 
      alt="Zertmanufaktur Logo" 
      width={size} 
      height={size} 
      className={className}
    />
  )

  if (showContainer) {
    return (
      <div className="flex justify-center mb-8">
        {logoElement}
      </div>
    )
  }

  return logoElement
} 