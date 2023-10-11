import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Cookie from './cookie'
import { type } from 'os'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Snittkalkulator for studenter',
  description: 'Regn ut snittet ditt på en enkel måte',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
      <Cookie />
    </html>
  )
}
