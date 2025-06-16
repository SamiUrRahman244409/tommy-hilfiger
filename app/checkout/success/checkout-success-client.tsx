"use client"

import { useEffect, useState } from "react"
import { Check, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CheckoutSuccessClient() {
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Order Number</h3>
                <p className="text-lg font-mono bg-gray-100 px-3 py-2 rounded">{orderNumber}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Order Date</h3>
                <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-3">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium">Confirmation Email</h3>
              </div>
              <p className="text-sm text-gray-600">
                A confirmation email with your order details has been sent to your email address.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-3">
                <Package className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="font-medium">Processing</h3>
              </div>
              <p className="text-sm text-gray-600">
                Your order is being prepared and will be shipped within 1-2 business days.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-3">
                <Truck className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium">Shipping</h3>
              </div>
              <p className="text-sm text-gray-600">You'll receive a tracking number once your order ships.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Link href="/menu">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800">Back to Home</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Need help? Contact our customer service at{" "}
            <a href="mailto:support@tommyhilfiger.com" className="text-blue-600 hover:underline">
              support@tommyhilfiger.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
