import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { createPost } from '@/app/actions/posts'

export async function POST() {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      })
    }

    // Create a test post
    const result = await createPost({
      title: 'Test Post from Debug API',
      description: 'This is a test post created through the debug API to verify post creation is working.',
      tags: ['test', 'debug', 'api'],
      mediaUrls: []
    })

    return NextResponse.json({
      success: true,
      debug: {
        currentUser: currentUser,
        createPostResult: result
      }
    })
  } catch (error) {
    console.error('Create test post error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create test post',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
