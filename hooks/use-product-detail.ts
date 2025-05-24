"use client"

import { useState, useEffect } from "react"
import { getProducts } from "@/lib/strapi-api"
import type { Product } from "@/types"

interface UseProductDetailReturn {
  product: Product | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useProductDetail(slug: string): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get all products and find the one with matching slug
      const products = await getProducts()
      const foundProduct = products.find((p) => p.slug === slug)

      if (!foundProduct) {
        setError(`Product with slug "${slug}" not found`)
        setProduct(null)
      } else {
        setProduct(foundProduct)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product")
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const refetch = () => {
    fetchProduct()
  }

  return {
    product,
    loading,
    error,
    refetch,
  }
}
