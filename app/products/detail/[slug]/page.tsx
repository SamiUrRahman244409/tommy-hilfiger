"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ProductDetailInfo } from "@/components/detail/product-detail-info"
import { ProductDetailCarousel } from "@/components/detail/product-detail-carousel"
import { ProductDetailQuickView } from "@/components/detail/product-detail-quick-view"
import { ZoomModal } from "@/components/detail/zoom-modal"
import { useProductDetail } from "@/hooks/use-product-detail"
import { useProducts } from "@/hooks/use-products"
import type { Product } from "@/types"
import { ProductsError } from "@/components/menu/products-error"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Add this useEffect after the existing scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const { product, loading, error, refetch } = useProductDetail(slug)
  const { products: allProducts } = useProducts() // For "More Like This" section

  const [currentImage, setCurrentImage] = useState(0)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)
  const [zoomedImageSrc, setZoomedImageSrc] = useState("")

  // Reset current image when product changes
  useEffect(() => {
    setCurrentImage(0)
  }, [product])

  useEffect(() => {
    // Add scroll event listener to track which images are visible
    const handlePageScroll = () => {
      const scrollPosition = window.scrollY

      // Determine which image is most visible based on scroll position
      if (scrollPosition < 300) {
        setCurrentImage(0)
      } else if (scrollPosition < 600) {
        setCurrentImage(1)
      } else if (scrollPosition < 900) {
        setCurrentImage(2)
      } else {
        setCurrentImage(3)
      }
    }

    window.addEventListener("scroll", handlePageScroll)
    return () => window.removeEventListener("scroll", handlePageScroll)
  }, [])

  const openQuickView = (selectedProduct: Product) => {
    setSelectedProduct(selectedProduct)
    setQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setQuickViewOpen(false)
    setSelectedProduct(null)
  }

  const openZoomModal = (imageSrc: string) => {
    setZoomedImageSrc(imageSrc)
    setZoomModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeZoomModal = () => {
    setZoomModalOpen(false)
    setZoomedImageSrc("")
    document.body.style.overflow = "auto"
  }

  // Filter out current product and get similar products
  const moreLikeThisProducts = allProducts.filter((p) => p.id !== product?.id).slice(0, 8) // Show 8 similar products

  if (loading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Product Detail Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>

              {/* Product Title */}
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
              </div>

              {/* Price */}
              <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4"></div>

              {/* Color Selector */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/6"></div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/6"></div>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-12 h-10 bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 animate-pulse rounded w-full"></div>
                <div className="h-12 bg-gray-200 animate-pulse rounded w-full"></div>
              </div>

              {/* Product Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-4/6"></div>
              </div>
            </div>
          </div>

          {/* More Like This Section Skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
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

  // Transform product data to match ProductDetailInfo expectations
  const productImages = product.images?.map((src, index) => ({
    src,
    alt: `${product.name} - Image ${index + 1}`,
  })) || [{ src: product.image, alt: product.name }]

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
