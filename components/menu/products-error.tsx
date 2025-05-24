"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ProductsErrorProps {
  error: string
  onRetry: () => void
}

export function ProductsError({ error, onRetry }: ProductsErrorProps) {
  return (
    <div className="w-full py-12">
      <Alert className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Products</AlertTitle>
        <AlertDescription className="mt-2">{error}</AlertDescription>
        <Button onClick={onRetry} variant="outline" size="sm" className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </Alert>
    </div>
  )
}
