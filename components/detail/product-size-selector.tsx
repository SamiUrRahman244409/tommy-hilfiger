"use client"

interface ProductSizeSelectorProps {
  selectedSize: string | null
  onSizeChange?: (size: string) => void
  setSelectedSize?: (size: string) => void
  variant?: "detail" | "sidebar"
}

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

export function ProductSizeSelector({
  selectedSize,
  onSizeChange,
  setSelectedSize,
  variant = "detail",
}: ProductSizeSelectorProps) {
  // Handle size selection with either callback
  const handleSizeSelect = (size: string) => {
    if (onSizeChange) {
      onSizeChange(size)
    }
    if (setSelectedSize) {
      setSelectedSize(size)
    }
  }

  // Render different UI based on variant
  if (variant === "sidebar") {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Size</span>
          <span className="text-sm">{selectedSize}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              className={`border py-2 text-center ${
                selectedSize === size ? "bg-black text-white" : "bg-gray-100 hover:border-black"
              }`}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Default detail page variant
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm">Size: {selectedSize && <span className="font-medium">{selectedSize}</span>}</span>
        <a className="text-sm">Find My Size</a>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sizeOptions.map((size) => (
          <button
            key={size}
            className={`border py-2 text-center text-sm transition-all duration-200 ${
              selectedSize === size ? "bg-black text-white font-medium" : "hover:border-black bg-gray-50"
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
