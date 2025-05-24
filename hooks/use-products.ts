"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types"
import { getProducts } from "@/lib/strapi-api"

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products"
      setError(errorMessage)
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  }
}
