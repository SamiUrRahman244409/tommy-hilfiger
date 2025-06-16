"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { Product } from "@/types"
import { getProducts } from "@/lib/strapi-api"

interface UseProductsOptions {
  page?: number
  pageSize?: number
  category?: string
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  enableAutoRefresh?: boolean
  refreshInterval?: number
}

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
  refetch: () => Promise<void>
  loadMore: () => Promise<void>
  hasMore: boolean
  refreshData: () => Promise<void>
}

// In-memory cache for products
const productCache = new Map<
  string,
  {
    data: {
      products: Product[]
      pagination: any
    }
    timestamp: number
    ttl: number
  }
>()

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const {
    page = 1,
    pageSize = 25,
    category,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
    enableAutoRefresh = false,
    refreshInterval = 30000, // 30 seconds
  } = options

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    pageCount: 0,
    total: 0,
  })

  // Create cache key from options
  const cacheKey = useMemo(() => {
    return JSON.stringify({ page, pageSize, category, search, sortBy, sortOrder })
  }, [page, pageSize, category, search, sortBy, sortOrder])

  // Check cache first
  const getCachedData = useCallback(() => {
    const cached = productCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data
    }
    return null
  }, [cacheKey])

  // Set cache data
  const setCachedData = useCallback(
    (data: any) => {
      productCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl: CACHE_TTL,
      })
    },
    [cacheKey],
  )

  const fetchProducts = useCallback(
    async (loadMore = false) => {
      try {
        if (!loadMore) {
          setLoading(true)
        }
        setError(null)

        // Check cache first
        const cachedData = getCachedData()
        if (cachedData && !loadMore) {
          setProducts(cachedData.products)
          setPagination(cachedData.pagination)
          setLoading(false)
          return
        }

        const currentPage = loadMore ? pagination.page + 1 : page
        const fetchedData = await getProducts({
          page: currentPage,
          pageSize,
          category,
          search,
          sortBy,
          sortOrder,
        })

        if (loadMore) {
          // Append new products for infinite scroll
          setProducts((prev) => [...prev, ...fetchedData.products])
        } else {
          setProducts(fetchedData.products)
          // Cache the data
          setCachedData(fetchedData)
        }

        setPagination(fetchedData.pagination)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch products"
        setError(errorMessage)
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    },
    [page, pageSize, category, search, sortBy, sortOrder, getCachedData, setCachedData, pagination.page],
  )

  // Load more products (for infinite scroll)
  const loadMore = useCallback(async () => {
    if (pagination.page < pagination.pageCount) {
      await fetchProducts(true)
    }
  }, [fetchProducts, pagination.page, pagination.pageCount])

  // Refresh data (bypass cache)
  const refreshData = useCallback(async () => {
    productCache.delete(cacheKey)
    await fetchProducts()
  }, [cacheKey, fetchProducts])

  // Check if more products available
  const hasMore = useMemo(() => {
    return pagination.page < pagination.pageCount
  }, [pagination.page, pagination.pageCount])

  // Initial fetch
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Auto-refresh functionality
  useEffect(() => {
    if (!enableAutoRefresh) return

    const interval = setInterval(() => {
      refreshData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [enableAutoRefresh, refreshInterval, refreshData])

  // Cleanup cache on unmount
  useEffect(() => {
    return () => {
      // Clean up old cache entries
      const now = Date.now()
      for (const [key, value] of productCache.entries()) {
        if (now - value.timestamp > value.ttl) {
          productCache.delete(key)
        }
      }
    }
  }, [])

  return {
    products,
    loading,
    error,
    pagination,
    refetch: fetchProducts,
    loadMore,
    hasMore,
    refreshData,
  }
}
