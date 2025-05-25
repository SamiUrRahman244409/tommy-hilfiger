"use client"

import { X, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface FilterOption {
  name: string
  count: number
}

interface FilterSection {
  title: string
  options: FilterOption[]
  isExpanded?: boolean
}

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Category: true,
    Size: false,
    Price: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const categoryOptions: FilterOption[] = [
    { name: "Shirts", count: 65 },
    { name: "Pants", count: 56 },
    { name: "Shoes", count: 34 },
    { name: "Blazers", count: 5 },
    { name: "Hoodies + Sweatshirts", count: 53 },
    { name: "Jackets + Coats", count: 31 },
    { name: "Jeans", count: 23 },
    { name: "Hats", count: 34 },
    { name: "Bags", count: 65 },
    { name: "Belts", count: 19 },
    { name: "Fragrance", count: 14 },
    { name: "Jewelry", count: 15 },
    { name: "Luggage", count: 15 },
    { name: "Underwear", count: 109 },
    { name: "Wallets", count: 13 },
    { name: "Watches", count: 34 },
    { name: "Umbrellas", count: 4 },
  ]

  const sizeOptions: FilterOption[] = [
    { name: "XS", count: 120 },
    { name: "S", count: 245 },
    { name: "M", count: 356 },
    { name: "L", count: 289 },
    { name: "XL", count: 198 },
    { name: "XXL", count: 87 },
  ]


  const priceOptions: FilterOption[] = [
    { name: "$0 - $25", count: 245 },
    { name: "$25 - $50", count: 356 },
    { name: "$50 - $100", count: 289 },
    { name: "$100 - $200", count: 156 },
    { name: "$200+", count: 78 },
  ]


  const filterSections: FilterSection[] = [
    { title: "Category", options: categoryOptions, isExpanded: true },
    { title: "Size", options: sizeOptions },
    { title: "Price", options: priceOptions },
  ]

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    Category: [],
    Size: [],
    Price: [],
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
      Price: [],
    })
  }

  const totalSelectedFilters = Object.values(selectedFilters).flat().length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl p-0 overflow-hidden max-h-[90vh]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-medium">Filter</h2>
            <button onClick={onClose} className="p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-grow">
            {filterSections.map((section) => (
              <div key={section.title} className="border-b">
                <button
                  className="flex items-center justify-between w-full p-4"
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
                        <label key={option.name} className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            checked={selectedFilters[section.title]?.includes(option.name) || false}
                            onChange={() => toggleFilter(section.title, option.name)}
                          />
                          <span className="ml-2">
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
            <button onClick={clearAll} className="flex-1 py-3 border border-black font-medium">
              Clear All
            </button>
            <button onClick={onClose} className="flex-1 py-3 bg-black text-white font-medium">
              View 1,581 Items
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
