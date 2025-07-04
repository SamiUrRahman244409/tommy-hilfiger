import { PageTitle } from "@/components/menu/page-title"
import { BrandDescription } from "@/components/menu/brand-description"
import { getAllProductsServer, getCategoriesServer } from "@/lib/strapi-api"
import { MenuClientWrapper } from "@/components/menu/menu-client-wrapper"
import type { Metadata } from "next"

// Static generation with revalidation - this is the key for SSG
export const revalidate = 21600 // 6 hours in seconds

// Generate metadata for menu page
export async function generateMetadata(): Promise<Metadata> {
  const products = await getAllProductsServer()
  const productCount = products.length

  return {
    title: `Shop All Products (${productCount}) - Tommy Hilfiger`,
    description: `Browse our complete collection of ${productCount} premium Tommy Hilfiger products. Find the perfect fashion pieces with free shipping on orders over $100.`,
    keywords: "Tommy Hilfiger, shop all, products, fashion, clothing, accessories, premium",
    openGraph: {
      title: `Shop All Products - Tommy Hilfiger`,
      description: `Browse our complete collection of ${productCount} premium Tommy Hilfiger products.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/menu`,
      images: [
        {
          url: "/images/og-menu.jpg",
          width: 1200,
          height: 630,
          alt: "Tommy Hilfiger Product Collection",
        },
      ],
    },
    robots: "index, follow",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/menu`,
    },
  }
}

// This is now a static page that gets pre-generated at build time
export default async function MenuPage() {
  // Server-side data fetching for static generation - runs at build time
  const [products, categories] = await Promise.all([getAllProductsServer(), getCategoriesServer()])

  return (
    <div className="mx-8 min-h-[calc(100vh-200px)]">
      <PageTitle />

      {/* Client-side wrapper for interactive features */}
      <MenuClientWrapper initialProducts={products} categories={categories} />

      <BrandDescription />
    </div>
  )
}
