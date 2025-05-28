"use client"

import { ChevronDown, SlidersHorizontal } from "lucide-react"

interface FilterButtonsProps {
  onFilterClick: (filter: string) => void
  selectedCategories: string[]
  onCategoryChange: (category: string | null) => void
  productCount?: number
  selectedSort: string
  onSortChange: (sort: string) => void
}

export function FilterButtons({
  onFilterClick,
  selectedCategories,
  onCategoryChange,
  productCount = 0,
  selectedSort,
  onSortChange,
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

        <div className="flex items-center gap-4">
          {productCount > 0 && (
            <span className="text-sm text-gray-600">
              {productCount} {productCount === 1 ? "product" : "products"}
            </span>
          )}

          <div className="relative">
            <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price Low To High</option>
              <option value="price-high-low">Price High To Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
