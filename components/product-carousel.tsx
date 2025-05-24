"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/types"

interface ProductCarouselProps {
  title: string
  products: Product[]
  onProductClick: (product: Product) => void
}

export function ProductCarousel({ title, products, onProductClick }: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scrollCarousel("left")}
            className="p-2 rounded-full border hover:bg-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="p-2 rounded-full border hover:bg-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={carouselRef} className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
        {products.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-[240px]">
            <ProductCard product={product} onClick={() => onProductClick(product)} />
          </div>
        ))}
      </div>
    </div>
  )
}
