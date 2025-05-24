"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/types"

interface QuickViewModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
}

export function QuickViewModal({ isOpen, product, onClose }: QuickViewModalProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      // Apply styles to prevent layout shift
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`

      // Also apply to fixed elements that might be affected
      const header = document.querySelector("header")
      if (header && header.classList.contains("fixed")) {
        header.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      // Reset styles
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      const header = document.querySelector("header")
      if (header && header.classList.contains("fixed")) {
        header.style.paddingRight = ""
      }
    }

    return () => {
      // Cleanup
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      const header = document.querySelector("header")
      if (header && header.classList.contains("fixed")) {
        header.style.paddingRight = ""
      }
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Darkened background on left half */}
      <div className="w-1/2 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Quick view modal on right half */}
      <div className="w-1/2 bg-white h-full overflow-y-auto flex">
        {/* Left side - Vertically scrollable product images */}
        <div className="w-1/2 h-full overflow-y-auto scrollbar-hide border-r">
          <div className="flex flex-col">
            {product.images?.map((image: string, index: number) => (
              <div key={index} className="w-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  width={450}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm">Tommy Hilfiger</span>
            <button onClick={onClose} className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

          <div className="flex items-center space-x-2 mb-6">
            <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
            <span className="font-bold text-lg">${product.salePrice.toFixed(2)}</span>
            <span className="text-red-600 font-medium">
              {Math.round((1 - product.salePrice / product.price) * 100)}% off
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span>Color: {product.currentColor}</span>
            </div>
            <div className="flex space-x-2 mb-4">
              <button className="w-8 h-8 rounded-full bg-red-500 border-2 border-gray-300" aria-label="Red"></button>
              <button className="w-8 h-8 rounded-full bg-blue-900 border-2 border-gray-300" aria-label="Navy"></button>
              <button className="w-8 h-8 rounded-full bg-white border-2 border-gray-300" aria-label="White"></button>
              <button
                className="w-8 h-8 rounded-full bg-blue-200 border-2 border-gray-300"
                aria-label="Light Blue"
              ></button>
              <button className="w-8 h-8 rounded-full bg-gray-400 border-2 border-gray-300" aria-label="Gray"></button>
              <button className="w-8 h-8 rounded-full bg-green-500 border-2 border-black" aria-label="Green"></button>
              <button className="w-8 h-8 rounded-full bg-pink-200 border-2 border-gray-300" aria-label="Pink"></button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="border py-2 text-center hover:border-black">XS</button>
              <button className="border py-2 text-center hover:border-black">S</button>
              <button className="border py-2 text-center hover:border-black">M</button>
              <button className="border py-2 text-center hover:border-black">L</button>
              <button className="border py-2 text-center hover:border-black">XL</button>
              <button className="border py-2 text-center hover:border-black">XXL</button>
              <button className="border py-2 text-center hover:border-black">XXXL</button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <div className="w-24">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Qty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="flex-1 bg-black text-white rounded-none hover:bg-gray-800">Select A Size</Button>
          </div>

          <Button variant="outline" className="w-full rounded-none mb-4">
            View Full Product Details
          </Button>
        </div>
      </div>
    </div>
  )
}
