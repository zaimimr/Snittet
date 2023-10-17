import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Cookie from './cookie'
import Snackbar from '@/components/snackbar'
import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Snittkalkulator for studenter',
  description: 'Regn ut snittet ditt på en enkel måte',
  "google-adsense-account": "ca-pub-7050229813846454"
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const notifications = await sql.query(`SELECT * FROm global_message WHERE active = true`)
  const cookieStore = cookies()
  const read_message_toast = cookieStore.get("read_message_toast")?.value?.split("-")
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7050229813846454"
          crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
        <div className="fixed top-4 left-4 flex flex-col gap-4">

          {
            notifications.rows.map((notification: any, index: number) => {
              if (read_message_toast?.includes(`${notification.id}`)) return
              return (
                <Snackbar key={notification.id} id={notification.id} status={notification.status} message={notification.message} />
              )
            })
          }
        </div>
      </body>
      <Cookie />

    </html>
  )
}
