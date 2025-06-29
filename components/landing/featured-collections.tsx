"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LazyImage } from "@/components/ui/lazy-image"
import { useEffect, useState } from "react"
import { fetchMediaAssets, getImageByName } from "@/lib/media-api"
import { LANDING_MEDIA } from "@/data/landing-media"
import type { StrapiMediaGroup } from "@/lib/media-api"

interface FeaturedCollectionsProps {
  isLoading?: boolean
}

export function FeaturedCollections({ isLoading = false }: FeaturedCollectionsProps) {
  const [mediaAssets, setMediaAssets] = useState<StrapiMediaGroup[]>([])
  const [isMediaLoading, setIsMediaLoading] = useState(true)

  useEffect(() => {
    async function loadMedia() {
      try {
        const assets = await fetchMediaAssets()
        console.log("Featured collections loaded media assets:", assets)
        setMediaAssets(assets)
      } catch (error) {
        console.error("Failed to load media assets:", error)
      } finally {
        setIsMediaLoading(false)
      }
    }

    loadMedia()
  }, [])

  const grid03_01 = getImageByName(mediaAssets, LANDING_MEDIA.featuredCollections.grid03_01)
  const grid03_02 = getImageByName(mediaAssets, LANDING_MEDIA.featuredCollections.grid03_02)
  const grid04_01 = getImageByName(mediaAssets, LANDING_MEDIA.featuredCollections.grid04_01)
  const grid04_02 = getImageByName(mediaAssets, LANDING_MEDIA.featuredCollections.grid04_02)

  console.log("Featured collection images:", { grid03_01, grid03_02, grid04_01, grid04_02 })

  if (isLoading || isMediaLoading) {
    return (
      <section className="w-full">
        {/* First row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative w-full mb-1">
          <div className="relative w-full h-[600px] md:h-[800px] bg-gray-200 animate-pulse" />
          <div className="relative w-full h-[600px] md:h-[800px] bg-gray-200 animate-pulse" />
        </div>

        {/* Second row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full mb-1">
          <div className="relative w-full h-[600px] md:h-[800px] bg-gray-200 animate-pulse" />
          <div className="relative w-full h-[600px] md:h-[800px] bg-gray-200 animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <section className="w-full ">
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative w-full mb-1">
        {/* Left Image */}
        <div className="relative overflow-hidden w-full h-[600px] md:h-[800px]">
          <LazyImage
            src={grid03_01}
            alt="Woman with curly blonde hair wearing white linen shirt"
            width={1200}
            height={1500}
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute bottom-10 right-10 text-white">
            <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
              <Link
                href="/menu?category=men"
                scroll={false}
                className="underline underline-offset-4 decoration-white/40"
              >
                Shop Men
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden w-full h-[600px] md:h-[800px]">
          <LazyImage
            src={grid03_02}
            alt="Man with curly dark hair wearing cream polo shirt in red convertible"
            width={1200}
            height={1500}
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute bottom-10 left-10 text-white text-right">
            <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
              <Link
                href="/menu?category=women"
                scroll={false}
                className="underline underline-offset-4 decoration-white/40"
              >
                Shop Women
              </Link>
            </Button>
          </div>
        </div>

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10 w-full px-4 hidden sm:block">
          <h2 className="text-3xl md:text-4xl font-medium mb-2">Shorts, All Summer Long</h2>
          <p className="text-sm md:text-base max-w-md mx-auto">
            Wear-everywhere fits, warm-weather colors and hems that hit just right
          </p>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full  mb-1">
        {/* Image 3 */}
        <div className="relative overflow-hidden w-full h-[600px] md:h-[800px]">
          <LazyImage
            src={grid04_01}
            alt="Two models on a boardwalk by the ocean wearing white shorts"
            width={1200}
            height={1500}
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-2xl font-medium mb-1">All Linen Everything</h2>
            <p className="text-sm max-w-xs mb-4">
              For lightweight breathability and your wardrobe's eco-friendly boost too.
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link
                  href="/menu?category=women"
                  scroll={false}
                  className="underline underline-offset-4 decoration-white/40"
                >
                  Shop Women
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link
                  href="/menu?category=men"
                  scroll={false}
                  className="underline underline-offset-4 decoration-white/40"
                >
                  Shop Men
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Image 4 */}
        <div className="relative overflow-hidden w-full h-[600px] md:h-[800px]">
          <LazyImage
            src={grid04_02}
            alt="Woman in navy striped swimsuit with white shorts on a beach"
            width={1200}
            height={1500}
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-2xl font-medium mb-1">The Summer Polo Edit</h2>
            <p className="text-sm max-w-xs mb-4">Classic Tommy style, fit for the beach, boardwalk or backyard BBQ.</p>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link
                  href="/menu?category=men"
                  scroll={false}
                  className="underline underline-offset-4 decoration-white/40"
                >
                  {" "}
                  Shop Men
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link
                  href="/menu?category=women"
                  scroll={false}
                  className="underline underline-offset-4 decoration-white/40"
                >
                  Shop Women
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
