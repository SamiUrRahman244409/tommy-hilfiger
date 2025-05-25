"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface FilterOption {
  name: string
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
  onCategoryChange?: (categories: string[]) => void
  selectedCategories?: string[]
  onSizeChange?: (sizes: string[]) => void
  selectedSizes?: string[]
  onPriceChange?: (priceRanges: string[]) => void
  selectedPriceRanges?: string[]
  onClearAll?: () => void
}

export function FilterSidebar({
  isOpen,
  onClose,
  activeFilter,
  onCategoryChange,
  selectedCategories = [],
  onSizeChange,
  selectedSizes = [],
  onPriceChange,
  selectedPriceRanges = [],
  onClearAll,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Category: false,
    Size: false,
    Price: false,
  })

  // Reset expanded sections when the active filter changes
  useEffect(() => {
    if (activeFilter && activeFilter !== "All") {
      setExpandedSections({
        Category: activeFilter === "Category",
        Size: activeFilter === "Size",
        Price: activeFilter === "Price",
      })
    } else if (activeFilter === "All") {
      // Expand all sections when "All Filters" is clicked
      setExpandedSections({
        Category: true,
        Size: true,
        Price: true,
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
  const categoryOptions: FilterOption[] = [{ name: "Men" }, { name: "Women" }, { name: "Accessories" }]

  const sizeOptions: FilterOption[] = [{ name: "S" }, { name: "M" }, { name: "L" }]

  const priceOptions: FilterOption[] = [
    { name: "$0 - $25" },
    { name: "$25 - $50" },
    { name: "$50 - $100" },
    { name: "$100 - $200" },
    { name: "$200+" },
  ]

  const filterSections: FilterSection[] = [
    { title: "Category", options: categoryOptions },
    { title: "Size", options: sizeOptions },
    { title: "Price", options: priceOptions },
  ]

  const toggleCategoryFilter = (option: string) => {
    if (onCategoryChange) {
      const current = [...selectedCategories]
      const categoryValue = option.toLowerCase()
      const index = current.indexOf(categoryValue)

      if (index === -1) {
        current.push(categoryValue)
      } else {
        current.splice(index, 1)
      }

      onCategoryChange(current)
    }
  }

  const toggleSizeFilter = (option: string) => {
    if (onSizeChange) {
      const current = [...selectedSizes]
      const index = current.indexOf(option)

      if (index === -1) {
        current.push(option)
      } else {
        current.splice(index, 1)
      }

      onSizeChange(current)
    }
  }

  const togglePriceFilter = (option: string) => {
    if (onPriceChange) {
      const current = [...selectedPriceRanges]
      const index = current.indexOf(option)

      if (index === -1) {
        current.push(option)
      } else {
        current.splice(index, 1)
      }

      onPriceChange(current)
    }
  }

  const getFilterToggleFunction = (section: string) => {
    switch (section) {
      case "Category":
        return toggleCategoryFilter
      case "Size":
        return toggleSizeFilter
      case "Price":
        return togglePriceFilter
      default:
        return () => {}
    }
  }

  const isOptionSelected = (section: string, option: string) => {
    switch (section) {
      case "Category":
        return selectedCategories.includes(option.toLowerCase())
      case "Size":
        return selectedSizes.includes(option)
      case "Price":
        return selectedPriceRanges.includes(option)
      default:
        return false
    }
  }

  const clearAll = () => {
    if (onClearAll) {
      onClearAll()
    }
  }

  const getTotalSelectedItems = () => {
    let total = 0
    total += selectedCategories.length
    total += selectedSizes.length
    total += selectedPriceRanges.length
    return total
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
                            checked={isOptionSelected(section.title, option.name)}
                            onChange={() => getFilterToggleFunction(section.title)(option.name)}
                          />
                          <span className="ml-2 text-sm">{option.name}</span>
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
              onClick={() => {
                if (onClearAll) {
                  onClearAll()
                }
              }}
              className="flex-1 py-3 border border-black font-medium hover:bg-gray-50 transition-colors rounded"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded"
            >
              View Filtered Items
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
