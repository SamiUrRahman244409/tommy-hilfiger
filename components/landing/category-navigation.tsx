"use client"

import Link from "next/link"
import { LazyImage } from "@/components/ui/lazy-image"

export function CategoryNavigation() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Category Navigation */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Men</h2>
          <div className="flex justify-center space-x-8">
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Shoes
            </Link>
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Bags
            </Link>
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Accessories
            </Link>
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Underwear
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Women</h2>
          <div className="flex justify-center space-x-8">
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Shoes
            </Link>
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Bags
            </Link>
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Accessories
            </Link>
            <Link href="/menu" className="text-sm border-b-2 border-transparent hover:border-black pb-1">
              Underwear
            </Link>
          </div>
        </div>
      </div>

      {/* Collection Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* The Dress Shop */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_ExpMore01.jpg"
              alt="Woman in orange dress - The Dress Shop"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">The Dress Shop</h3>
          <Link href="/menu" className="text-sm hover:underline">
            Shop Now
          </Link>
        </div>

        {/* The Logo Shop */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/06_HP_ExpMore02.jpg"
              alt="Tommy Hilfiger logo clothing - The Logo Shop"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">The Logo Shop</h3>
          <Link href="/menu" className="text-sm hover:underline">
            Shop Now
          </Link>
        </div>

        {/* Butter Yellow */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_ExpMore03_v2.jpg"
              alt="Woman in yellow top by the ocean - Butter Yellow"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">Butter Yellow</h3>
          <Link href="/menu" className="text-sm hover:underline">
            Shop Now
          </Link>
        </div>

        {/* Tommy Stories */}
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full overflow-hidden mb-4">
            <LazyImage
              src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/04/22_HP_ExpMore04.jpg"
              alt="Tommy Hilfiger with clothing - Tommy Stories"
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">Tommy Stories</h3>
          <Link href="/menu" className="text-sm hover:underline">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
