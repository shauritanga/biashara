import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
  return handleTestPostCreation()
}

export async function GET() {
  return handleTestPostCreation()
}

async function handleTestPostCreation() {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      })
    }

    // First, verify the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: { id: true, firstName: true, lastName: true, email: true }
    })

    if (!userExists) {
      return NextResponse.json({
        success: false,
        error: 'User does not exist in database',
        debug: {
          currentUserFromJWT: currentUser,
          userExists: false
        }
      })
    }

    // Try to create a simple feed item
    try {
      const feedItem = await prisma.feedItem.create({
        data: {
          type: 'post',
          contentId: 0,
          userId: currentUser.userId,
          title: 'Test Post from Debug API',
          description: 'This is a test post to verify post creation works.',
          mediaUrls: [],
          tags: ['test'],
          isPromoted: false,
          isActive: true
        }
      })

      return NextResponse.json({
        success: true,
        message: 'Post created successfully!',
        debug: {
          currentUser: currentUser,
          userExists: userExists,
          createdPost: {
            id: feedItem.id,
            title: feedItem.title,
            userId: feedItem.userId,
            type: feedItem.type
          }
        }
      })
    } catch (createError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to create post',
        debug: {
          currentUser: currentUser,
          userExists: userExists,
          createError: createError instanceof Error ? {
            message: createError.message,
            name: createError.name,
            stack: createError.stack
          } : createError
        }
      })
    }
  } catch (error) {
    console.error('Test post creation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to test post creation',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
