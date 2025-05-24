"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  aspectRatio?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  aspectRatio,
  priority = false,
  fill = false,
  sizes,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const loadedImages = useRef<Set<string>>(new Set())

  const containerStyle = aspectRatio ? { aspectRatio } : {}

  // Fallback to a working placeholder if src is invalid
  const imageSrc = src && src.trim() !== "" ? src : "/placeholder.svg?height=800&width=600"

  useEffect(() => {
    // Only reset loading state if the image source actually changed
    // and we haven't already loaded this image before
    if (loadedImages.current.has(imageSrc)) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setHasError(false)
  }, [imageSrc])

  const handleImageLoad = () => {
    setIsLoading(false)
    setHasError(false)
    loadedImages.current.add(imageSrc)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className={cn("relative overflow-hidden bg-gray-200", className)} style={containerStyle}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-sm text-center p-4">
            <div className="mb-2">📷</div>
            <div>Image unavailable</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      <div className={cn("relative w-full h-full")}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className={cn(
            "transition-all duration-500 ease-in-out transform",
            isLoading || hasError ? "opacity-0" : "opacity-100",
            fill ? "object-cover" : "w-full h-full object-cover",
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? "eager" : "lazy"}
          unoptimized={true} // Disable optimization for all images to ensure transitions work
        />
      </div>
    </div>
  )
}
