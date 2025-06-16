"use client"

import { useState, useEffect, useCallback } from "react"
import type { Product } from "@/types"
import { getProductBySlug } from "@/lib/strapi-api"

interface UseProductDetailReturn {
  product: Product | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// In-memory cache for individual products
const productDetailCache = new Map<
  string,
  {
    data: Product
    timestamp: number
    ttl: number
  }
>()

const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export function useProductDetail(slug: string): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = useCallback(async () => {
    if (!slug) return

    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const cached = productDetailCache.get(slug)
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        setProduct(cached.data)
        setLoading(false)
        return
      }

      const fetchedProduct = await getProductBySlug(slug)

      if (fetchedProduct) {
        setProduct(fetchedProduct)
        // Cache the product
        productDetailCache.set(slug, {
          data: fetchedProduct,
          timestamp: Date.now(),
          ttl: CACHE_TTL,
        })
      } else {
        setError("Product not found")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch product"
      setError(errorMessage)
      console.error("Error fetching product:", err)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  // Cleanup cache on unmount
  useEffect(() => {
    return () => {
      // Clean up old cache entries
      const now = Date.now()
      for (const [key, value] of productDetailCache.entries()) {
        if (now - value.timestamp > value.ttl) {
          productDetailCache.delete(key)
        }
      }
    }
  }, [])

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  }
}
