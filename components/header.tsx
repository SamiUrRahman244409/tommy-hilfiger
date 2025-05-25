"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ShoppingBag, User } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    "40 - 70% Off Sitewide, Plus an Extra 25% Off $175+ or 15% Off $125+ for Hilfiger Club Members",
    "Free shipping on orders over $100 Details",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0))
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-black text-white text-xs py-1 px-4 text-center overflow-hidden">
        <div
          className="transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="py-1 min-w-full flex-shrink-0">
            {slides[0]}
            <span className="mx-2 font-medium">
              <Link href="/menu" className="underline mx-1">
                Men
              </Link>
              <Link href="/menu" className="underline mx-1">
                Women
              </Link>
              <Link href="/menu" className="underline mx-1">
                Kids
              </Link>
              <Link href="/menu" className="underline mx-1">
                Sale
              </Link>
            </span>
          </div>
          <div className="py-1 min-w-full flex-shrink-0">
            {slides[1]}
            <Link href="#" className="underline mx-1">
              Details
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="border-b px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="https://id-tgo-images.s3.ap-southeast-1.amazonaws.com/159/cms/2/TOMMY_HILFIGER.png"
                alt="TOMMY HILFIGER"
                width={200}
                height={100}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center justify-center space-x-6">
            <Link href="/menu" className="text-sm font-medium hover:underline transition-all duration-200">
              New
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:underline transition-all duration-200">
              Men
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:underline transition-all duration-200">
              Women
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:underline transition-all duration-200">
              Shoes & Accessories
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:underline transition-all duration-200">
              Sale
            </Link>
          </nav>
          <div className="flex items-center justify-end space-x-4">
            <button aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Account">
              <User className="h-5 w-5" />
            </button>
            <button aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
