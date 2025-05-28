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
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const loadedImages = useRef<Set<string>>(new Set())

  const containerStyle = aspectRatio ? { aspectRatio } : {}

  // Fallback to a working placeholder if src is invalid
  const imageSrc = src && src.trim() !== "" ? src : "/placeholder.svg?height=800&width=600"

  useEffect(() => {
    // If we've already loaded this image before, show it immediately
    if (loadedImages.current.has(imageSrc)) {
      setIsLoaded(true)
      return
    }

    setIsLoaded(false)
    setHasError(false)
  }, [imageSrc])

  const handleImageLoad = () => {
    setIsLoaded(true)
    setHasError(false)
    loadedImages.current.add(imageSrc)
  }

  const handleImageError = () => {
    setIsLoaded(false)
    setHasError(true)
  }

  return (
    <div className={cn("relative overflow-hidden bg-gray-200", className)} style={containerStyle}>
      {/* Skeleton loader - shown when not loaded and no error */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
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
            "transition-opacity duration-500 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0",
            fill ? "object-cover" : "w-full h-full object-cover",
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? "eager" : "lazy"}
          unoptimized={true}
        />
      </div>
    </div>
  )
}
