import { CartPageClient } from "./cart-page-client"
import type { Metadata } from "next"
import { STATIC_REVALIDATE_TIME } from "@/lib/strapi-api"

// Static generation with revalidation
export const revalidate = STATIC_REVALIDATE_TIME // 6 hours

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

export default function CartPage() {
  return <CartPageClient />
}
