"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface FilterOption {
  name: string
  count: number
}

interface FilterSection {
  title: string
  options: FilterOption[]
  isExpanded?: boolean
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeFilter: string | null
  onCategoryChange?: (category: string | null) => void
  activeCategory?: string | null
}

export function FilterSidebar({ isOpen, onClose, activeFilter, onCategoryChange, activeCategory }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Category: false,
    Size: false,
    Color: false,
    Price: false,
    Fit: false,
  })

  // Reset expanded sections when the active filter changes
  useEffect(() => {
    if (activeFilter && activeFilter !== "All") {
      setExpandedSections({
        Category: activeFilter === "Category",
        Size: activeFilter === "Size",
        Color: activeFilter === "Color",
        Price: activeFilter === "Price",
        Fit: activeFilter === "Fit",
      })
    } else if (activeFilter === "All") {
      // Expand all sections when "All Filters" is clicked
      setExpandedSections({
        Category: true,
        Size: true,
        Color: true,
        Price: true,
        Fit: true,
      })
    }
  }, [activeFilter, isOpen])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Only show main categories
  const categoryOptions: FilterOption[] = [
    { name: "Men", count: 156 },
    { name: "Women", count: 234 },
    { name: "Accessories", count: 89 },
  ]

  const sizeOptions: FilterOption[] = [
    { name: "XS", count: 120 },
    { name: "S", count: 245 },
    { name: "M", count: 356 },
    { name: "L", count: 289 },
    { name: "XL", count: 198 },
    { name: "XXL", count: 87 },
  ]

  const colorOptions: FilterOption[] = [
    { name: "Black", count: 234 },
    { name: "White", count: 198 },
    { name: "Blue", count: 156 },
    { name: "Red", count: 89 },
    { name: "Green", count: 67 },
    { name: "Gray", count: 145 },
  ]

  const priceOptions: FilterOption[] = [
    { name: "$0 - $25", count: 245 },
    { name: "$25 - $50", count: 356 },
    { name: "$50 - $100", count: 289 },
    { name: "$100 - $200", count: 156 },
    { name: "$200+", count: 78 },
  ]

  const fitOptions: FilterOption[] = [
    { name: "Regular", count: 456 },
    { name: "Slim", count: 234 },
    { name: "Relaxed", count: 189 },
    { name: "Oversized", count: 123 },
  ]

  const filterSections: FilterSection[] = [
    { title: "Category", options: categoryOptions },
    { title: "Size", options: sizeOptions },
    { title: "Color", options: colorOptions },
    { title: "Price", options: priceOptions },
    { title: "Fit", options: fitOptions },
  ]

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    Category: activeCategory ? [activeCategory] : [],
    Size: [],
    Color: [],
    Price: [],
    Fit: [],
  })

  const toggleFilter = (section: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = [...(prev[section] || [])]
      const index = current.indexOf(option)

      if (index === -1) {
        current.push(option)
      } else {
        current.splice(index, 1)
      }

      // Handle category selection
      if (section === "Category" && onCategoryChange) {
        if (current.length > 0) {
          onCategoryChange(current[0].toLowerCase()) // Use the first selected category
        } else {
          onCategoryChange(null) // No category selected
        }
      }

      return {
        ...prev,
        [section]: current,
      }
    })
  }

  const clearAll = () => {
    setSelectedFilters({
      Category: [],
      Size: [],
      Color: [],
      Price: [],
      Fit: [],
    })
    if (onCategoryChange) {
      onCategoryChange(null)
    }
  }

  const getTotalSelectedItems = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-medium">Filter</SheetTitle>
            </div>
          </SheetHeader>

          <div className="overflow-y-auto flex-grow">
            {filterSections.map((section) => (
              <div key={section.title} className="border-b">
                <button
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(section.title)}
                >
                  <span className="font-medium">{section.title}</span>
                  {expandedSections[section.title] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {expandedSections[section.title] && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 gap-2">
                      {section.options.map((option) => (
                        <label
                          key={option.name}
                          className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            checked={selectedFilters[section.title]?.includes(option.name) || false}
                            onChange={() => toggleFilter(section.title, option.name)}
                          />
                          <span className="ml-2 text-sm">
                            {option.name} ({option.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-4">
            <button
              onClick={clearAll}
              className="flex-1 py-3 border border-black font-medium hover:bg-gray-50 transition-colors rounded"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded"
            >
              View {getTotalSelectedItems() > 0 ? "Filtered" : "1,581"} Items
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
