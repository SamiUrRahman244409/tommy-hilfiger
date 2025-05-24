"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface ProductQuickViewModalProps {
  children: ReactNode
  onClose: () => void
}

export function ProductQuickViewModal({ children, onClose }: ProductQuickViewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

    return () => {
      // Reset styles
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      const header = document.querySelector("header")
      if (header && header.classList.contains("fixed")) {
        header.style.paddingRight = ""
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="w-1/2 bg-black bg-opacity-50" onClick={onClose}></div>
      <div ref={modalRef} className="w-1/2 bg-white h-full overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  )
}
