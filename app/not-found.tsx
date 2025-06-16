// app/not-found.tsx (Tailwind version)

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Tommy Hilfiger",
  description: "The page you're looking for doesn't exist.",
  robots: "noindex, nofollow",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <a 
        href="/"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Return to Homepage
      </a>
    </div>
  );
}
