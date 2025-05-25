"use client"

import Image from "next/image"
import { ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link';
import type { ProductImage } from "@/types"

interface ProductDetailsProps {
  productImages: ProductImage[]
  currentImage: number
  setCurrentImage: (index: number) => void
}

export function ProductDetails({ productImages, currentImage, setCurrentImage }: ProductDetailsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Images - Two at a time, scrolling with page */}
      <div className="relative">
        {/* Image Navigation */}
        <div className="absolute left-4 top-32 z-10 flex flex-col space-y-2">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                // Scroll to the section of the page where this image would be visible
                const targetPosition = index * 300 // Approximate position based on image index
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                })
                setCurrentImage(index)
              }}
              className={`w-16 h-16 border-2 ${
                currentImage === index ? "border-black" : "border-gray-200"
              } overflow-hidden`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>

        {/* Fixed Images Container */}
        <div className="sticky top-0 flex flex-col space-y-4 pb-8">
          {productImages.map((image, index) => (
            <div key={index} className="h-[600px] w-full" id={`product-image-${index}`}>
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details - Fixed */}
      <div className="space-y-6 sticky top-8 self-start">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500">
          <span className="hover:underline cursor-pointer">
  Men
</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="hover:underline cursor-pointer">
  Clothing
</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="hover:underline cursor-pointer">
  Tops & Sweater
</span>
        </div>

        {/* Product Title */}
        <h1 className="text-2xl font-bold">Hilfiger 1985 Logo T-Shirt</h1>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 line-through">$39.50</span>
          <span className="font-bold text-lg">$16.99</span>
          <span className="text-red-600 font-medium">57% off</span>
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
            <span className="text-sm">Color: Optic White</span>
            <span className="hover:underline cursor-pointer">
  View all colors
</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="w-8 h-8 rounded-full bg-sky-200 border-2 border-gray-300"
              aria-label="Light Blue"
            ></button>
            <button className="w-8 h-8 rounded-full bg-gray-200 border-2 border-gray-300" aria-label="Gray"></button>
            <button className="w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-300" aria-label="Black"></button>
            <button className="w-8 h-8 rounded-full bg-orange-200 border-2 border-gray-300" aria-label="Peach"></button>
            <button className="w-8 h-8 rounded-full bg-yellow-100 border-2 border-gray-300" aria-label="Cream"></button>
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Size</span>
            <span className="text-sm">Find My Size</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button className="border py-2 text-center text-sm hover:border-black">XS</button>
            <button className="border py-2 text-center text-sm hover:border-black">S</button>
            <button className="border py-2 text-center text-sm hover:border-black">M</button>
            <button className="border py-2 text-center text-sm hover:border-black">L</button>
            <button className="border py-2 text-center text-sm hover:border-black">XL</button>
            <button className="border py-2 text-center text-sm hover:border-black">XXL</button>
            <button className="border py-2 text-center text-sm hover:border-black">XXXL</button>
          </div>
          <div className="flex items-center justify-between">
            <span className="hover:underline cursor-pointer">
  Size Guide
</span>
            <span className="text-sm text-gray-500">Model is about 6'1" in size M.</span>
          </div>
        </div>

        <div className="text-sm">In Stock</div>

        {/* Add to Cart */}
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Qty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex-1 bg-black hover:bg-gray-800 text-white rounded-none py-6">
            Add to Bag - $16.99
          </Button>
        </div>

        {/* Shipping Info */}
        <div className="text-sm">Free Standard Shipping on Orders $100+</div>

        {/* Payment Options */}
        <div className="flex items-center space-x-2 text-sm">
          <div className="bg-black text-white px-1 py-0.5 text-xs">A</div>
          <span>Afterpay available for orders between $35 - $1,000</span>
          <span className="border rounded-full w-4 h-4 flex items-center justify-center text-xs">i</span>
        </div>

        {/* Accordion Sections */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="product-details">
            <AccordionTrigger className="text-base font-medium py-4 [&>svg]:rotate-[-90deg] [&[data-state=open]>svg]:rotate-0">
              Product Details
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                Classic cotton t-shirt featuring the iconic Hilfiger 1985 logo print on the front. Made from soft,
                breathable cotton for all-day comfort.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger className="text-base font-medium py-4 [&>svg]:rotate-[-90deg] [&[data-state=open]>svg]:rotate-0">
              Shipping & Returns
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                Free standard shipping on orders over $100. Returns accepted within 30 days of purchase.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews">
            <AccordionTrigger className="text-base font-medium py-4 [&>svg]:rotate-[-90deg] [&[data-state=open]>svg]:rotate-0">
              Reviews (93)
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">4.5 / 5</span>
              </div>
              <p className="text-sm">Based on 93 customer reviews</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="questions">
            <AccordionTrigger className="text-base font-medium py-4 [&>svg]:rotate-[-90deg] [&[data-state=open]>svg]:rotate-0">
              Questions & Answers (35)
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">Have a question about this product? Our customer service team is here to help.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
