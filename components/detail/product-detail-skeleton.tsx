import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailSkeleton() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Product Detail Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Left Side - Image Gallery */}
          <div className="relative">
            {/* Image Navigation Thumbnails */}
            <div className="absolute left-4 top-32 z-10 flex flex-col space-y-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-16 h-16 rounded" />
              ))}
            </div>

            {/* Main Images Container */}
            <div className="sticky top-0 flex flex-col space-y-4 pb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full">
                  <Skeleton className="w-full h-[600px] rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6 sticky top-8 self-start">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Product Title */}
            <Skeleton className="h-8 w-3/4" />

            {/* Price */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>

            {/* Reviews */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-8 h-8 rounded-full" />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(7)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <Skeleton className="h-4 w-16" />

            {/* Add to Cart Section */}
            <div className="flex items-center space-x-2">
              <Skeleton className="w-24 h-12" />
              <Skeleton className="flex-1 h-12" />
            </div>

            {/* Shipping Info */}
            <Skeleton className="h-4 w-64" />

            {/* Payment Options */}
            <div className="flex items-center space-x-2">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="w-4 h-4 rounded-full" />
            </div>

            {/* Product Information Buttons */}
            <div className="space-y-2 border-t pt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between w-full py-3">
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-3" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* More Like This Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[240px] space-y-2">
                <Skeleton className="w-full h-[300px] rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
