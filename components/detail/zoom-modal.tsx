"use client"

import { X } from "lucide-react"

interface ZoomModalProps {
  isOpen: boolean
  imageSrc: string
  onClose: () => void
}

export function ZoomModal({ isOpen, imageSrc, onClose }: ZoomModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <button
          className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-1"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <X className="h-6 w-6" />
        </button>
        <img
          src={imageSrc || "/placeholder.svg"}
          alt="Zoomed product image"
          className="max-w-full max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}
