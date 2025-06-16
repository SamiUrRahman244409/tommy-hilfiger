"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { CartSidebar } from "@/components/cart-sidebar"

export function Header() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { state, openSidebar, closeSidebar } = useCart()

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

  // Close sidebar when pathname changes (navigation occurs)
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Close sidebar on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isSidebarOpen])

  const handleNewOrSaleClick = (e: React.MouseEvent, type: "new" | "sale") => {
    e.preventDefault()
    const currentParams = new URLSearchParams(window.location.search)

    // Preserve existing category if it exists
    const category = currentParams.get("category")

    // Build new URL with preserved category and new type
    const newParams = new URLSearchParams()
    if (category) {
      newParams.set("category", category)
    }
    newParams.set("type", type)

    router.push(`/menu?${newParams.toString()}`)
  }

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/menu")
    // Focus search field after navigation
    setTimeout(() => {
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    }, 100)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
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
              <Link href="/menu?category=men" className="underline mx-1">
                Men
              </Link>
              <Link href="/menu?category=women" className="underline mx-1">
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
      <header className="border-b py-4 px-6 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Desktop Logo */}
              <Image
                src="/images/tommy-hilfiger-logo.svg"
                alt="TOMMY HILFIGER"
                width={200}
                height={40}
                className="h-10 hidden sm:block"
                priority
              />
              {/* Mobile Logo */}
              <Image
                src="/images/tommy-hilfiger-small-logo.svg"
                alt="TOMMY HILFIGER"
                width={40}
                height={40}
                className="h-8 w-8 sm:hidden"
                priority
              />
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={(e) => handleNewOrSaleClick(e, "new")}
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              New
            </button>
            <Link href="/menu?category=men" className="text-sm font-medium hover:underline transition-all duration-200">
              Men
            </Link>
            <Link
              href="/menu?category=women"
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              Women
            </Link>
            <Link
              href="/menu?category=accessories"
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              Shoes & Accessories
            </Link>
            <button
              onClick={(e) => handleNewOrSaleClick(e, "sale")}
              className="text-sm font-medium hover:underline transition-all duration-200"
            >
              Sale
            </button>
          </nav>

          {/* Right Side - Icons */}
          <div className="flex items-center space-x-4">
            {/* User icon only on desktop */}
            <button aria-label="Search" onClick={handleSearchClick} className="pl-4">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Account" className="hidden md:block">
              <User className="h-5 w-5" />
            </button>
            <button onClick={openSidebar} aria-label="Cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </button>
            {/* Burger menu only on mobile - shows Menu or X based on sidebar state */}
            <button
              aria-label={isSidebarOpen ? "Close menu" : "Menu"}
              className="md:hidden relative z-50"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <X className="h-5 w-5 text-black" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar} />}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <Image
              src="/images/tommy-hilfiger-small-logo.svg"
              alt="TOMMY HILFIGER"
              width={40}
              height={40}
              className="h-8 w-8"
            />
            <button
              onClick={toggleSidebar}
              aria-label="Close menu"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex flex-col p-6 space-y-6">
            <button
              onClick={(e) => {
                handleNewOrSaleClick(e, "new")
                toggleSidebar()
              }}
              className="text-lg font-medium text-left hover:text-gray-600 transition-colors duration-200"
            >
              New
            </button>
            <Link
              href="/menu?category=men"
              className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              onClick={toggleSidebar}
            >
              Men
            </Link>
            <Link
              href="/menu?category=women"
              className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              onClick={toggleSidebar}
            >
              Women
            </Link>
            <Link
              href="/menu?category=accessories"
              className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              onClick={toggleSidebar}
            >
              Shoes & Accessories
            </Link>
            <button
              onClick={(e) => {
                handleNewOrSaleClick(e, "sale")
                toggleSidebar()
              }}
              className="text-lg font-medium text-left hover:text-gray-600 transition-colors duration-200"
            >
              Sale
            </button>
          </nav>

          {/* Sidebar Footer with Account Link */}
          <div className="mt-auto p-6 border-t">
            <Link
              href="/account"
              className="flex items-center space-x-3 text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              onClick={toggleSidebar}
            >
              <User className="h-5 w-5" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Cart Sidebar */}
      <CartSidebar isOpen={state.isSidebarOpen} onClose={closeSidebar} />
    </>
  )
}
