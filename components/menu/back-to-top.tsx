"use client"

import { ChevronUp } from "lucide-react"

interface BackToTopProps {
  show: boolean
}

export function BackToTop({ show }: BackToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!show) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-white rounded-full w-12 h-12 shadow-md border border-gray-300 z-50 flex flex-col items-center justify-center"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" />
      <span className="text-xs mt-1">Top</span>
    </button>
  )
}
