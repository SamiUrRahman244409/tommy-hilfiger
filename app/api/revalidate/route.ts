import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')

    // Verify secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Revalidate specific path
    if (path) {
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString(),
      })
    }

    // Revalidate specific tag
    if (tag) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
      })
    }

    // Revalidate all pages
    revalidatePath('/')
    revalidatePath('/menu')
    revalidatePath('/cart')
    revalidatePath('/checkout')
    revalidatePath('/checkout/success')
    revalidatePath('/products/detail/[slug]')
    
    // Revalidate tags
    revalidateTag('products')
    revalidateTag('strapi')
    revalidateTag('categories')

    console.log('Revalidated all pages and tags')
    return NextResponse.json({
      revalidated: true,
      message: 'All pages and tags revalidated',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Revalidation failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Revalidation API endpoint',
    usage: 'POST /api/revalidate?secret=your-secret&path=/menu',
    availablePaths: [
      '/',
      '/menu',
      '/cart',
      '/checkout',
      '/checkout/success',
      '/products/detail/[slug]'
    ],
    availableTags: ['products', 'strapi', 'categories']
  })
} 