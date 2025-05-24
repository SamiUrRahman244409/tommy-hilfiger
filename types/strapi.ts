// Strapi API response types
export interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large?: StrapiImageFormat
    medium?: StrapiImageFormat
    small?: StrapiImageFormat
    thumbnail?: StrapiImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface StrapiCategory {
  id: number
  documentId: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiSEO {
  id: number
  metaTitle: string
  metaDescription: string
  keywords: string
  openGraphTitle: string
  openGraphDescription: string
}

export interface StrapiProductSize {
  id: number
  size: string
}

export interface StrapiDescriptionNode {
  type: string
  children: Array<{
    text: string
    type: string
  }>
}

export interface StrapiProduct {
  id: number
  documentId: string
  Title: string
  price: number
  slug: string
  description: StrapiDescriptionNode[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiImage[]
  category: StrapiCategory
  SEO: StrapiSEO
  ProductSize: StrapiProductSize[]
}

export interface StrapiApiResponse {
  data: StrapiProduct[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
