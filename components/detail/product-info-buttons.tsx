"use client"

import { ChevronRight } from "lucide-react"

interface ProductInfoButtonsProps {
  openSidebar: (content: string) => void
}

export function ProductInfoButtons({ openSidebar }: ProductInfoButtonsProps) {
  return (
    <div className="space-y-2 border-t pt-6">
      <button
        onClick={() => openSidebar("product-details")}
        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <ChevronRight className="h-4 w-4 mr-3" />
          <span className="text-base font-medium">Product Details</span>
        </div>
      </button>

      <button
        onClick={() => openSidebar("shipping")}
        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <ChevronRight className="h-4 w-4 mr-3" />
          <span className="text-base font-medium">Shipping & Returns</span>
        </div>
      </button>

      <button
        onClick={() => openSidebar("reviews")}
        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <ChevronRight className="h-4 w-4 mr-3" />
          <span className="text-base font-medium">Reviews (93)</span>
        </div>
      </button>

      <button
        onClick={() => openSidebar("questions")}
        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <ChevronRight className="h-4 w-4 mr-3" />
          <span className="text-base font-medium">Questions & Answers (35)</span>
        </div>
      </button>
    </div>
  )
}
