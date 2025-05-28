"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
  quality?: number
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
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority) // If priority, show immediately
  const imgRef = useRef<HTMLDivElement>(null)
  const loadedImages = useRef<Set<string>>(new Set())

  const containerStyle = aspectRatio ? { aspectRatio } : {}

  // Fallback to a working placeholder if src is invalid
  const imageSrc = src && src.trim() !== "" ? src : "/placeholder.svg?height=800&width=600"

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Start loading 50px before entering viewport
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  // Check if image was previously loaded
  useEffect(() => {
    if (loadedImages.current.has(imageSrc)) {
      setIsLoaded(true)
      setHasError(false)
      return
    }

    setIsLoaded(false)
    setHasError(false)
  }, [imageSrc])

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true)
    setHasError(false)
    loadedImages.current.add(imageSrc)
  }, [imageSrc])

  const handleImageError = useCallback(() => {
    setIsLoaded(false)
    setHasError(true)
  }, [])

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden bg-gray-200", className)} style={containerStyle}>
      {/* Skeleton loader - shown when not loaded and no error */}
      {!isLoaded && !hasError && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-sm text-center p-4">
            <div className="mb-2">📷</div>
            <div>Image unavailable</div>
          </div>
        </div>
      )}

      {/* Actual image - only render when in view or priority */}
      {(isInView || priority) && (
        <div className={cn("relative w-full h-full")}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            priority={priority}
            sizes={sizes}
            quality={quality}
            className={cn(
              "transition-opacity duration-300 ease-in-out",
              isLoaded ? "opacity-100" : "opacity-0",
              fill ? "object-cover" : "w-full h-full object-cover",
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={priority ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      )}
    </div>
  )
}
