"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { Product } from "@/types"

export function useMenuLogic(allProducts: Product[] = []) {
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({})
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!activeCategory) return allProducts

    return allProducts.filter((product) => {
      const categoryName = product.category?.toLowerCase() || ""

      switch (activeCategory) {
        case "men":
          return categoryName.includes("men") || categoryName.includes("male")
        case "women":
          return categoryName.includes("women") || categoryName.includes("female") || categoryName.includes("woman")
        case "accessories":
          return categoryName.includes("accessories") || categoryName.includes("accessory")
        default:
          return true
      }
    })
  }, [allProducts, activeCategory])

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

  const handleCategoryChange = useCallback((category: string | null) => {
    setActiveCategory(category)
    setVisibleProducts(8) // Reset visible products when category changes
  }, [])

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

  return {
    visibleProducts,
    quickViewProduct,
    isQuickViewOpen,
    hoveredProductId,
    isFilterSidebarOpen,
    activeFilter,
    activeCategory,
    currentImageIndices,
    showBackToTop,
    filteredProducts,
    openQuickView,
    closeQuickView,
    openFilterSidebar,
    closeFilterSidebar,
    handleHover,
    handleCategoryChange,
    handleImageChange,
  }
}
