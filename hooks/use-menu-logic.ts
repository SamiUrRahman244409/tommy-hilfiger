"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Product } from "@/types"

export function useMenuLogic(allProducts: Product[] = []) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)

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
  const [selectedSortOption, setSelectedSortOption] = useState<string>("recommended")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")

  // Initialize from URL params only on mount and when URL actually changes
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const sortParam = searchParams.get("sort")
    const searchParam = searchParams.get("search")
    const typeParam = searchParams.get("type")

    const newCategories = categoryParam ? categoryParam.split(",").map((cat) => cat.toLowerCase()) : []
    const newSort = sortParam || "recommended"
    const newSearch = searchParam || ""
    const newType = typeParam?.toLowerCase() || ""

    // Use functional updates to avoid dependency issues
    setSelectedCategories((prev) => {
      const prevString = prev.join(",")
      const newString = newCategories.join(",")
      return prevString !== newString ? newCategories : prev
    })

    setSelectedSortOption((prev) => (prev !== newSort ? newSort : prev))
    setSearchQuery((prev) => (prev !== newSearch ? newSearch : prev))
    setSelectedType((prev) => (prev !== newType ? newType : prev))

    if (isInitialMount.current) {
      isInitialMount.current = false
      setVisibleProducts(8)
    }
  }, [searchParams])

  // Update URL function without dependencies on state
  const updateURL = useCallback(
    (params: {
      categories?: string[]
      sortOption?: string
      search?: string
      type?: string
    }) => {
      const urlParams = new URLSearchParams()

      if (params.categories && params.categories.length > 0) {
        urlParams.set("category", params.categories.join(","))
      }

      if (params.sortOption && params.sortOption !== "recommended") {
        urlParams.set("sort", params.sortOption)
      }

      if (params.search && params.search.trim()) {
        urlParams.set("search", params.search.trim())
      }

      if (params.type && params.type.trim()) {
        urlParams.set("type", params.type.trim())
      }

      const newURL = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`
      window.history.replaceState({}, "", newURL)
    },
    [],
  )

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by search query first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((product) => {
        const name = product.name?.toLowerCase() || ""
        const description = product.description?.toLowerCase() || ""
        const category = product.category?.toLowerCase() || ""

        return name.includes(query) || description.includes(query) || category.includes(query)
      })
    }

    // Filter by type (new/sale)
    if (selectedType) {
      filtered = filtered.filter((product) => {
        switch (selectedType) {
          case "new":
            return product.id > Math.max(...allProducts.map((p) => p.id)) * 0.7
          case "sale":
            // Show all items for sale section
            return true
          default:
            return true
        }
      })
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => {
        const categoryName = product.category?.toLowerCase() || ""

        return selectedCategories.some((category) => {
          switch (category) {
            case "men":
              const hasMenKeywords = categoryName.includes("men") || categoryName.includes("male")
              const hasWomenKeywords =
                categoryName.includes("women") || categoryName.includes("female") || categoryName.includes("woman")
              return hasMenKeywords && !hasWomenKeywords
            case "women":
              return categoryName.includes("women") || categoryName.includes("female") || categoryName.includes("woman")
            case "accessories":
              return (
                categoryName.includes("accessories") ||
                categoryName.includes("accessory") ||
                categoryName.includes("shoes") ||
                categoryName.includes("bag") ||
                categoryName.includes("belt") ||
                categoryName.includes("watch")
              )
            default:
              return false
          }
        })
      })
    }

    // Filter by price
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

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSortOption) {
        case "price-low-high":
          return (a.price || 0) - (b.price || 0)
        case "price-high-low":
          return (b.price || 0) - (a.price || 0)
        case "newest":
          return b.id - a.id
        case "recommended":
        default:
          return 0
      }
    })

    return sorted
  }, [allProducts, selectedCategories, selectedPriceRanges, selectedSortOption, searchQuery, selectedType])

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
      setVisibleProducts(8)
      // Get current values and update URL
      updateURL({
        categories,
        sortOption: selectedSortOption,
        search: searchQuery,
        type: selectedType,
      })
    },
    [updateURL],
  )

  const handleSortChange = useCallback(
    (sortOption: string) => {
      setSelectedSortOption(sortOption)
      updateURL({
        categories: selectedCategories,
        sortOption,
        search: searchQuery,
        type: selectedType,
      })
    },
    [updateURL],
  )

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query)
      setVisibleProducts(8)
      updateURL({
        categories: selectedCategories,
        sortOption: selectedSortOption,
        search: query,
        type: selectedType,
      })
    },
    [updateURL],
  )

  const handleTypeChange = useCallback(
    (type: string) => {
      setSelectedType(type)
      setVisibleProducts(8)
      updateURL({
        categories: selectedCategories,
        sortOption: selectedSortOption,
        search: searchQuery,
        type,
      })
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
    setSelectedSizes(sizes)
  }, [])

  const handlePriceChange = useCallback((priceRanges: string[]) => {
    setSelectedPriceRanges(priceRanges)
  }, [])

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedPriceRanges([])
    setSelectedSortOption("recommended")
    setSearchQuery("")
    setSelectedType("")
    setVisibleProducts(8)
    updateURL({
      categories: [],
      sortOption: "recommended",
      search: "",
      type: "",
    })
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
    selectedSortOption,
    searchQuery,
    selectedType,
    openQuickView,
    closeQuickView,
    openFilterSidebar,
    closeFilterSidebar,
    handleHover,
    handleCategoryChange,
    handleImageChange,
    handleSizeChange,
    handlePriceChange,
    handleSortChange,
    handleSearchChange,
    handleTypeChange,
    clearAllFilters,
  }
}
