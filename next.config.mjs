/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('https://', ''),
      'res.cloudinary.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'shoptommy.scene7.com'
    ],
  },
  // Enable compression
  compress: true,
  // Experimental features for static generation
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Optimize CSS
    optimizeCss: true,
  },
  // Enhanced cache headers for static assets
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Disable powered by header for security
  poweredByHeader: false,
  // Enable SWC minification
  swcMinify: true,
  // Static generation optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      }
    }
    return config
  },
  // Generate static sitemap
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  // Enable static exports
  output: 'standalone',
}

export default nextConfig
