import { ReactNode } from 'react'
import BackButton from './BackButton'

interface AuthLayoutProps {
  children: ReactNode
  backHref?: string
  showBackButton?: boolean
}

export default function AuthLayout({ children, backHref = "/", showBackButton = true }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      {showBackButton && <BackButton href={backHref} />}
      
      <div className="flex w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {children}
        </div>
      </div>
      
      <div className="w-1/2">
        <img 
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" 
          alt="" 
          className="h-full w-full object-cover" 
        />
      </div>
    </div>
  )
} 