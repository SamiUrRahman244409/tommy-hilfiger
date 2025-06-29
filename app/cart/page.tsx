import { CartPageClient } from "./cart-page-client"
import type { Metadata } from "next"

// Static generation with revalidation - this is the key for SSG
export const revalidate = 21600 // 6 hours in seconds

// Generate metadata for cart page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Shopping Cart - Tommy Hilfiger",
    description:
      "Review your selected Tommy Hilfiger products and proceed to checkout. Free shipping on orders over $100.",
    keywords: "shopping cart, checkout, Tommy Hilfiger, purchase",
    robots: "noindex, nofollow", // Cart pages shouldn't be indexed
    openGraph: {
      title: "Shopping Cart - Tommy Hilfiger",
      description: "Review your selected products and proceed to checkout.",
      type: "website",
    },
  }
}

// This is now a static page that gets pre-generated at build time
export default function CartPage() {
  return <CartPageClient />
}
