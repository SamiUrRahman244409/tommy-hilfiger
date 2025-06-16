import type { Metadata } from "next"
import { CheckoutSuccessClient } from "./checkout-success-client"

export const metadata: Metadata = {
  title: "Order Confirmed - Tommy Hilfiger",
  description: "Your order has been successfully placed. Thank you for shopping with Tommy Hilfiger.",
  robots: "noindex, nofollow",
}

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessClient />
}
