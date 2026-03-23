import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} selection:bg-primary-container selection:text-on-primary min-h-screen p-4 md:p-8 antialiased`}>
        <div className="fixed inset-0 scanline-effect z-[100]"></div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 relative z-10">
          {children}
          {/* Floating Action Terminal */}
          <button className="fixed bottom-6 right-6 w-14 h-14 bg-primary border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 transition-all z-[110] group">
            <div className="font-black text-black text-xl group-hover:scale-110 transition-transform">&gt;_</div>
          </button>
        </div>
      </body>
    </html>
  )
}
