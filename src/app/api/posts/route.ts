import { NextResponse } from 'next/server'
import { getAllPostsWithUsers, getAllFeedItemsWithUsers } from '@/app/actions/feed'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'posts' or 'all'
    const limit = searchParams.get('limit')
    
    let result
    
    if (type === 'all') {
      // Get all feed items (posts, products, portfolios, etc.)
      result = await getAllFeedItemsWithUsers(limit ? parseInt(limit) : undefined)
    } else {
      // Get only posts by default
      result = await getAllPostsWithUsers()
    }
    
    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        data: result.data,
        total: result.data.length,
        ...(type === 'all' && 'total' in result && { totalInDatabase: result.total })
      }, { status: 200 })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Posts API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Example usage:
// GET /api/posts - Returns all posts with users
// GET /api/posts?type=all - Returns all feed items with users
// GET /api/posts?type=all&limit=20 - Returns first 20 feed items with users
