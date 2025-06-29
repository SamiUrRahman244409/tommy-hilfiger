import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/hooks/use-cart"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 relative">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
