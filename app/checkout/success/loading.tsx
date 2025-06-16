export default function CheckoutSuccessLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Success Icon Skeleton */}
        <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-full mx-auto" />

        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mx-auto" />

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mx-auto" />
        </div>

        {/* Order Details Skeleton */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
        </div>

        {/* Buttons Skeleton */}
        <div className="space-y-3">
          <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded mx-auto" />
        </div>
      </div>
    </div>
  )
}
