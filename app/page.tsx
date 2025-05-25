"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturedCollections } from "@/components/landing/featured-collections"
import { VideoSection } from "@/components/landing/video-section"
import { CategoryNavigation } from "@/components/landing/category-navigation"
import { LandingSkeleton } from "@/components/landing/landing-skeleton"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showComponentLoading, setShowComponentLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    // First show skeleton
    const skeletonTimer = setTimeout(() => {
      setIsLoading(false)
      setShowComponentLoading(true)
    }, 1500)

    // Then show component loading states
    const componentTimer = setTimeout(() => {
      setShowComponentLoading(false)
    }, 3000)

    return () => {
      clearTimeout(skeletonTimer)
      clearTimeout(componentTimer)
    }
  }, [])

  if (isLoading) {
    return <LandingSkeleton />
  }

  return (
    <>
      {/* 1 - Hero Section */}
      <HeroSection isLoading={showComponentLoading} />

      {/* 2 - Featured Collections (First Two Sections) */}
      <FeaturedCollections isLoading={showComponentLoading} />

      {/* 1 - Video Section */}
      <VideoSection isLoading={showComponentLoading} />

      {/* 4 - Category Navigation */}
      <CategoryNavigation isLoading={showComponentLoading} />
    </>
  )
}
