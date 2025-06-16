export default function CheckoutLoading() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form Skeleton */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white border rounded-lg p-6">
              <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-4" />

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
              </div>

              <div className="h-10 bg-gray-200 animate-pulse rounded mb-4" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border rounded-lg p-6">
              <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-4" />

              <div className="space-y-4">
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
                <div className="h-10 bg-gray-200 animate-pulse rounded" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div className="bg-white border rounded-lg p-6 h-fit sticky top-4">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-6 mx-auto" />

            {/* Items */}
            <div className="space-y-4 mb-6">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="w-15 h-15 bg-gray-200 animate-pulse rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6">
              {[1, 2, 3].map((line) => (
                <div key={line} className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                </div>
              ))}
              <hr />
              <div className="flex justify-between">
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded" />
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
