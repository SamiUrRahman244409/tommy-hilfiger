import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductActions() {
  return (
    <>
      <div className="text-sm">In Stock</div>

      {/* Add to Cart */}
      <div className="flex items-center space-x-2">
        <Select>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Qty" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((qty) => (
              <SelectItem key={qty} value={qty.toString()}>
                {qty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="flex-1 bg-black hover:bg-gray-800 text-white rounded-none py-6">Add to Bag - $25.68</Button>
      </div>

      {/* Shipping Info */}
      <div className="text-sm">Free Standard Shipping on Orders $100+</div>

      {/* Payment Options */}
      <div className="flex items-center space-x-2 text-sm">
        <div className="bg-black text-white px-1 py-0.5 text-xs">$</div>
        <span>Afterpay available for orders between $35 - $1,000</span>
        <span className="border rounded-full w-4 h-4 flex items-center justify-center text-xs">i</span>
      </div>
    </>
  )
}
