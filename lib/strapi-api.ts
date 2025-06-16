import type { StrapiApiResponse, StrapiProduct } from "@/types/strapi"
import type { Product } from "@/types"

// Get API URL from environment variables
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://grateful-action-a3c4ebca24.strapiapp.com/api"
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

// Static generation configuration - 6 hours revalidation
export const STATIC_REVALIDATE_TIME = 21600 // 6 hours in seconds

export class StrapiApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "StrapiApiError"
  }
}

// Server-side fetch with static generation optimizations
async function serverFetch(url: string, options: RequestInit = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      // Force static generation with revalidation
      next: {
        revalidate: STATIC_REVALIDATE_TIME, // 6 hours
        tags: ["products", "strapi"],
      },
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      console.error(`URL: ${url}`)
      throw new StrapiApiError(`API request failed: ${response.status} ${response.statusText}`, response.status)
    }

    return response.json()
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}

// Simplified server-side products fetching
export async function fetchProductsServer(
  options: {
    page?: number
    pageSize?: number
    category?: string
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  } = {},
): Promise<StrapiApiResponse> {
  try {
    const { page = 1, pageSize = 25, category, search, sortBy = "createdAt", sortOrder = "desc" } = options

    // Simplified populate query to avoid 400 errors
    const populateQuery = [
      "populate[image][fields][0]=url",
      "populate[image][fields][1]=formats",
      "populate[image][fields][2]=alternativeText",
      "populate[category][fields][0]=name",
      "populate[category][fields][1]=slug",
      "populate[SEO][fields][0]=metaTitle",
      "populate[SEO][fields][1]=metaDescription",
      "populate[SEO][fields][2]=keywords",
      "populate[ProductSize][fields][0]=size",
      "fields[0]=Title",
      "fields[1]=price",
      "fields[2]=slug",
      "fields[3]=description",
      "fields[4]=createdAt",
      "fields[5]=updatedAt",
    ]

    // Build query parameters
    const queryParams = new URLSearchParams()

    // Pagination
    queryParams.append("pagination[page]", page.toString())
    queryParams.append("pagination[pageSize]", pageSize.toString())

    // Sorting
    queryParams.append(`sort[0]`, `${sortBy}:${sortOrder}`)

    // Filters
    if (category) {
      queryParams.append("filters[category][name][$containsi]", category)
    }

    if (search) {
      queryParams.append("filters[$or][0][Title][$containsi]", search)
      queryParams.append("filters[$or][1][description][$containsi]", search)
    }

    // Combine all query parameters
    const allParams = [...populateQuery, ...Array.from(queryParams.entries()).map(([key, value]) => `${key}=${value}`)]
    const queryString = allParams.join("&")

    const url = `${STRAPI_API_URL}/products?${queryString}`

    return await serverFetch(url)
  } catch (error) {
    console.error("Error in fetchProductsServer:", error)
    if (error instanceof StrapiApiError) {
      throw error
    }
    throw new StrapiApiError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Function to generate random discount while keeping product in same price bracket
function generateSmartDiscount(originalPrice: number): {
  discountPercent: number
  salePrice: number
  discountText: string
} {
  const brackets = [
    { min: 0, max: 25 },
    { min: 25, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: Number.POSITIVE_INFINITY },
  ]

  const currentBracket = brackets.find((bracket) => originalPrice > bracket.min && originalPrice <= bracket.max)

  if (!currentBracket) {
    const discountPercent = Math.floor(Math.random() * 21) + 5
    const salePrice = Math.round(originalPrice * (1 - discountPercent / 100) * 100) / 100
    return {
      discountPercent,
      salePrice,
      discountText: `${discountPercent}% off`,
    }
  }

  let maxDiscountPercent = 30

  if (currentBracket.max !== Number.POSITIVE_INFINITY) {
    const minAllowedPrice = currentBracket.min + 0.01
    const maxDiscountToStayInBracket = ((originalPrice - minAllowedPrice) / originalPrice) * 100
    maxDiscountPercent = Math.min(30, Math.floor(maxDiscountToStayInBracket))
  }

  const discountPercent = Math.floor(Math.random() * (maxDiscountPercent + 1))
  const salePrice = Math.round(originalPrice * (1 - discountPercent / 100) * 100) / 100

  const isInCorrectBracket = salePrice > currentBracket.min && salePrice <= currentBracket.max

  if (!isInCorrectBracket && discountPercent > 0) {
    const safeDiscountPercent = Math.floor(((originalPrice - currentBracket.min - 0.01) / originalPrice) * 100)
    const safeSalePrice = Math.round(originalPrice * (1 - safeDiscountPercent / 100) * 100) / 100

    return {
      discountPercent: safeDiscountPercent,
      salePrice: safeSalePrice,
      discountText: safeDiscountPercent > 0 ? `${safeDiscountPercent}% off` : "No discount",
    }
  }

  return {
    discountPercent,
    salePrice,
    discountText: discountPercent > 0 ? `${discountPercent}% off` : "No discount",
  }
}

export function transformStrapiProduct(strapiProduct: StrapiProduct): Product {
  const descriptionText =
    strapiProduct.description
      ?.map((node) => node.children?.map((child) => child.text).join("") || "")
      .join(" ")
      .trim() || ""

  const images = strapiProduct.image?.map((img) => img.formats?.medium?.url || img.formats?.large?.url || img.url) || []
  const mainImage = images[0] || "/placeholder.svg?height=400&width=300"
  const hoverImage = images[1] || mainImage
  const sizes = strapiProduct.ProductSize?.map((size) => size.size) || []

  const originalPrice = strapiProduct.price || 0
  const { discountPercent, salePrice, discountText } = generateSmartDiscount(originalPrice)

  const seoData = strapiProduct.SEO
    ? {
        metaTitle: strapiProduct.SEO.metaTitle || strapiProduct.Title,
        metaDescription: strapiProduct.SEO.metaDescription || descriptionText.substring(0, 160),
        keywords:
          strapiProduct.SEO.keywords ||
          `${strapiProduct.Title}, ${strapiProduct.category?.name || "fashion"}, Tommy Hilfiger`,
        openGraph: {
          title: strapiProduct.SEO.openGraphTitle || strapiProduct.SEO.metaTitle || strapiProduct.Title,
          description:
            strapiProduct.SEO.openGraphDescription ||
            strapiProduct.SEO.metaDescription ||
            descriptionText.substring(0, 160),
          image: strapiProduct.SEO.openGraphImage?.url || mainImage,
          imageAlt: strapiProduct.SEO.openGraphImage?.alternativeText || strapiProduct.Title,
          imageWidth: strapiProduct.SEO.openGraphImage?.width,
          imageHeight: strapiProduct.SEO.openGraphImage?.height,
        },
        twitter: {
          title: strapiProduct.SEO.twitterTitle || strapiProduct.SEO.openGraphTitle || strapiProduct.Title,
          description:
            strapiProduct.SEO.twitterDescription ||
            strapiProduct.SEO.openGraphDescription ||
            descriptionText.substring(0, 160),
          image: strapiProduct.SEO.twitterImage?.url || strapiProduct.SEO.openGraphImage?.url || mainImage,
          imageAlt:
            strapiProduct.SEO.twitterImage?.alternativeText ||
            strapiProduct.SEO.openGraphImage?.alternativeText ||
            strapiProduct.Title,
        },
        canonicalUrl: strapiProduct.SEO.canonicalUrl,
        robots: strapiProduct.SEO.robots || "index, follow",
        structuredData: strapiProduct.SEO.structuredData,
      }
    : {
        metaTitle: strapiProduct.Title,
        metaDescription: descriptionText.substring(0, 160) || `Shop ${strapiProduct.Title} at Tommy Hilfiger`,
        keywords: `${strapiProduct.Title}, ${strapiProduct.category?.name || "fashion"}, Tommy Hilfiger`,
        openGraph: {
          title: strapiProduct.Title,
          description: descriptionText.substring(0, 160) || `Shop ${strapiProduct.Title} at Tommy Hilfiger`,
          image: mainImage,
          imageAlt: strapiProduct.Title,
        },
        twitter: {
          title: strapiProduct.Title,
          description: descriptionText.substring(0, 160) || `Shop ${strapiProduct.Title} at Tommy Hilfiger`,
          image: mainImage,
          imageAlt: strapiProduct.Title,
        },
        robots: "index, follow",
      }

  return {
    id: strapiProduct.id,
    name: strapiProduct.Title,
    price: originalPrice,
    salePrice: salePrice,
    discount: discountText,
    image: mainImage,
    hoverImage: hoverImage,
    alt: strapiProduct.Title,
    src: mainImage,
    images: images,
    currentColor: strapiProduct.category?.name || "Default",
    description: descriptionText,
    slug: strapiProduct.slug,
    category: strapiProduct.category?.name || "Uncategorized",
    sizes: sizes,
    seo: seoData,
  }
}

// Server-side function to get all products for static generation with error handling
export async function getAllProductsServer(): Promise<Product[]> {
  try {
    console.log("Fetching products for static generation...")
    const response = await fetchProductsServer({ pageSize: 100 }) // Reduced page size
    console.log(`Successfully fetched ${response.data.length} products`)
    return response.data.map(transformStrapiProduct)
  } catch (error) {
    console.error("Error fetching all products:", error)
    // Return empty array instead of throwing to prevent build failure
    return []
  }
}

// Server-side function to get product by slug for static generation
export async function getProductBySlugServer(slug: string): Promise<Product | null> {
  try {
    const populateQuery = [
      "populate[image][fields][0]=url",
      "populate[image][fields][1]=formats",
      "populate[image][fields][2]=alternativeText",
      "populate[category][fields][0]=name",
      "populate[category][fields][1]=slug",
      "populate[SEO][fields][0]=metaTitle",
      "populate[SEO][fields][1]=metaDescription",
      "populate[SEO][fields][2]=keywords",
      "populate[ProductSize][fields][0]=size",
      "fields[0]=Title",
      "fields[1]=price",
      "fields[2]=slug",
      "fields[3]=description",
    ].join("&")

    const url = `${STRAPI_API_URL}/products?filters[slug][$eq]=${slug}&${populateQuery}`
    const data: StrapiApiResponse = await serverFetch(url)

    if (data.data.length === 0) {
      return null
    }

    return transformStrapiProduct(data.data[0])
  } catch (error) {
    console.error("Error fetching product by slug:", error)
    return null
  }
}

// Get all product slugs for static generation
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const url = `${STRAPI_API_URL}/products?fields[0]=slug&pagination[pageSize]=100`
    const data = await serverFetch(url)
    return data.data.map((product: any) => product.slug).filter(Boolean)
  } catch (error) {
    console.error("Error fetching product slugs:", error)
    return []
  }
}

// Get categories for static generation with simplified query
export async function getCategoriesServer(): Promise<Array<{ id: number; name: string; slug: string; count: number }>> {
  try {
    const url = `${STRAPI_API_URL}/categories?fields[0]=name&fields[1]=slug`
    const data = await serverFetch(url)

    return data.data.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      count: 0, // Simplified - no product count for now
    }))
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Generic server-side API function
export async function strapiRequestServer<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${STRAPI_API_URL}${endpoint}`
  return await serverFetch(url, options)
}

// Legacy functions for backward compatibility
export async function fetchProducts(): Promise<StrapiApiResponse> {
  return fetchProductsServer()
}

export async function getProducts(): Promise<Product[]> {
  const products = await getAllProductsServer()
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return getProductBySlugServer(slug)
}
