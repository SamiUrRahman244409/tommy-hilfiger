"use client"

import { useState } from "react"

type ColorOption = {
  name: string
  bgClass: string
  textClass?: string
}

export function ProductColorSelector() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>({
    name: "Dark Blue",
    bgClass: "bg-blue-800",
  })

  const colorOptions: ColorOption[] = [
    { name: "Dark Blue", bgClass: "bg-blue-800" },
    { name: "Gray", bgClass: "bg-gray-400" },
    { name: "White", bgClass: "bg-white", textClass: "text-gray-800" },
    { name: "Black", bgClass: "bg-black", textClass: "text-white" },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm">
          Color: <span className="font-medium">{selectedColor.name}</span>
        </span>
        <a className="text-sm">View colors</a>
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
  )
}
