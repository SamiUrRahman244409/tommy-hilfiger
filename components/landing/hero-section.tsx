"use client"

import { LazyImage } from "@/components/ui/lazy-image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchMediaAssets, getImageByName } from "@/lib/media-api"
import { LANDING_MEDIA } from "@/data/landing-media"
import type { StrapiMediaGroup } from "@/lib/media-api"

interface HeroSectionProps {
  isLoading?: boolean
}

export function HeroSection({ isLoading = false }: HeroSectionProps) {
  const [mediaAssets, setMediaAssets] = useState<StrapiMediaGroup[]>([])
  const [isMediaLoading, setIsMediaLoading] = useState(true)

  useEffect(() => {
    async function loadMedia() {
      try {
        const assets = await fetchMediaAssets()
        setMediaAssets(assets)
      } catch (error) {
        console.error("Failed to load media assets:", error)
      } finally {
        setIsMediaLoading(false)
      }
    }

    loadMedia()
  }, [])

  const desktopImage = getImageByName(mediaAssets, LANDING_MEDIA.hero.desktop)
  const mobileImage = getImageByName(mediaAssets, LANDING_MEDIA.hero.mobile)

  if (isLoading || isMediaLoading) {
    return (
      <section className="relative w-full h-screen mb-1 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-screen mb-1">
      {/* Mobile image: only shown on small screens */}
      <div className="w-full h-full block md:hidden">
        <LazyImage
          src={mobileImage}
          alt="Tommy Hilfiger Memorial Day Sale - Mobile"
          width={1920}
          height={1080}
          aspectRatio="16/9"
          priority
          fill
          className="w-full h-full"
        />
      </div>

      {/* Desktop image: shown from md and up */}
      <div className="w-full h-full hidden md:block">
        <LazyImage
          src={desktopImage}
          alt="Tommy Hilfiger Memorial Day Sale - Desktop"
          width={1920}
          height={1080}
          aspectRatio="16/9"
          priority
          fill
          className="w-full h-full"
        />
      </div>

    <div className="absolute inset-x-0 top-0 pt-4 md:pt-4 flex flex-col items-center text-white text-center max-w-md mx-auto">
  <h1 className="text-lg md:text-xl font-medium mb-1">Memorial Day Sale</h1>
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
          <div className="text-2xl md:text-3xl lg:text-2xl font-medium leading-tight">
            40 – 70%
            <br />
            Off Sitewide
          </div>

          <div className="h-0 md:h-16 border-l border-white hidden md:block"></div>

          <div className="flex flex-col">
            <span className="text-xs tracking-wider">the hilfiger club | EXCLUSIVE</span>
            <span className="text-sm md:text-base font-medium">Take an EXTRA</span>
            <span className="text-sm md:text-base font-medium">25% Off $175+</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white hover:bg-white/20 border-white text-sm py-1 px-4 h-auto rounded-none"
          >
            <Link href="/menu?category=men" scroll={false} className="underline underline-offset-4 decoration-white/40">
              Shop Men
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white hover:bg-white/20 border-white text-sm py-1 px-4 h-auto rounded-none"
          >
            <Link
              href="/menu?category=women"
              scroll={false}
              className="underline underline-offset-4 decoration-white/40"
            >
              Shop Women
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white hover:bg-white/20 border-white text-sm py-1 px-4 h-auto rounded-none"
          >
            <Link href="/menu" scroll={false} className="underline underline-offset-4 decoration-white/40">
              Shop Sale
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
