import type { StrapiApiResponse, StrapiProduct } from "@/types/strapi"
import type { Product } from "@/types"

const STRAPI_API_URL = "https://grounded-confidence-41a8f2f2aa.strapiapp.com/api"

export class StrapiApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "StrapiApiError"
  }
}

export async function fetchProducts(): Promise<StrapiApiResponse> {
  try {
    const response = await fetch(`${STRAPI_API_URL}/products/?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add cache control for better performance
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })

    if (!response.ok) {
      throw new StrapiApiError(`Failed to fetch products: ${response.status} ${response.statusText}`, response.status)
    }

    const data: StrapiApiResponse = await response.json()
    return data
  } catch (error) {
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
  // Define price brackets
  const brackets = [
    { min: 0, max: 25 },
    { min: 25, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: Number.POSITIVE_INFINITY },
  ]

  // Find which bracket the original price falls into
  const currentBracket = brackets.find((bracket) => originalPrice > bracket.min && originalPrice <= bracket.max)

  if (!currentBracket) {
    // Fallback: random discount between 5-25%
    const discountPercent = Math.floor(Math.random() * 21) + 5 // 5-25%
    const salePrice = Math.round(originalPrice * (1 - discountPercent / 100) * 100) / 100
    return {
      discountPercent,
      salePrice,
      discountText: `${discountPercent}% off`,
    }
  }

  // Calculate maximum discount that keeps product in same bracket
  let maxDiscountPercent = 30

  // For products not in the highest bracket, ensure they don't drop below bracket minimum
  if (currentBracket.max !== Number.POSITIVE_INFINITY) {
    const minAllowedPrice = currentBracket.min + 0.01 // Stay just above bracket minimum
    const maxDiscountToStayInBracket = ((originalPrice - minAllowedPrice) / originalPrice) * 100
    maxDiscountPercent = Math.min(30, Math.floor(maxDiscountToStayInBracket))
  }

  // Generate random discount between 0 and maxDiscountPercent
  const discountPercent = Math.floor(Math.random() * (maxDiscountPercent + 1)) // 0 to maxDiscountPercent

  // Calculate sale price
  const salePrice = Math.round(originalPrice * (1 - discountPercent / 100) * 100) / 100

  // Verify the sale price is still in the correct bracket
  const isInCorrectBracket = salePrice > currentBracket.min && salePrice <= currentBracket.max

  if (!isInCorrectBracket && discountPercent > 0) {
    // Fallback: reduce discount to keep in bracket
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
  // Extract description text from rich text format
  const descriptionText =
    strapiProduct.description
      ?.map((node) => node.children?.map((child) => child.text).join("") || "")
      .join(" ")
      .trim() || ""

  // Get image URLs - prioritize medium format, fallback to original
  const images = strapiProduct.image?.map((img) => img.formats?.medium?.url || img.formats?.large?.url || img.url) || []

  // Get main image and hover image
  const mainImage = images[0] || "/placeholder.svg?height=400&width=300"
  const hoverImage = images[1] || mainImage

  // Extract available sizes
  const sizes = strapiProduct.ProductSize?.map((size) => size.size) || []

  // Generate smart discount
  const originalPrice = strapiProduct.price || 0
  const { discountPercent, salePrice, discountText } = generateSmartDiscount(originalPrice)

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
    seo: strapiProduct.SEO
      ? {
          metaTitle: strapiProduct.SEO.metaTitle,
          metaDescription: strapiProduct.SEO.metaDescription,
          keywords: strapiProduct.SEO.keywords,
        }
      : undefined,
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchProducts()
    return response.data.map(transformStrapiProduct)
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return empty array on error - you might want to handle this differently
    return []
  }
}
