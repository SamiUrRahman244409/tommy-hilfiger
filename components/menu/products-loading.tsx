export function ProductsLoading() {
  return (
    <div className="w-full">
      {/* Main product grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="space-y-3">
            {/* Product Image Skeleton - Fixed aspect ratio to prevent CLS */}
            <div className="relative w-full aspect-[4/5] bg-gray-200 rounded-lg animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
            </div>

            {/* Product Name Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Price Skeleton */}
            <div className="flex items-center space-x-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-red-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button Skeleton */}
      <div className="flex justify-center pb-8">
        <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* You May Also Like Section Skeleton */}
      <div className="w-full pb-16">
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Horizontal scroll skeleton */}
          <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[220px] space-y-3">
                <div className="h-[280px] w-full bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex space-x-2">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Description Skeleton */}
      <div className="w-full py-8 border-t border-gray-200">
        <div className="space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
