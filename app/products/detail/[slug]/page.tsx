"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams } from "next/navigation"
import { ProductDetailInfo } from "@/components/detail/product-detail-info"
import { ProductDetailCarousel } from "@/components/detail/product-detail-carousel"
import { ProductDetailQuickView } from "@/components/detail/product-detail-quick-view"
import { ZoomModal } from "@/components/detail/zoom-modal"
import { useProductDetail } from "@/hooks/use-product-detail"
import { useProducts } from "@/hooks/use-products"
import { ProductDetailSkeleton } from "@/components/detail/product-detail-skeleton"
import type { Product } from "@/types"
import { ProductsError } from "@/components/menu/products-error"

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

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // Scroll to top on mount and slug change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const { product, loading, error, refetch } = useProductDetail(slug)
  const { products: allProducts } = useProducts()

  const [currentImage, setCurrentImage] = useState(0)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)
  const [zoomedImageSrc, setZoomedImageSrc] = useState("")

  // Reset current image when product changes
  useEffect(() => {
    setCurrentImage(0)
  }, [product])

  // Optimized scroll handler with debouncing
  const handlePageScroll = useCallback(() => {
    const scrollPosition = window.scrollY

    // Determine which image is most visible based on scroll position
    let newImageIndex = 0
    if (scrollPosition >= 900) {
      newImageIndex = 3
    } else if (scrollPosition >= 600) {
      newImageIndex = 2
    } else if (scrollPosition >= 300) {
      newImageIndex = 1
    }

    setCurrentImage(newImageIndex)
  }, [])

  const debouncedScrollHandler = useDebounce(handlePageScroll, 100)

  useEffect(() => {
    window.addEventListener("scroll", debouncedScrollHandler, { passive: true })
    return () => window.removeEventListener("scroll", debouncedScrollHandler)
  }, [debouncedScrollHandler])

  const openQuickView = useCallback((selectedProduct: Product) => {
    setSelectedProduct(selectedProduct)
    setQuickViewOpen(true)
  }, [])

  const closeQuickView = useCallback(() => {
    setQuickViewOpen(false)
    setSelectedProduct(null)
  }, [])

  const openZoomModal = useCallback((imageSrc: string) => {
    setZoomedImageSrc(imageSrc)
    setZoomModalOpen(true)
    document.body.style.overflow = "hidden"
  }, [])

  const closeZoomModal = useCallback(() => {
    setZoomModalOpen(false)
    setZoomedImageSrc("")
    document.body.style.overflow = "auto"
  }, [])

  // Memoize similar products to prevent unnecessary recalculations
  const moreLikeThisProducts = useMemo(() => {
    return allProducts.filter((p) => p.id !== product?.id).slice(0, 8)
  }, [allProducts, product?.id])

  // Memoize product images to prevent unnecessary recalculations
  const productImages = useMemo(() => {
    if (!product) return []
    return (
      product.images?.map((src, index) => ({
        src,
        alt: `${product.name} - Image ${index + 1}`,
      })) || [{ src: product.image, alt: product.name }]
    )
  }, [product])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error || !product) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ProductsError error={error || "Product not found"} onRetry={refetch} />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`py-8 ${quickViewOpen ? "filter blur-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ProductDetailInfo
            product={product}
            productImages={productImages}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            onZoomImage={openZoomModal}
          />

          <ProductDetailCarousel
            title="More Like This"
            products={moreLikeThisProducts}
            onProductClick={openQuickView}
          />
        </div>
      </div>

      <ProductDetailQuickView isOpen={quickViewOpen} product={selectedProduct} onClose={closeQuickView} />

      <ZoomModal isOpen={zoomModalOpen} imageSrc={zoomedImageSrc} onClose={closeZoomModal} />
    </>
  )
}
