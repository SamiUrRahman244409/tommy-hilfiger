import type { Metadata } from "next"
import { CheckoutPageClient } from "@/components/checkout/checkout-page-client"

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

export default function CheckoutPage() {
  return <CheckoutPageClient />
}
