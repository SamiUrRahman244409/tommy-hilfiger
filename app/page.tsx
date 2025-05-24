"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { VideoSection } from "@/components/landing/video-section"
import { CategoryNavigation } from "@/components/landing/category-navigation"
import { FeaturedCollections } from "@/components/landing/featured-collections"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Memorial Day Sale */}
        <HeroSection />

        {/* Featured Collections - Linen, Polo, and Shorts */}
        <FeaturedCollections />

        {/* Video Section (moved up to replace Resort Section) */}
        <VideoSection />

        {/* Category Navigation with Collections */}
        <CategoryNavigation />
      </main>

      <Footer />
    </div>
  )
}
