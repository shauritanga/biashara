import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated',
        debug: {
          hasCurrentUser: false
        }
      })
    }

    // Get all feed items by this user
    const userFeedItems = await prisma.feedItem.findMany({
      where: { userId: currentUser.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    // Get posts specifically
    const userPosts = await prisma.feedItem.findMany({
      where: { 
        userId: currentUser.userId,
        type: 'post'
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    // Get user info
    const userInfo = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profession: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      debug: {
        currentUserFromJWT: currentUser,
        userInfo: userInfo,
        totalFeedItems: userFeedItems.length,
        totalPosts: userPosts.length,
        feedItems: userFeedItems.map(item => ({
          id: item.id,
          type: item.type,
          title: item.title,
          createdAt: item.createdAt,
          hasUser: !!item.user,
          userName: item.user ? `${item.user.firstName} ${item.user.lastName}` : null
        })),
        posts: userPosts.map(post => ({
          id: post.id,
          type: post.type,
          title: post.title,
          createdAt: post.createdAt,
          hasUser: !!post.user,
          userName: post.user ? `${post.user.firstName} ${post.user.lastName}` : null
        }))
      }
    })
  } catch (error) {
    console.error('User posts debug error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to debug user posts',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
