export default function CartLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Skeleton */}
          <div className="lg:col-span-2">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-6" />

            {/* Cart Item Skeletons */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4 p-4 border-b">
                <div className="w-24 h-32 bg-gray-200 animate-pulse rounded" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
                  <div className="flex items-center justify-between">
                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />

              {/* Summary Lines */}
              {[1, 2, 3, 4].map((line) => (
                <div key={line} className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
                  <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
