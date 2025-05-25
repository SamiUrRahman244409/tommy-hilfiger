"use client"

import type React from "react"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductColorSelector } from "./product-color-selector"
import { ProductSizeSelector } from "./product-size-selector"
import type { Product } from "@/types"

interface ProductQuickViewDetailsProps {
  product: Product
  selectedColor: string | null
  selectedSize: string | null
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
  onClose: () => void
  rightSideRef: React.RefObject<HTMLDivElement>
}

export function ProductQuickViewDetails({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  onClose,
  rightSideRef,
}: ProductQuickViewDetailsProps) {
  return (
    <div ref={rightSideRef} className="w-1/2 p-6 overflow-y-auto scrollbar-hide">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm">Tommy Hilfiger</span>
        <button onClick={onClose} className="p-1">
          <X className="h-5 w-5" />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-2">Regular Fit Short-Sleeve Oxford Shirt</h2>

      <div className="flex items-center space-x-2 mb-6">
        <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
        <span className="font-bold text-lg">${product.salePrice.toFixed(2)}</span>
        <span className="text-red-600 font-medium">
          {Math.round((1 - product.salePrice / product.price) * 100)}% off
        </span>
      </div>

      <ProductColorSelector />

      <ProductSizeSelector selectedSize={selectedSize} onSizeChange={onSizeChange} variant="sidebar" />

      <div className="flex items-center space-x-2 mb-6">
        <div className="w-24">
          <Select defaultValue="1">
            <SelectTrigger className="border-gray-300">
              <div className="flex items-center">
                <span className="mr-2">Qty</span>
                <SelectValue />
              </div>
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
        <Button className="flex-1 bg-black text-white rounded-none hover:bg-gray-800">
          Add To Bag - ${product.salePrice.toFixed(2)}
        </Button>
      </div>

      <Button variant="outline" className="w-full rounded-none mb-4 border-black">
        View Full Product Details
      </Button>
    </div>
  )
}
