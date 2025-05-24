"use client"

import { useState, useEffect } from "react"
import { ProductQuickViewModal } from "./product-quick-view-modal"
import { ProductQuickViewContent } from "./product-quick-view-content"
import type { Product } from "@/types"

interface ProductDetailQuickViewProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
}

export function ProductDetailQuickView({ isOpen, product, onClose }: ProductDetailQuickViewProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>("L")

  useEffect(() => {
    if (product) {
      setSelectedColor(product.currentColor || null)
    }
  }, [product])

  if (!isOpen || !product) return null

  return (
    <ProductQuickViewModal onClose={onClose}>
      <ProductQuickViewContent
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorChange={setSelectedColor}
        onSizeChange={setSelectedSize}
        onClose={onClose}
      />
    </ProductQuickViewModal>
  )
}
