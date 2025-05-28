"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { LazyVideo } from "@/components/ui/lazy-video"
import { fetchMediaAssets, getVideoByName, getImageByName } from "@/lib/media-api"
import { LANDING_MEDIA } from "@/data/landing-media"
import type { StrapiMediaGroup } from "@/lib/media-api"

export function VideoSection() {
  const [showVideo, setShowVideo] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [mediaAssets, setMediaAssets] = useState<StrapiMediaGroup[]>([])

  useEffect(() => {
    async function loadMedia() {
      try {
        const assets = await fetchMediaAssets()
        setMediaAssets(assets)
      } catch (error) {
        console.error("Failed to load media assets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMedia()
  }, [])

  useEffect(() => {
    const checkConnection = () => {
      if ("connection" in navigator) {
        const connection = (navigator as any).connection

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
        setShowVideo(true)
      }
    }

    checkConnection()

    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      connection.addEventListener("change", checkConnection)

      return () => {
        connection.removeEventListener("change", checkConnection)
      }
    }
  }, [])

  const desktopVideo = getVideoByName(mediaAssets, LANDING_MEDIA.video.desktop)
  const mobileVideo = getVideoByName(mediaAssets, LANDING_MEDIA.video.mobile)
  const desktopPoster = getImageByName(mediaAssets, LANDING_MEDIA.video.posterDesktop)
  const mobilePoster = getImageByName(mediaAssets, LANDING_MEDIA.video.posterMobile)

  if (isLoading) {
    return (
      <section className="relative w-full h-[80vh] min-h-[600px]">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </section>
    )
  }

  return (
    <section className="relative w-full h-[80vh] min-h-[600px]">
      {/* Mobile version */}
      <div className="block md:hidden w-full h-full">
        {showVideo && mobileVideo ? (
          <LazyVideo
            src={mobileVideo}
            poster={mobilePoster}
            aspectRatio="16/9"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full"
          />
        ) : (
          <Image
            src={mobilePoster || "/placeholder.svg"}
            alt="Tommy Hilfiger Collection Mobile"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Desktop version */}
      <div className="hidden md:block w-full h-full">
        {showVideo && desktopVideo ? (
          <LazyVideo
            src={desktopVideo}
            poster={desktopPoster}
            aspectRatio="16/9"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full"
          />
        ) : (
          <Image
            src={desktopPoster || "/placeholder.svg"}
            alt="Tommy Hilfiger Collection Desktop"
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    </section>
  )
}
