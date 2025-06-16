"use client"

import { useState, useCallback } from "react"
import { ProductDetailInfo } from "@/components/detail/product-detail-info"
import { ProductDetailCarousel } from "@/components/detail/product-detail-carousel"
import type { Product } from "@/types"

// Debounce utility for scroll events
function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number): T {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>()

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      setDebounceTimer(setTimeout(() => callback(...args), delay))
    },
    [callback, delay, debounceTimer],
  ) as T

  return debouncedCallback
}

interface Props {
  params: { slug: string }
  product: Product
  allProducts: Product[]
}

export default function ProductDetailPageClient({ params, product, allProducts }: Props) {
  // Pre-process related products
  const relatedProducts = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 8)

  const moreLikeThisProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 8)

  // Generate product images
  const productImages = product.images?.map((src, index) => ({
    src,
    alt: `${product.name} - Image ${index + 1}`,
  })) || [{ src: product.image, alt: product.name }]

  // Add structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images || [product.image],
    brand: {
      "@type": "Brand",
      name: "Tommy Hilfiger",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.salePrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      condition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Tommy Hilfiger",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "127",
    },
  }

  return (
    <>
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ProductDetailInfo product={product} productImages={productImages} />

          <ProductDetailCarousel title="More Like This" products={moreLikeThisProducts} />

          {relatedProducts.length > 0 && (
            <ProductDetailCarousel title={`More ${product.category} Products`} products={relatedProducts} />
          )}
        </div>
      </div>
    </>
  )
}
