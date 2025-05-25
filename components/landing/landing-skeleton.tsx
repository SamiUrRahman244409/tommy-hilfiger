import { Skeleton } from "@/components/ui/skeleton"

export function LandingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 space-y-8 p-6">
        {/* 1 - Hero Section */}
        <div className="w-full">
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>

        {/* 2 - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        {/* 2 - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        {/* 1 - Full Width Section */}
        <div className="w-full">
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>

        {/* 1 - Full Width Section */}
        <div className="w-full">
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>

        {/* 4 - Four Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </main>

      {/* Footer Skeleton */}
      <div className="border-t py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-18" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-18" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-18" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-18" />
          </div>
        </div>
      </div>
    </div>
  )
}
