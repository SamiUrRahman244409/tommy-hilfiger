"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LazyVideoProps {
  src: string
  poster?: string
  className?: string
  aspectRatio?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}

export function LazyVideo({
  src,
  poster,
  className,
  aspectRatio = "16/9",
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
}: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden bg-gray-100", className)} style={{ aspectRatio }}>
      {/* Skeleton loader - shown when not loaded and no error */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Failed to load video</div>
        </div>
      )}

      {/* Video element */}
      {isInView && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          poster={poster}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(false)
            setHasError(true)
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}
