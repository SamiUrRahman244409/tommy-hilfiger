"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LazyImage } from "@/components/ui/lazy-image"

export function FeaturedCollections() {
  return (
    <section className="w-full ">
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative w-full mb-1">
        {/* Left Image */}
        <div className="relative overflow-hidden w-full">
          <LazyImage
            src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_Grid03_01_dt.jpg"
            alt="Woman with curly blonde hair wearing white linen shirt"
            width={1200}
            height={1500}
            className="w-full h-auto"
          />
          <div className="absolute bottom-10 right-10 text-white">
            <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
              <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
                Shop Men
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative overflow-hidden w-full">
          <LazyImage
            src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_Grid03_02_dt.jpg"
            alt="Man with curly dark hair wearing cream polo shirt in red convertible"
            width={1200}
            height={1500}
            className="w-full h-auto"
          />
          <div className="absolute bottom-10 left-10 text-white text-right">
            <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
              <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
                Shop Women
              </Link>
            </Button>
          </div>
        </div>

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10 w-full px-4">
          <h2 className="text-3xl md:text-4xl font-medium mb-2">Shorts, All Summer Long</h2>
          <p className="text-sm md:text-base max-w-md mx-auto">
            Wear-everywhere fits, warm-weather colors and hems that hit just right
          </p>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full  mb-1">
        {/* Image 3 */}
        <div className="relative overflow-hidden w-full">
          <LazyImage
            src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_Grid04_01_v2_dt.jpg"
            alt="Two models on a boardwalk by the ocean wearing white shorts"
            width={1200}
            height={1500}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-2xl font-medium mb-1">All Linen Everything</h2>
            <p className="text-sm max-w-xs mb-4">
              For lightweight breathability and your wardrobe's eco-friendly boost too.
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
                  Shop Women
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
                  Shop Men
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Image 4 */}
        <div className="relative overflow-hidden w-full">
          <LazyImage
            src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_Grid04_02_v2_dt.jpg"
            alt="Woman in navy striped swimsuit with white shorts on a beach"
            width={1200}
            height={1500}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-2xl font-medium mb-1">The Summer Polo Edit</h2>
            <p className="text-sm max-w-xs mb-4">Classic Tommy style, fit for the beach, boardwalk or backyard BBQ.</p>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
                  {" "}
                  Shop Men
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/20 border-white">
                <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
                  Shop Women
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
