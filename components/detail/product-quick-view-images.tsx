"use client"

import type React from "react"
import { LazyImage } from "@/components/ui/lazy-image"
import type { Product } from "@/types"

interface ProductQuickViewImagesProps {
  product: Product
  leftSideRef: React.RefObject<HTMLDivElement>
  onScroll: () => void
}

export function ProductQuickViewImages({ product, leftSideRef, onScroll }: ProductQuickViewImagesProps) {
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : Array(4).fill(product.images?.[0] || "/placeholder.svg")

  return (
    <div ref={leftSideRef} className="w-1/2 h-full overflow-y-auto scrollbar-hide" onScroll={onScroll}>
      <div className="flex flex-col">
        {galleryImages.map((image, index) => (
          <div key={index} className="w-full">
            <LazyImage
              src={image || "/placeholder.svg"}
              alt={`${product.name} - View ${index + 1}`}
              width={500}
              height={700}
              aspectRatio="5/7"
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
