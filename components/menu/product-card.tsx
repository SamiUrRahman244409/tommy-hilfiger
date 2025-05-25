"use client"

import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LazyImage } from "@/components/ui/lazy-image"
import type { Product } from "@/types"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
  hoveredProductId: number | null
  currentImageIndices: Record<number, number>
  onHover: (id: number | null) => void
  onImageChange: (id: number, direction: "prev" | "next", e: React.MouseEvent, images: string[]) => void
  onQuickView: (product: Product) => void
}

export function ProductCard({
  product,
  hoveredProductId,
  currentImageIndices,
  onHover,
  onImageChange,
  onQuickView,
}: ProductCardProps) {
  const router = useRouter()
  const productIndex = currentImageIndices[product.id] || 0
  const isHovered = hoveredProductId === product.id
  const [currentSrc, setCurrentSrc] = useState(product.image)

  // Update current image source when index changes or when hovering
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setCurrentSrc(product.images[productIndex] || product.image)
    } else {
      setCurrentSrc(product.image)
    }
  }, [productIndex, product.images, product.image])

  // Auto-switch to second image on hover if available
  useEffect(() => {
    if (isHovered && product.images && product.images.length > 1) {
      if (productIndex === 0) {
        const timer = setTimeout(() => {
          onImageChange(
            product.id,
            "next",
            { stopPropagation: () => {}, preventDefault: () => {} } as React.MouseEvent,
            product.images || [],
          )
        }, 300)
        return () => clearTimeout(timer)
      }
    } else if (!isHovered && productIndex > 0) {
      const timer = setTimeout(() => {
        onImageChange(
          product.id,
          "prev",
          { stopPropagation: () => {}, preventDefault: () => {} } as React.MouseEvent,
          product.images || [],
        )
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isHovered, product.id, product.images, productIndex, onImageChange])

  const handleCardClick = () => {
    router.push(`/products/detail/${product.slug}`)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView(product)
  }

  const handleImageNavigation = (direction: "prev" | "next", e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onImageChange(product.id, direction, e, product.images || [])
  }

  return (
    <div className="flex flex-col">
      <div
        className="relative mb-2 flex-grow cursor-pointer"
        onMouseEnter={() => onHover(product.id)}
        onMouseLeave={() => onHover(null)}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <LazyImage
            src={currentSrc}
            alt={product.name}
            width={400}
            height={500}
            aspectRatio="4/5"
            className="w-full"
          />

          {isHovered && (
            <>
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-sm z-20 transition-opacity duration-200 hover:bg-white"
                    onClick={(e) => handleImageNavigation("prev", e)}
                    aria-label={`View previous image of ${product.name}`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-sm z-20 transition-opacity duration-200 hover:bg-white"
                    onClick={(e) => handleImageNavigation("next", e)}
                    aria-label={`View next image of ${product.name}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/5 transition-opacity duration-300 pointer-events-none">
                <button
                  onClick={handleQuickView}
                  className="bg-white py-2 px-6 font-medium shadow-md rounded-sm transition-transform duration-200 hover:scale-105 pointer-events-auto"
                >
                  Quick View
                </button>
              </div>

              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
                  {product.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-6 h-1 rounded-full transition-all duration-300 ${
                        productIndex === index ? "bg-black w-8" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="text-sm font-medium hover:underline cursor-pointer" onClick={handleCardClick}>
          {product.name}
        </h2>
        <div className="flex items-center mt-1">
          <span className="text-sm line-through mr-2">${product.price.toFixed(2)}</span>
          <span className="text-sm font-medium">${product.salePrice.toFixed(2)}</span>
          <span className="text-sm text-red-600 ml-2">{product.discount}</span>
        </div>
      </div>
    </div>
  )
}
