"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export function Header() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

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

  // Close sidebar on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  const handleNewOrSaleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/menu", { scroll: false })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
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
      <header className="border-b py-4 px-6 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Link href="/" scroll={false} className="flex items-center">
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
          
          {/* Right Side - Icons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            {/* User icon only on desktop */}
            <button aria-label="Account" className="hidden md:block">
              <User className="h-5 w-5" />
            </button>
            <button aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
            </button>
            {/* Burger menu only on mobile - shows Menu or X based on sidebar state */}
            <button 
              aria-label={isSidebarOpen ? "Close menu" : "Menu"}
              className="md:hidden relative z-50"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5 text-black" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
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
              onClick={closeSidebar}
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
                handleNewOrSaleClick(e)
                closeSidebar()
              }}
              className="text-lg font-medium text-left hover:text-gray-600 transition-colors duration-200"
            >
              New
            </button>
            <Link
              href="/menu?category=men"
              scroll={false}
              className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              onClick={closeSidebar}
            >
              Men
            </Link>
            <Link
              href="/menu?category=women"
              scroll={false}
              className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              onClick={closeSidebar}
            >
              Women
            </Link>
            <Link
              href="/menu?category=accessories"
              scroll={false}
              className="text-lg font-medium hover:text-gray-600 transition-colors duration-200"
              onClick={closeSidebar}
            >
              Shoes & Accessories
            </Link>
            <button
              onClick={(e) => {
                handleNewOrSaleClick(e)
                closeSidebar()
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
              onClick={closeSidebar}
            >
              <User className="h-5 w-5" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}