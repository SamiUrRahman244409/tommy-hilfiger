"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function CartPageClient() {
  const router = useRouter()
  const { state, updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
  <div className="text-center max-w-md mx-auto">
    <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
    <p className="text-gray-500 mb-6">Add some items to get started</p>

    <Button asChild className="bg-black text-white hover:bg-gray-800">
      <Link href="/">
        <span className="flex items-center justify-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </span>
      </Link>
    </Button>
  </div>
</div>

    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {state.itemCount} item{state.itemCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-b-0">
                      {/* Product Image */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=120&width=120"}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="w-24 h-24 sm:w-30 sm:h-30 object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-2">
                          {item.color} | {item.size}
                        </p>

                        {/* Price */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                          {item.originalPrice && (
                            <span className="text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                          )}
                          <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start gap-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6 text-center">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(state.total * 0.08).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${(state.total + 10 + state.total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

           <div className="flex flex-col gap-4 w-full max-w-sm">
      <button
        onClick={() => router.push('/')}
        className="bg-white text-black border border-black px-4 py-2 rounded"
      >
        Continue Shopping
      </button>

      <button
        onClick={() => router.push('/checkout')}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Proceed
      </button>
    </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
