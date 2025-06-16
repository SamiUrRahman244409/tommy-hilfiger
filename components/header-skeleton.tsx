export function HeaderSkeleton() {
  return (
    <>
      {/* Promo Banner Skeleton */}
      <div className="bg-gray-200 animate-pulse h-8" />

      {/* Navigation Skeleton */}
      <header className="border-b py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Skeleton */}
          <div className="w-40 h-8 bg-gray-200 animate-pulse rounded hidden sm:block" />
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded sm:hidden" />

          {/* Desktop Navigation Skeleton */}
          <div className="hidden md:flex items-center space-x-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>

          {/* Icons Skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded hidden md:block" />
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded" />
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded md:hidden" />
          </div>
        </div>
      </header>
    </>
  )
}
