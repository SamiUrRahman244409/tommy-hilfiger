export function FooterSkeleton() {
  return (
    <>
      {/* Hilfiger Club Signup Skeleton */}
      <section className="py-12 border-t border-b mt-16 min-h-[320px] md:min-h-[280px]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-32 h-28 bg-gray-200 animate-pulse rounded" />
              <div className="space-y-2 text-center md:text-left">
                <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-56 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>

            <div className="max-w-md w-full space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 h-10 bg-gray-200 animate-pulse rounded" />
                <div className="w-24 h-10 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="h-12 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="py-12 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 min-h-[400px]">
            {[1, 2, 3, 4].map((col) => (
              <div key={col} className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t space-y-6">
            <div className="w-40 h-8 bg-gray-200 animate-pulse rounded mx-auto" />
            <div className="flex flex-wrap justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
              ))}
            </div>
            <div className="space-y-2 text-center">
              <div className="h-3 w-32 bg-gray-200 animate-pulse rounded mx-auto" />
              <div className="h-3 w-48 bg-gray-200 animate-pulse rounded mx-auto" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
