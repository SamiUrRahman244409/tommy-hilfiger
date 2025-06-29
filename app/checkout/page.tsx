import type { Metadata } from "next"
import { CheckoutPageClient } from "@/components/checkout/checkout-page-client"

// Static generation with revalidation - this is the key for SSG
export const revalidate = 21600 // 6 hours in seconds

// Generate metadata for checkout page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Checkout - Tommy Hilfiger",
    description: "Complete your Tommy Hilfiger purchase with secure checkout. Multiple payment options available.",
    keywords: "checkout, payment, secure, Tommy Hilfiger",
    robots: "noindex, nofollow", // Checkout pages shouldn't be indexed
    openGraph: {
      title: "Secure Checkout - Tommy Hilfiger",
      description: "Complete your purchase with secure checkout.",
      type: "website",
    },
  }
}

// This is now a static page that gets pre-generated at build time
export default function CheckoutPage() {
  return <CheckoutPageClient />
}
