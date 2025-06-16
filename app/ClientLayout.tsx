"use client"

import type React from "react"
import { CartProvider } from "@/hooks/use-cart"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartSidebar } from "@/components/cart-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import type { Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartSidebar />
          <Toaster />
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//grounded-confidence-41a8f2f2aa.strapiapp.com" />
        <link rel="dns-prefetch" href="//grounded-confidence-41a8f2f2aa.media.strapiapp.com" />
        <link rel="dns-prefetch" href="//media.tommy.com" />
        <link rel="dns-prefetch" href="//usa.tommy.com" />
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://grounded-confidence-41a8f2f2aa.strapiapp.com" />
        <link rel="preconnect" href="https://grounded-confidence-41a8f2f2aa.media.strapiapp.com" />
        <link rel="preconnect" href="https://media.tommy.com" />
      </head>
      <body className="antialiased">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  )
}
