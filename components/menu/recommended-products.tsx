"use client"

import type React from "react"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "./product-card"
import type { Product } from "@/types"

interface RecommendedProductsProps {
  products: Product[]
  hoveredProductId: number | null
  currentImageIndices: Record<number, number>
  onHover: (id: number | null) => void
  onImageChange: (id: number, direction: "prev" | "next", e: React.MouseEvent) => void
  onQuickView: (product: Product) => void
}

export function RecommendedProducts({
  products,
  hoveredProductId,
  currentImageIndices,
  onHover,
  onImageChange,
  onQuickView,
}: RecommendedProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return
    const cardWidth = 220 + 16
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <div className="w-full pb-16">
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">You May Also Like</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={containerRef} className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[220px]">
              <ProductCard
                product={product}
                hoveredProductId={hoveredProductId}
                currentImageIndices={currentImageIndices}
                onHover={onHover}
                onImageChange={onImageChange}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
