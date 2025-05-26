import type React from "react"
import "@/app/globals.css"
import type { Viewport } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Tommy Hilfiger - Premium Fashion & Clothing | Official Store",
  icons: {
    icon: "/favicon.svg",
  },
  description:
    "Shop the latest Tommy Hilfiger collection. Premium fashion, clothing, and accessories for men, women, and kids. Free shipping on orders over $100.",
  generator: "v0.dev",
  keywords: "Tommy Hilfiger, fashion, clothing, premium, men, women, kids, accessories, official store",
  authors: [{ name: "Tommy Hilfiger" }],
  robots: "index, follow",
  openGraph: {
    title: "Tommy Hilfiger - Premium Fashion & Clothing",
    description: "Shop the latest Tommy Hilfiger collection. Premium fashion, clothing, and accessories.",
    type: "website",
    locale: "en_US",
    siteName: "Tommy Hilfiger",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tommy Hilfiger - Premium Fashion & Clothing",
    description: "Shop the latest Tommy Hilfiger collection. Premium fashion, clothing, and accessories.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
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
        {/* Preload removed to avoid early image loading */}
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  )
}
