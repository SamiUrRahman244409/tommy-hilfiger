"use client"

import type React from "react"

import { ProductCard } from "./product-card"
import type { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
  visibleProducts: number
  hoveredProductId: number | null
  currentImageIndices: Record<number, number>
  onHover: (id: number | null) => void
  onImageChange: (id: number, direction: "prev" | "next", e: React.MouseEvent) => void
  onQuickView: (product: Product) => void
}

export function ProductGrid({
  products,
  visibleProducts,
  hoveredProductId,
  currentImageIndices,
  onHover,
  onImageChange,
  onQuickView,
}: ProductGridProps) {
  return (
    <div className="w-full pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, visibleProducts).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            hoveredProductId={hoveredProductId}
            currentImageIndices={currentImageIndices}
            onHover={onHover}
            onImageChange={onImageChange}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  )
}
