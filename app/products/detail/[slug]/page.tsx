import {
  getProductBySlugServer,
  getAllProductSlugs,
  getAllProductsServer,
  STATIC_REVALIDATE_TIME,
} from "@/lib/strapi-api"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductDetailPageClient from "./ProductDetailPageClient"

// Static generation with revalidation
export const revalidate = 21600 // 6 hours in seconds

// Generate static params for all product pages
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each product page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlugServer(params.slug)

  if (!product) {
    return {
      title: "Product Not Found - Tommy Hilfiger",
      description: "The requested product could not be found.",
    }
  }

  const seo = product.seo

  return {
    title: seo?.metaTitle || `${product.name} - Tommy Hilfiger`,
    description: seo?.metaDescription || product.description,
    keywords: seo?.keywords || `${product.name}, ${product.category}, Tommy Hilfiger`,
    openGraph: {
      title: seo?.openGraph?.title || product.name,
      description: seo?.openGraph?.description || product.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/detail/${product.slug}`,
      images: [
        {
          url: seo?.openGraph?.image || product.image,
          width: seo?.openGraph?.imageWidth || 800,
          height: seo?.openGraph?.imageHeight || 600,
          alt: seo?.openGraph?.imageAlt || product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitter?.title || product.name,
      description: seo?.twitter?.description || product.description,
      images: [seo?.twitter?.image || product.image],
    },
    robots: seo?.robots || "index, follow",
    alternates: {
      canonical: seo?.canonicalUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/products/detail/${product.slug}`,
    },
    other: {
      // Add structured data
      "product:price:amount": product.salePrice.toString(),
      "product:price:currency": "USD",
      "product:availability": "in stock",
      "product:condition": "new",
      "product:brand": "Tommy Hilfiger",
    },
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  // Server-side data fetching for static generation
  const [product, allProducts] = await Promise.all([getProductBySlugServer(params.slug), getAllProductsServer()])

  if (!product) {
    notFound()
  }

  return <ProductDetailPageClient params={params} product={product} allProducts={allProducts} />
}
