"use client"

import { ChevronDown, SlidersHorizontal } from "lucide-react"

interface FilterButtonsProps {
  onFilterClick: (filter: string) => void
  activeCategory?: string | null
  onCategoryChange: (category: string | null) => void
  productCount?: number
}

export function FilterButtons({
  onFilterClick,
  activeCategory,
  onCategoryChange,
  productCount = 0,
}: FilterButtonsProps) {
  return (
    <div className="w-full pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center justify-between border rounded-full px-4 py-2 min-w-[120px] hover:bg-gray-50 transition-colors"
            onClick={() => onFilterClick("Category")}
          >
            <span>Category</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>
          <button
            className="flex items-center justify-between border rounded-full px-4 py-2 min-w-[120px] hover:bg-gray-50 transition-colors"
            onClick={() => onFilterClick("Size")}
          >
            <span>Size</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>
          <button
            className="flex items-center justify-between border rounded-full px-4 py-2 min-w-[120px] hover:bg-gray-50 transition-colors"
            onClick={() => onFilterClick("Price")}
          >
            <span>Price</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>
          <button
            className="flex items-center justify-between border rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
            onClick={() => onFilterClick("All")}
          >
            <span className="flex items-center">
              All Filters
              <SlidersHorizontal className="h-4 w-4 ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
