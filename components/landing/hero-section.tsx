"use client"

import { LazyImage } from "@/components/ui/lazy-image"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative w-full h-screen mb-1">
      {/* Mobile image: only shown on small screens */}
      <LazyImage
        src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_PromoHero01_mb.jpg"
        alt="Tommy Hilfiger Memorial Day Sale - Mobile"
        width={1920}
        height={1080}
        aspectRatio="16/9"
        priority
        fill
        className="w-full h-full block md:hidden"
      />

      {/* Desktop image: shown from md and up */}
      <LazyImage
        src="https://media.tommy.com/us/static/images/scheduled_marketing/2025/05/21_HP_PromoHero01_dt.jpg"
        alt="Tommy Hilfiger Memorial Day Sale - Desktop"
        width={1920}
        height={1080}
        aspectRatio="16/9"
        priority
        fill
        className="w-full h-full hidden md:block"
      />

      <div className="absolute inset-x-0 top-0 md:pt-4 flex flex-col items-center text-white text-center max-w-md mx-auto">
        <h1 className="text-lg md:text-xl font-medium mb-1">Memorial Day Sale</h1>
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
          <div className="text-2xl md:text-3xl lg:text-2xl font-medium leading-tight">
            40 – 70%
            <br />
            Off Sitewide
          </div>

          <div className="h-0 md:h-16 border-l border-white hidden md:block"></div>

          <div className="flex flex-col">
            <span className="text-xs tracking-wider">the hilfiger club | EXCLUSIVE</span>
            <span className="text-sm md:text-base font-medium">Take an EXTRA</span>
            <span className="text-sm md:text-base font-medium">25% Off $175+</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white hover:bg-white/20 border-white text-sm py-1 px-4 h-auto rounded-none"
          >
            <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
              Shop Men
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white hover:bg-white/20 border-white text-sm py-1 px-4 h-auto rounded-none"
          >
            <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
              Shop Women
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white hover:bg-white/20 border-white text-sm py-1 px-4 h-auto rounded-none"
          >
            <Link href="/menu" className="underline underline-offset-4 decoration-white/40">
              Shop Sale
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
