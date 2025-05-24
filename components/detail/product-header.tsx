import { Star } from "lucide-react"

export function ProductHeader() {
  return (
    <>
      {/* Product Title */}
      <h1 className="text-2xl font-bold">Hilfiger 1985 Logo T-Shirt</h1>

      {/* Price */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 line-through">$39.50</span>
        <span className="font-bold text-lg">$25.68</span>
        <span className="text-red-600 font-medium">35% off</span>
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
    </>
  )
}
