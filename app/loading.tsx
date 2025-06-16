export default function RootLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-64 bg-white/20 rounded animate-pulse mx-auto"></div>
            <div className="h-6 w-48 bg-white/20 rounded animate-pulse mx-auto"></div>
            <div className="h-12 w-32 bg-white/20 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Category Navigation Skeleton */}
      <div className="py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8 mx-auto"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Collections Skeleton */}
      <div className="py-12 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-8 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="aspect-[4/5] bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section Skeleton */}
      <div className="py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
