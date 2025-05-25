"use client";

import { Header } from '@/components/header'
import './globals.css'
import { Footer } from '@/components/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Inline critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
              .min-h-screen { min-height: 100vh; }
              .flex { display: flex; }
              .flex-col { flex-direction: column; }
              .flex-1 { flex: 1 1 0%; }
              header { position: sticky; top: 0; z-index: 50; background: white; border-bottom: 1px solid #e5e7eb; }
              footer { background: white; padding: 3rem 0; }
            `,
          }}
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
