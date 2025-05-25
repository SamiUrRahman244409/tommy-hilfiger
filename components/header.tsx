"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ShoppingBag, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

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

  const handleNewOrSaleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/menu", { scroll: false })
  }

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
              <Link href="/menu?category=men" scroll={false} className="underline mx-1">
                Men
              </Link>
              <Link href="/menu?category=women" scroll={false} className="underline mx-1">
                Women
              </Link>
              <Link href="/menu" scroll={false} className="underline mx-1">
                Kids
              </Link>
              <Link href="/menu" scroll={false} className="underline mx-1">
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
      <header className="border-b py-4 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          <div className="flex items-center">
            <Link href="/" scroll={false} className="flex items-center">
              <Image
                src="/images/tommy-hilfiger-logo.svg" // local file from public folder
                alt="TOMMY HILFIGER"
                width={200}
                height={40}
                className="h-10"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center justify-center space-x-6">
            <button
              onClick={handleNewOrSaleClick}
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              New
            </button>
            <Link
              href="/menu?category=men"
              scroll={false}
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              Men
            </Link>
            <Link
              href="/menu?category=women"
              scroll={false}
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              Women
            </Link>
            <Link
              href="/menu?category=accessories"
              scroll={false}
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              Shoes & Accessories
            </Link>
            <button
              onClick={handleNewOrSaleClick}
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              Sale
            </button>
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
