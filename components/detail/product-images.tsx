"use client"

import { Maximize2 } from "lucide-react"
import { LazyImage } from "@/components/ui/lazy-image"
import type { ProductImage } from "@/types"
import { useCallback, useEffect } from "react"

interface ProductImagesProps {
  productImages: ProductImage[]
  currentImage: number
  setCurrentImage: (index: number) => void
  onZoomImage: (imageSrc: string) => void
}

export function ProductImages({ productImages, currentImage, setCurrentImage, onZoomImage }: ProductImagesProps) {
  // Preload adjacent images for better UX
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
    }

    // Preload current, next, and previous images
    if (productImages[currentImage]) {
      preloadImage(productImages[currentImage].src)
    }
    if (productImages[currentImage + 1]) {
      preloadImage(productImages[currentImage + 1].src)
    }
    if (productImages[currentImage - 1]) {
      preloadImage(productImages[currentImage - 1].src)
    }
  }, [currentImage, productImages])

  const handleThumbnailClick = useCallback(
    (index: number) => {
      const targetPosition = index * 300
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
      setCurrentImage(index)
    },
    [setCurrentImage],
  )

  return (
    <div className="relative">
      {/* Image Navigation - Optimized thumbnails */}
      <div className="absolute left-4 top-32 z-10 flex flex-col space-y-2">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-16 h-16 border-2 ${
              currentImage === index ? "border-black" : "border-gray-200"
            } overflow-hidden transition-all duration-200 hover:border-gray-400`}
          >
            <LazyImage
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              aspectRatio="1/1"
              className="w-full h-full object-cover"
              sizes="64px"
              quality={60}
              priority={index === 0}
            />
          </button>
        ))}
      </div>

      {/* Main Images Container */}
      <div className="sticky top-0 flex flex-col space-y-4 pb-8">
        {productImages.map((image, index) => (
          <div key={index} className="w-full relative group" id={`product-image-${index}`}>
            <LazyImage
              src={image.src}
              alt={image.alt}
              width={600}
              height={800}
              aspectRatio="3/4"
              className="w-full object-contain"
              priority={index === 0} // Only first image has priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
            {/* Zoom button - only shown on hover */}
            <button
              className="absolute bottom-4 right-4 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => onZoomImage(image.src)}
              aria-label="Zoom image"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
