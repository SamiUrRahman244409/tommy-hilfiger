"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ProductQuickViewImages } from "./product-quick-view-images"
import { ProductQuickViewDetails } from "./product-quick-view-details"
import type { Product } from "@/types"

interface ProductQuickViewContentProps {
  product: Product
  selectedColor: string | null
  selectedSize: string | null
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
  onClose: () => void
}

export function ProductQuickViewContent({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  onClose,
}: ProductQuickViewContentProps) {
  const [isLeftSideScrolledToBottom, setIsLeftSideScrolledToBottom] = useState(false)
  const leftSideRef = useRef<HTMLDivElement>(null)
  const rightSideRef = useRef<HTMLDivElement>(null)

  const checkLeftSideScroll = () => {
    if (leftSideRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = leftSideRef.current
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 5
      setIsLeftSideScrolledToBottom(isAtBottom)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY

    if (delta > 0) {
      if (!isLeftSideScrolledToBottom && leftSideRef.current) {
        leftSideRef.current.scrollTop += 30
        checkLeftSideScroll()
      } else if (rightSideRef.current) {
        rightSideRef.current.scrollTop += 30
      }
    } else if (delta < 0) {
      if (rightSideRef.current && rightSideRef.current.scrollTop > 0) {
        rightSideRef.current.scrollTop -= 30
      } else if (leftSideRef.current) {
        leftSideRef.current.scrollTop -= 30
        checkLeftSideScroll()
      }
    }
  }

  return (
    <div className="flex h-full" onWheel={handleWheel}>
      <ProductQuickViewImages product={product} leftSideRef={leftSideRef} onScroll={checkLeftSideScroll} />
      <ProductQuickViewDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorChange={onColorChange}
        onSizeChange={onSizeChange}
        onClose={onClose}
        rightSideRef={rightSideRef}
      />
    </div>
  )
}
