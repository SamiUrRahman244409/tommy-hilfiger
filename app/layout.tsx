import type React from "react"
import "@/app/globals.css"

export const metadata = {
  title: "Hilfiger 1985 Logo T-Shirt | Tommy Hilfiger",
  description: "Shop the iconic Hilfiger 1985 Logo T-Shirt at Tommy Hilfiger. Free shipping on orders over $100.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
