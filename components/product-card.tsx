"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex-shrink-0 w-full">
      <div
        className="relative cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <Image
          src={product.src || "/placeholder.svg"}
          alt={product.alt}
          width={240}
          height={300}
          className="w-full h-auto"
        />
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 transition-opacity duration-200">
            <div className="text-center py-2 px-4 font-medium bg-white bg-opacity-80 w-full">Quick View</div>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm">{product.name}</p>
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
        <span className="font-bold">${product.salePrice.toFixed(2)}</span>
        <span className="text-red-600">{Math.round((1 - product.salePrice / product.price) * 100)}% off</span>
      </div>
    </div>
  )
}
