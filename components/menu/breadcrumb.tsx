import Link from "next/link"

export const Breadcrumb = () => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:underline">
            Men
          </Link>
        </li>
        <li>Accessories</li>
      </ul>
    </div>
  )
}
