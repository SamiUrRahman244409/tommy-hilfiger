import { HeroSection } from "@/components/landing/hero-section"
import { FeaturedCollections } from "@/components/landing/featured-collections"
import { VideoSection } from "@/components/landing/video-section"
import { CategoryNavigation } from "@/components/landing/category-navigation"
import { getAllProductsServer, getCategoriesServer } from "@/lib/strapi-api"
import type { Metadata } from "next"

// Static generation with revalidation - this is the key for SSG
export const revalidate = 21600 // 6 hours in seconds

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tommy Hilfiger - Premium Fashion & Lifestyle",
    description:
      "Discover the latest Tommy Hilfiger collection. Shop premium fashion, accessories, and lifestyle products with free shipping on orders over $100.",
    keywords: "Tommy Hilfiger, fashion, clothing, premium, lifestyle, accessories",
    openGraph: {
      title: "Tommy Hilfiger - Premium Fashion & Lifestyle",
      description:
        "Discover the latest Tommy Hilfiger collection. Shop premium fashion, accessories, and lifestyle products.",
      type: "website",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
      images: [
        {
          url: "/placeholder.svg?height=630&width=1200",
          width: 1200,
          height: 630,
          alt: "Tommy Hilfiger Homepage",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tommy Hilfiger - Premium Fashion & Lifestyle",
      description:
        "Discover the latest Tommy Hilfiger collection. Shop premium fashion, accessories, and lifestyle products.",
      images: ["/placeholder.svg?height=630&width=1200"],
    },
    robots: "index, follow",
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
    },
  }
}

// This is now a static page that gets pre-generated at build time
export default async function HomePage() {
  // Server-side data fetching for static generation - runs at build time
  let products: any[] = []
  let categories: any[] = []

  try {
    console.log("Starting homepage data fetch for static generation...")
    const [productsData, categoriesData] = await Promise.allSettled([getAllProductsServer(), getCategoriesServer()])

    if (productsData.status === "fulfilled") {
      products = productsData.value
      console.log(`Homepage: Successfully loaded ${products.length} products for static generation`)
    } else {
      console.error("Homepage: Failed to load products:", productsData.reason)
    }

    if (categoriesData.status === "fulfilled") {
      categories = categoriesData.value
      console.log(`Homepage: Successfully loaded ${categories.length} categories for static generation`)
    } else {
      console.error("Homepage: Failed to load categories:", categoriesData.reason)
    }
  } catch (error) {
    console.error("Homepage: Error during static data fetching:", error)
  }

  // Pre-process data for components with fallbacks
  const featuredProducts = products.slice(0, 8)
  const heroProduct = products[0] || null

  return (
    <>
      {/* Hero Section with fallback */}
      <HeroSection product={heroProduct} />

      {/* Featured Collections with fallback */}
      <FeaturedCollections products={featuredProducts} />

      {/* Video Section - always static */}
      <VideoSection />

      {/* Category Navigation with fallback */}
      <CategoryNavigation categories={categories} />
    </>
  )
}
