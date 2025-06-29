// Static Site Generation Configuration
// This file ensures all pages are pre-rendered at build time

const staticConfig = {
  // Pages that should be statically generated
  staticPages: [
    '/',
    '/menu',
    '/cart',
    '/checkout',
    '/checkout/success',
  ],
  
  // Dynamic routes that need static generation
  dynamicRoutes: [
    // Product detail pages will be generated from getAllProductSlugs()
    '/products/detail/[slug]',
  ],
  
  // Revalidation settings
  revalidation: {
    default: 43200, // 12 hours in seconds
    products: 43200,
    categories: 43200,
  },
  
  // Cache settings
  cache: {
    maxAge: 43200, // 12 hours
    staleWhileRevalidate: 86400, // 24 hours
  },
  
  // Build optimizations
  build: {
    generateStaticParams: true,
    generateMetadata: true,
    optimizeImages: true,
    minify: true,
  }
}

module.exports = staticConfig 