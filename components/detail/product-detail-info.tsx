"use client"

import { useState, useCallback, useMemo } from "react"
import { ChevronRight, Star, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LazyImage } from "@/components/ui/lazy-image"
import { ProductDetailSidebar } from "@/components/detail/product-detail-sidebar"
import { ProductSizeSelector } from "./product-size-selector"
import type { ProductImage, Product } from "@/types"
import { useCart } from "@/hooks/use-cart"

interface ProductDetailInfoProps {
  product?: Product
  productImages: ProductImage[]
  currentImage: number
  setCurrentImage: (index: number) => void
  onZoomImage: (imageSrc: string) => void
}

type ColorOption = {
  name: string
  bgClass: string
  textClass?: string
}

export function ProductDetailInfo({
  product,
  productImages,
  currentImage,
  setCurrentImage,
  onZoomImage,
}: ProductDetailInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>({
    name: "Dark Blue",
    bgClass: "bg-blue-800",
  })
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarContent, setSidebarContent] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const colorOptions: ColorOption[] = useMemo(
    () => [
      { name: "Dark Blue", bgClass: "bg-blue-800" },
      { name: "Gray", bgClass: "bg-gray-400" },
      { name: "White", bgClass: "bg-white", textClass: "text-gray-800" },
      { name: "Black", bgClass: "bg-black", textClass: "text-white" },
    ],
    [],
  )

  const openSidebar = useCallback((content: string) => {
    setSidebarContent(content)
    setSidebarOpen(true)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
    setSidebarContent("")
  }, [])

  const handleThumbnailClick = useCallback(
    (index: number) => {
      const targetPosition = index * 300
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
      setCurrentImage(index)
    },
    [setCurrentImage],
  )

  // Memoize product data calculations
  const productData = useMemo(() => {
    const productName = product?.name || "Hilfiger 1985 Logo T-Shirt"
    const originalPrice = product?.price || 39.5
    const salePrice = product?.salePrice || 25.68
    const discountPercent = Math.round((1 - salePrice / originalPrice) * 100)

    return { productName, originalPrice, salePrice, discountPercent }
  }, [product])

  const isAddToCartEnabled = useMemo(() => {
    return selectedColor && selectedSize && quantity > 0
  }, [selectedColor, selectedSize, quantity])

  const handleAddToCart = useCallback(() => {
    if (!product || !isAddToCartEnabled) return

    addToCart({
      productId: product.id || "default-id",
      name: productData.productName,
      image: productImages[0]?.src || "/placeholder.svg?height=400&width=300",
      price: productData.salePrice,
      originalPrice: productData.originalPrice,
      quantity,
      size: selectedSize!,
      color: selectedColor.name,
    })

    // Remove the redirect - just open sidebar
    // router.push("/cart")
  }, [product, isAddToCartEnabled, addToCart, quantity, selectedSize, selectedColor, productData, productImages])

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          {/* Image Navigation - Optimized */}
          <div className="absolute left-4 top-32 z-10 flex flex-col space-y-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`w-12 h-12 border-2 ${
                  currentImage === index ? "border-black" : "border-gray-200"
                } overflow-hidden transition-all duration-200 hover:border-gray-400`}
              >
                <LazyImage
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  width={48}
                  height={48}
                  aspectRatio="1/1"
                  className="w-full h-full object-cover"
                  sizes="48px"
                  quality={50}
                  priority={index === 0}
                />
              </button>
            ))}
          </div>

          {/* Main Images Container */}
          <div className="sticky top-0 flex flex-col space-y-4 pb-8">
            {productImages.map((image, index) => (
              <div key={index} className="w-full relative group" id={`product-image-${index}`}>
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={800}
                  aspectRatio="3/4"
                  className="w-full object-contain"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
                {/* Zoom button - only shown on hover */}
                <button
                  className="absolute bottom-4 right-4 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() => onZoomImage(image.src)}
                  aria-label="Zoom image"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details - Fixed */}
        <div className="space-y-6 sticky top-8 self-start">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500">
            <span className="hover:underline cursor-pointer">Men</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="hover:underline cursor-pointer">Clothing</span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-bold">{productData.productName}</h1>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 line-through">${productData.originalPrice.toFixed(2)}</span>
            <span className="font-bold text-lg">${productData.salePrice.toFixed(2)}</span>
            <span className="text-red-600 font-medium">{productData.discountPercent}% off</span>
          </div>

          {/* Reviews Summary */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">4.5/5 (93 Reviews)</span>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                Color: <span className="font-medium">{selectedColor.name}</span>
              </span>
              <span className="text-sm">View colors</span>
            </div>
            <div className="flex space-x-2">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  className={`w-8 h-8 rounded-full ${color.bgClass} transition-all duration-200 ${
                    selectedColor.name === color.name ? "ring-2 ring-offset-2 ring-black" : "border border-gray-300"
                  }`}
                  aria-label={color.name}
                  onClick={() => setSelectedColor(color)}
                >
                  {color.name === "White" && <div className="w-8 h-8 rounded-full border border-gray-300"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <ProductSizeSelector selectedSize={selectedSize} setSelectedSize={setSelectedSize} variant="detail" />

          <div className="text-sm">In Stock</div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-2">
            <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Qty" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((qty) => (
                  <SelectItem key={qty} value={qty.toString()}>
                    {qty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className={`flex-1 rounded-none py-6 transition-all duration-200 ${
                isAddToCartEnabled
                  ? "bg-black hover:bg-gray-800 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
              disabled={!isAddToCartEnabled}
            >
              Add to Bag - ${productData.salePrice.toFixed(2)}
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="text-sm">Free Standard Shipping on Orders $100+</div>

          {/* Payment Options */}
          <div className="flex items-center space-x-2 text-sm">
            <div className="bg-black text-white px-1 py-0.5 text-xs">$</div>
            <span>Afterpay available for orders between $35 - $1,000</span>
            <span className="border rounded-full w-4 h-4 flex items-center justify-center text-xs">i</span>
          </div>

          {/* Product Information Buttons */}
          <div className="space-y-2 border-t pt-6">
            <button
              onClick={() => openSidebar("product-details")}
              className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-3" />
                <span className="text-base font-medium">Product Details</span>
              </div>
            </button>

            <button
              onClick={() => openSidebar("shipping")}
              className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-3" />
                <span className="text-base font-medium">Shipping & Returns</span>
              </div>
            </button>

            <button
              onClick={() => openSidebar("reviews")}
              className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-3" />
                <span className="text-base font-medium">Reviews (93)</span>
              </div>
            </button>

            <button
              onClick={() => openSidebar("questions")}
              className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-3" />
                <span className="text-base font-medium">Questions & Answers (35)</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <ProductDetailSidebar isOpen={sidebarOpen} onClose={closeSidebar} content={sidebarContent} />
    </>
  )
}
