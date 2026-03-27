import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { getDiscoveryIndex, getUIConfig } from '@/lib/content'
import ShellSwitcher from './ShellSwitcher'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'ARCIUM ATLAS | ECOSYSTEM_CORE',
  description: 'Educational hub about the Arcium ecosystem.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const discoveryItems = await getDiscoveryIndex()
  const ui = await getUIConfig()

  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} selection:bg-primary-container selection:text-on-primary min-h-screen antialiased`}>
        <ShellSwitcher discoveryItems={discoveryItems} ui={ui}>
          {children}
        </ShellSwitcher>
      </body>
    </html>
  )
}
