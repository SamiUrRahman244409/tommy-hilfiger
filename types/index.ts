export interface ProductImage {
  src: string
  alt: string
}

export interface Product {
  id: number
  name: string
  price: number
  salePrice: number
  discount?: string
  image: string
  hoverImage?: string
  alt: string
  src: string
  images?: string[]
  currentColor: string
  description?: string
  slug?: string
  category?: string
  sizes?: string[]
  seo?: {
    metaTitle: string
    metaDescription: string
    keywords: string
  }
}
