import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/sonner"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "@/styles/globals.css"

import { ThemeProvider } from "@/components/ui/theme"

export const metadata: Metadata = {
  metadataBase: new URL('https://sharefast.me'),
  title: 'Share Files Fast',
  description: 'Fast Sharing with Unforgettable Links.',
  openGraph: {
    title: 'Share Files Fast',
    description: 'Fast Sharing with Unforgettable Links.',
    images: '/background.png',
    locale: 'en_US',
    url: 'https://sharefast.me',
    type: 'website'
  },
  icons: {
    icon: '/icon.png'
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <div className="flex flex-col justify-between min-h-screen gap-10">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </div>
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}