"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ProductDetailSidebarProps {
  isOpen: boolean
  onClose: () => void
  content: string
}

export function ProductDetailSidebar({ isOpen, onClose, content }: ProductDetailSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      // Apply styles to prevent layout shift
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`

      // Also apply to fixed elements that might be affected
      const header = document.querySelector("header")
      if (header && header.classList.contains("fixed")) {
        header.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      // Reset styles
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      const header = document.querySelector("header")
      if (header && header.classList.contains("fixed")) {
        header.style.paddingRight = ""
      }
    }

    return () => {
      // Cleanup
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      const header = document.querySelector("header")
      if (header && header.classList.contains("fixed")) {
        header.style.paddingRight = ""
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const renderContent = () => {
    switch (content) {
      case "product-details":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">
                Tommy Hilfiger men's T-shirt. Made from a cotton-jersey knit with a smooth, soft feel and excellent
                stretch, our tee is super comfortable.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    • This product contains regenerative cotton which is grown using farming methods that seek to
                    improve soil health, watersheds and biodiversity.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">• Body length from high point of shoulder: 28.5"</p>
                  <p className="text-sm text-gray-700">• Measurements based on a size M.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <span className="text-sm text-gray-600">Fit</span>
                  </div>
                  <div>
                    <span className="text-sm">Regular Fit</span>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Composition</span>
                  </div>
                  <div>
                    <span className="text-sm">100% regenerative cotton.</span>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Care</span>
                  </div>
                  <div>
                    <span className="text-sm">Machine washable.</span>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Origin</span>
                  </div>
                  <div>
                    <span className="text-sm">Imported.</span>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Style</span>
                  </div>
                  <div>
                    <span className="text-sm text-blue-600">78JB151-C1O</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "shipping":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Shipping & Returns</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Shipping Options</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Standard Shipping: 3-5 business days - FREE on orders $100+</li>
                    <li>• Express Shipping: 1-2 business days - $15</li>
                    <li>• Next Day Delivery: Order by 2PM EST - $25</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Returns & Exchanges</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Free returns within 30 days of purchase</li>
                    <li>• Items must be in original condition with tags</li>
                    <li>• Easy online return process</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">International Shipping</h3>
                  <p className="text-sm text-gray-700">
                    We ship to over 100 countries worldwide. International shipping rates and delivery times vary by
                    destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "reviews":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-medium">4.5 out of 5</span>
                  <span className="text-gray-600">(93 reviews)</span>
                </div>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium">John D.</span>
                      <span className="text-xs text-gray-500">Verified Purchase</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Great fit and very comfortable. The fabric feels premium and the color is exactly as shown.
                      Highly recommend!"
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                        <span className="text-gray-300 text-sm">★</span>
                      </div>
                      <span className="text-sm font-medium">Sarah M.</span>
                      <span className="text-xs text-gray-500">Verified Purchase</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Nice quality shirt. Runs slightly large so consider sizing down. The cotton is soft and
                      breathable."
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium">Mike R.</span>
                      <span className="text-xs text-gray-500">Verified Purchase</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Perfect everyday t-shirt. The logo is subtle and the fit is exactly what I expected. Will buy
                      more colors."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "questions":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Questions & Answers</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium text-sm mb-2">Q: Does this shirt run true to size?</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    A: Yes, this shirt fits true to size. If you're between sizes, we recommend sizing up for a more
                    comfortable fit.
                  </p>
                  <span className="text-xs text-gray-500">Answered by Tommy Hilfiger Team</span>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium text-sm mb-2">Q: What's the fabric composition?</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    A: This t-shirt is made from 100% regenerative cotton, which is grown using sustainable farming
                    methods.
                  </p>
                  <span className="text-xs text-gray-500">Answered by Tommy Hilfiger Team</span>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium text-sm mb-2">Q: How should I care for this shirt?</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    A: Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed.
                  </p>
                  <span className="text-xs text-gray-500">Answered by Tommy Hilfiger Team</span>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium text-sm mb-2">Q: Is this shirt pre-shrunk?</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    A: Yes, this shirt is pre-shrunk to minimize shrinkage after washing. Follow care instructions for
                    best results.
                  </p>
                  <span className="text-xs text-gray-500">Answered by Tommy Hilfiger Team</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Content not found</div>
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black bg-opacity-50 transition-opacity duration-300" onClick={onClose} />

      {/* Sidebar */}
      <div className="w-96 bg-white h-full overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img
                src="https://usa.tommy.com/on/demandware.static/-/Sites-PVHTHUS-Library/default/dw6244e61b/logo/Logo.svg"
                alt="Tommy Hilfiger"
                className="h-6"
              />
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
