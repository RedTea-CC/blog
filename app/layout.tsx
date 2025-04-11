import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import '@/styles/mdx.css' // MDX styles

import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics } from '@next/third-parties/google'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'Red Tea - Personal website',
  description:
    'Personal website, using Nim. Nim is a free and open-source personal website template built with Next.js 15, React 19 and Motion-Primitives.',
  metadataBase: new URL('https://www.icetea.xin/'),
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-H55H8S6VZ2" />
    </html>
  )
}
