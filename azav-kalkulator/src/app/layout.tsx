import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zertmanufaktur - gefördert durchstarten',
  description: 'Professionelle Kalkulationen für AZAV-Maßnahmen mit Buch der Berufe und BDKS-Rahmen',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>
        {children}
      </body>
    </html>
  )
} 