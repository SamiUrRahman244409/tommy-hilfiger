import { ChevronRight } from "lucide-react"

export function ProductBreadcrumbs() {
  return (
    <div className="flex items-center text-sm text-gray-500">
      <a href="#" className="hover:underline">
        Men
      </a>
      <ChevronRight className="h-4 w-4 mx-1" />
      <a href="#" className="hover:underline">
        Clothing
      </a>
    </div>
  )
}
