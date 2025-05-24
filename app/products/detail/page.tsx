"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailInfo } from "@/components/detail/product-detail-info"
import { ProductDetailCarousel } from "@/components/detail/product-detail-carousel"
import { ProductDetailQuickView } from "@/components/detail/product-detail-quick-view"
import { ZoomModal } from "@/components/detail/zoom-modal"
import type { Product } from "@/types"
import { productImages, moreLikeThisProducts } from "@/data/products"

export default function ProductDetailPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)
  const [zoomedImageSrc, setZoomedImageSrc] = useState("")

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

  const openQuickView = (product: Product) => {
    setSelectedProduct(product)
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className={`flex-1 py-8 ${quickViewOpen ? "filter blur-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ProductDetailInfo
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
