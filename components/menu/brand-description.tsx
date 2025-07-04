"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface BrandDescriptionProps {
  loading?: boolean
}

export function BrandDescription({ loading = false }: BrandDescriptionProps) {
  if (loading) {
    return (
      <div className="w-full py-8 border-t border-gray-200">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-8 border-t border-gray-200 animate-in fade-in duration-300">
      <h3 className="text-lg font-semibold mb-4">About Tommy Hilfiger</h3>
      <p className="text-gray-700 leading-relaxed">
        Discover the essence of American style with Tommy Hilfiger's premium collection of men's apparel and
        accessories. This carefully curated selection combines classic and contemporary looks, featuring everything from
        iconic denim jackets and tailored blazers to versatile polos and graphic tees. Whether you're dressing for a
        relaxed weekend or a formal gathering, each piece is designed with Tommy Hilfiger's signature flair, blending
        timeless aesthetics with a modern edge. Our men's accessories, including leather belts, wallets, and watches,
        add a polished touch to any outfit, while caps, scarves, and bags offer functional style for every occasion.
        Made from high-quality materials, each item reflects a commitment to craftsmanship and comfort, ensuring you
        feel confident and stylish wherever you go. For the full Tommy experience, pair outfitted chinos with a crisp
        button-down or layer a hoodie under one of our bomber jackets for an effortlessly cool look. Elevate your
        wardrobe with Tommy Hilfiger's men's clothing and accessories – a perfect balance of heritage style and
        contemporary design.
      </p>
    </div>
  )
}
