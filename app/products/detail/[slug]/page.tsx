"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailInfo } from "@/components/detail/product-detail-info"
import { ProductDetailCarousel } from "@/components/detail/product-detail-carousel"
import { ProductDetailQuickView } from "@/components/detail/product-detail-quick-view"
import { ZoomModal } from "@/components/detail/zoom-modal"
import { useProductDetail } from "@/hooks/use-product-detail"
import { useProducts } from "@/hooks/use-products"
import type { Product } from "@/types"
import { ProductsLoading } from "@/components/menu/products-loading"
import { ProductsError } from "@/components/menu/products-error"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ProductsLoading />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ProductsError error={error || "Product not found"} onRetry={refetch} />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Transform product data to match ProductDetailInfo expectations
  const productImages = product.images?.map((src, index) => ({
    src,
    alt: `${product.name} - Image ${index + 1}`,
  })) || [{ src: product.image, alt: product.name }]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className={`flex-1 py-8 ${quickViewOpen ? "filter blur-sm" : ""}`}>
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
      </main>

      <Footer isBlurred={quickViewOpen} />

      <ProductDetailQuickView isOpen={quickViewOpen} product={selectedProduct} onClose={closeQuickView} />

      <ZoomModal isOpen={zoomModalOpen} imageSrc={zoomedImageSrc} onClose={closeZoomModal} />
    </div>
  )
}
