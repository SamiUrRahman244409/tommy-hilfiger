"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Product } from "@/types"

export function useMenuLogic(allProducts: Product[] = []) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [visibleProducts, setVisibleProducts] = useState(8)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({})
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  // Initialize categories from URL params on mount (only once)
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      const categories = categoryParam.split(",").map((cat) => cat.toLowerCase())
      setSelectedCategories(categories)
    }
  }, []) // Empty dependency array - only run once on mount

  // Update URL when categories change (but not on initial load)
  const updateURL = useCallback((categories: string[]) => {
    const params = new URLSearchParams(window.location.search)

    if (categories.length > 0) {
      params.set("category", categories.join(","))
    } else {
      params.delete("category")
    }

    const newURL = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`

    // Use replace to avoid page reload and don't add to history for every filter change
    window.history.replaceState({}, "", newURL)
  }, [])

  // Filter products by category, size, and price
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        const categoryName = product.category?.toLowerCase() || ""

        return selectedCategories.some((category) => {
          switch (category) {
            case "men":
              // Include products with "men" or "male" BUT exclude any that contain women-related terms
              const hasMenKeywords = categoryName.includes("men") || categoryName.includes("male")
              const hasWomenKeywords =
                categoryName.includes("women") || categoryName.includes("female") || categoryName.includes("woman")
              return hasMenKeywords && !hasWomenKeywords
            case "women":
              // Include products with women-related terms (no exclusion logic)
              return categoryName.includes("women") || categoryName.includes("female") || categoryName.includes("woman")
            case "accessories":
              return categoryName.includes("accessories") || categoryName.includes("accessory")
            default:
              return false
          }
        })
      })
    }

    // Size filtering is DISABLED - sizes are hardcoded and don't affect products
    // The selectedSizes state is maintained for UI purposes only
    // if (selectedSizes.length > 0) {
    //   // This filtering is intentionally commented out
    //   filtered = filtered.filter((product) => {
    //     if (!product.ProductSize || product.ProductSize.length === 0) return false
    //     return product.ProductSize.some((size) => selectedSizes.includes(size.toUpperCase()))
    //   })
    // }

    // Filter by price (using original price without discount)
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        const price = product.price || 0
        return selectedPriceRanges.some((range) => {
          switch (range) {
            case "$0 - $25":
              return price >= 0 && price <= 25
            case "$25 - $50":
              return price > 25 && price <= 50
            case "$50 - $100":
              return price > 50 && price <= 100
            case "$100 - $200":
              return price > 100 && price <= 200
            case "$200+":
              return price > 200
            default:
              return true
          }
        })
      })
    }

    return filtered
  }, [allProducts, selectedCategories, selectedPriceRanges]) // Removed selectedSizes from dependencies

  // Initialize image indices when products change
  useEffect(() => {
    const initialIndices: Record<number, number> = {}
    filteredProducts.forEach((product) => {
      initialIndices[product.id] = 0
    })
    setCurrentImageIndices(initialIndices)
  }, [filteredProducts])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }, [])

  const closeQuickView = useCallback(() => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }, [])

  const openFilterSidebar = useCallback((filter?: string) => {
    setActiveFilter(filter || null)
    setIsFilterSidebarOpen(true)
  }, [])

  const closeFilterSidebar = useCallback(() => {
    setIsFilterSidebarOpen(false)
    setActiveFilter(null)
  }, [])

  const handleHover = useCallback((productId: number | null) => {
    setHoveredProductId(productId)
  }, [])

  const handleCategoryChange = useCallback(
    (categories: string[]) => {
      setSelectedCategories(categories)
      updateURL(categories)
      setVisibleProducts(8) // Reset visible products when category changes
    },
    [updateURL],
  )

  const handleImageChange = useCallback(
    (productId: number, direction: "prev" | "next", e: React.MouseEvent) => {
      e.stopPropagation()

      const product = filteredProducts.find((p) => p.id === productId)
      if (!product || !product.images || product.images.length <= 1) return

      setCurrentImageIndices((prev) => {
        const currentIndex = prev[productId] || 0
        const maxIndex = product.images.length - 1

        let newIndex: number
        if (direction === "next") {
          newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
        } else {
          newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1
        }

        return {
          ...prev,
          [productId]: newIndex,
        }
      })
    },
    [filteredProducts],
  )

  const handleSizeChange = useCallback((sizes: string[]) => {
    // Size filtering is DISABLED - just update state for UI consistency
    // This doesn't affect the actual product filtering
    setSelectedSizes(sizes)
  }, [])

  const handlePriceChange = useCallback((priceRanges: string[]) => {
    setSelectedPriceRanges(priceRanges)
  }, [])

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedPriceRanges([])
    setVisibleProducts(8)
    updateURL([])
  }, [updateURL])

  return {
    visibleProducts,
    quickViewProduct,
    isQuickViewOpen,
    hoveredProductId,
    isFilterSidebarOpen,
    activeFilter,
    selectedCategories,
    currentImageIndices,
    showBackToTop,
    filteredProducts,
    selectedSizes,
    selectedPriceRanges,
    openQuickView,
    closeQuickView,
    openFilterSidebar,
    closeFilterSidebar,
    handleHover,
    handleCategoryChange,
    handleImageChange,
    handleSizeChange,
    handlePriceChange,
    clearAllFilters,
  }
}
