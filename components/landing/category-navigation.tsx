"use client"

import Link from "next/link"
import { LazyImage } from "@/components/ui/lazy-image"
import { useEffect, useState } from "react"
import { fetchMediaAssets, getImageByName } from "@/lib/media-api"
import { LANDING_MEDIA } from "@/data/landing-media"
import type { StrapiMediaGroup } from "@/lib/media-api"

interface CategoryNavigationProps {
  isLoading?: boolean
}

export function CategoryNavigation({ isLoading = false }: CategoryNavigationProps) {
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

  const dressShopImage = getImageByName(mediaAssets, LANDING_MEDIA.categoryNavigation.dressShop)
  const logoShopImage = getImageByName(mediaAssets, LANDING_MEDIA.categoryNavigation.logoShop)
  const butterYellowImage = getImageByName(mediaAssets, LANDING_MEDIA.categoryNavigation.butterYellow)
  const tommyStoriesImage = getImageByName(mediaAssets, LANDING_MEDIA.categoryNavigation.tommyStories)

  if (isLoading || isMediaLoading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Category Navigation Loading */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
          <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        </div>

        {/* Collection Showcase Loading - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col items-center">
              <div className="aspect-[3/4] w-full bg-gray-100 rounded mb-4 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
              <div className="h-6 w-32 bg-gray-100 rounded mb-2"></div>
              <div className="h-4 w-40 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Category Navigation */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Men</h2>
          <div className="flex justify-center space-x-8">
            <Link
              href="/menu?category=men"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Men's Shoes
            </Link>
            <Link
              href="/menu?category=men"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Men's Bags
            </Link>
            <Link
              href="/menu?category=men"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Men's Accessories
            </Link>
            <Link
              href="/menu?category=men"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Men's Underwear
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Women</h2>
          <div className="flex justify-center space-x-8">
            <Link
              href="/menu?category=women"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Women's Shoes
            </Link>
            <Link
              href="/menu?category=women"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Women's Bags
            </Link>
            <Link
              href="/menu?category=women"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Women's Accessories
            </Link>
            <Link
              href="/menu?category=women"
              scroll={false}
              className="text-sm border-b-2 border-transparent hover:border-black pb-1"
            >
              Women's Underwear
            </Link>
          </div>
        </div>
      </div>

      {/* Collection Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* The Dress Shop */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src={dressShopImage}
              alt="Woman in orange dress - The Dress Shop"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">The Dress Shop</h3>
          <Link href="/menu" scroll={false} className="text-sm hover:underline">
            Shop Women's Dresses Collection
          </Link>
        </div>

        {/* The Logo Shop */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src={logoShopImage}
              alt="Tommy Hilfiger logo clothing - The Logo Shop"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">The Logo Shop</h3>
          <Link href="/menu" scroll={false} className="text-sm hover:underline">
            Shop Tommy Hilfiger Logo Collection
          </Link>
        </div>

        {/* Butter Yellow */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src={butterYellowImage}
              alt="Woman in yellow top by the ocean - Butter Yellow"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">Butter Yellow</h3>
          <Link href="/menu" scroll={false} className="text-sm hover:underline">
            Shop Butter Yellow Summer Collection
          </Link>
        </div>

        {/* Tommy Stories */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src={tommyStoriesImage}
              alt="Tommy Hilfiger with clothing - Tommy Stories"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">Tommy Stories</h3>
          <Link href="/menu" scroll={false} className="text-sm hover:underline">
            Discover Tommy Hilfiger Brand Stories
          </Link>
        </div>
      </div>
    </section>
  )
}
