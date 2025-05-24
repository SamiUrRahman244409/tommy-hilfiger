"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { LazyVideo } from "@/components/ui/lazy-video"

export function VideoSection() {
  const [showVideo, setShowVideo] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check network connection
    const checkConnection = () => {
      // Check if Network Information API is supported
      if ("connection" in navigator) {
        const connection = (navigator as any).connection

        // If connection is 3g or slower, show only image
        if (
          connection.effectiveType === "3g" ||
          connection.effectiveType === "2g" ||
          connection.effectiveType === "slow-2g"
        ) {
          setShowVideo(false)
        } else {
          setShowVideo(true)
        }
      } else {
        // Fallback: assume good connection if API not supported
        setShowVideo(true)
      }
      setIsLoading(false)
    }

    checkConnection()

    // Listen for connection changes
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      connection.addEventListener("change", checkConnection)

      return () => {
        connection.removeEventListener("change", checkConnection)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <section className="relative w-full h-[80vh] min-h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </section>
    )
  }

  return (
    <section className="relative w-full h-[80vh] min-h-[600px]">
      {showVideo ? (
        <LazyVideo
          src="https://media.tommy.com/us/static/images/scheduled_marketing/video/20250521_HP_Tile05_Video_dt.mp4"
          poster="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_Tile05_Video_poster_dt.jpg"
          aspectRatio="16/9"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full"
        />
      ) : (
        <Image
          src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_Tile05_Video_poster_dt.jpg"
          alt="Tommy Hilfiger Collection"
          fill
          className="object-cover"
          priority
        />
      )}
    </section>
  )
}
