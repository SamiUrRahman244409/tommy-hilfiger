import { Skeleton } from "@/components/ui/skeleton"

export function LandingSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton - Full screen height */}
      <section className="relative w-full h-screen mb-1">
        <Skeleton className="w-full h-full rounded-none" />
        {/* Hero text overlay skeleton */}
        <div className="absolute inset-x-0 top-0 pt-4 md:pt-4 flex flex-col items-center text-center max-w-md mx-auto">
          <Skeleton className="h-6 w-48 mb-2 bg-white/20" />
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-6">
            <div className="flex flex-col items-center">
              <Skeleton className="h-8 w-24 mb-1 bg-white/20" />
              <Skeleton className="h-8 w-20 bg-white/20" />
            </div>
            <Skeleton className="h-16 w-px bg-white/20 hidden md:block" />
            <div className="flex flex-col items-center">
              <Skeleton className="h-4 w-32 mb-1 bg-white/20" />
              <Skeleton className="h-5 w-28 mb-1 bg-white/20" />
              <Skeleton className="h-5 w-24 bg-white/20" />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Skeleton className="h-8 w-20 bg-white/20" />
            <Skeleton className="h-8 w-24 bg-white/20" />
            <Skeleton className="h-8 w-20 bg-white/20" />
          </div>
        </div>
      </section>

      {/* Featured Collections Skeleton - 2x2 Grid */}
      <section className="w-full">
        {/* First row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative w-full mb-1">
          <div className="relative w-full h-[600px] md:h-[800px]">
            <Skeleton className="w-full h-full rounded-none" />
            {/* Button overlay */}
            <div className="absolute bottom-10 right-10">
              <Skeleton className="h-10 w-24 bg-white/20" />
            </div>
          </div>
          <div className="relative w-full h-[600px] md:h-[800px]">
            <Skeleton className="w-full h-full rounded-none" />
            {/* Button overlay */}
            <div className="absolute bottom-10 left-10">
              <Skeleton className="h-10 w-28 bg-white/20" />
            </div>
          </div>
          {/* Center text overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-4 hidden sm:block">
            <Skeleton className="h-8 w-64 mb-2 bg-white/20 mx-auto" />
            <Skeleton className="h-4 w-80 bg-white/20 mx-auto" />
          </div>
        </div>

        {/* Second row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full mb-1">
          <div className="relative w-full h-[600px] md:h-[800px]">
            <Skeleton className="w-full h-full rounded-none" />
            {/* Center content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Skeleton className="h-6 w-40 mb-2 bg-white/20" />
              <Skeleton className="h-4 w-56 mb-4 bg-white/20" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-24 bg-white/20" />
                <Skeleton className="h-8 w-20 bg-white/20" />
              </div>
            </div>
          </div>
          <div className="relative w-full h-[600px] md:h-[800px]">
            <Skeleton className="w-full h-full rounded-none" />
            {/* Center content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Skeleton className="h-6 w-48 mb-2 bg-white/20" />
              <Skeleton className="h-4 w-64 mb-4 bg-white/20" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-20 bg-white/20" />
                <Skeleton className="h-8 w-24 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section Skeleton */}
      <section className="relative w-full h-[80vh] min-h-[600px]">
        <Skeleton className="w-full h-full rounded-none" />
      </section>

      {/* Category Navigation Skeleton */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* Men/Women Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div>
            <Skeleton className="h-8 w-16 mx-auto mb-6" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-18" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-22" />
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-20 mx-auto mb-6" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <Skeleton className="h-4 w-22" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-26" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* 4-Column Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col items-center">
              <div className="aspect-[3/4] w-full mb-4">
                <Skeleton className="w-full h-full rounded" />
              </div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
