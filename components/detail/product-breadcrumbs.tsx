import { ChevronRight } from "lucide-react"

export function ProductBreadcrumbs() {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <span className="hover:underline cursor-pointer">
  Men
</span>
      <ChevronRight className="h-4 w-4 mx-1" />
      <span className="hover:underline cursor-pointer">
  Clothing
</span>
    </div>
  )
}
