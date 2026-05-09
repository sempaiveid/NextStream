import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'NextStream',
  description: 'Your personal streaming catalog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-12 bg-bg-base border-b border-border-subtle">
      <span className="text-2xl font-black text-brand tracking-tight">
        NEXTSTREAM
      </span>
    </header>
  )
}