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

  return {
    id: strapiProduct.id,
    name: strapiProduct.Title,
    price: strapiProduct.price,
    salePrice: strapiProduct.price * 0.7, // Calculate 30% discount as fallback
    discount: "30% off", // Default discount
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
