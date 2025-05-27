"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SortDropdownProps {
  selectedSort: string
  onSortChange: (sort: string) => void
}

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price Low To High" },
  { value: "price-high-low", label: "Price High To Low" },
]

export function SortDropdown({ selectedSort, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = sortOptions.find((option) => option.value === selectedSort) || sortOptions[0]

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 min-w-[160px] justify-between h-9">
            <span className="text-sm">{selectedOption.label}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                onSortChange(option.value)
                setIsOpen(false)
              }}
              className={`cursor-pointer text-sm ${
                selectedSort === option.value ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
              }`}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
