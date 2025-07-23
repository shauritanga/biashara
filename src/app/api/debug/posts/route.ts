import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get all feed items with basic info
    const allFeedItems = await prisma.feedItem.findMany({
      where: { isActive: true },
      select: {
        id: true,
        type: true,
        userId: true,
        title: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get all users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true
      }
    })

    // Get posts specifically
    const posts = await prisma.feedItem.findMany({
      where: {
        isActive: true,
        type: 'post'
      },
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

    // Get feed items with users
    const feedItemsWithUsers = await prisma.feedItem.findMany({
      where: { isActive: true },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      take: 10
    })

    return NextResponse.json({
      success: true,
      data: {
        totalFeedItems: allFeedItems.length,
        totalUsers: allUsers.length,
        totalPosts: posts.length,
        feedItemTypes: allFeedItems.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        postsWithUsers: posts.filter(p => p.user).length,
        feedItemsWithUsers: feedItemsWithUsers.filter(item => item.user).length,
        uniqueUserIdsInFeed: [...new Set(allFeedItems.filter(item => item.userId).map(item => item.userId))],
        samplePosts: posts.slice(0, 3).map(p => ({
          id: p.id,
          type: p.type,
          title: p.title,
          userId: p.userId,
          hasUser: !!p.user,
          userName: p.user ? `${p.user.firstName} ${p.user.lastName}` : null
        })),
        sampleFeedItems: feedItemsWithUsers.slice(0, 5).map(item => ({
          id: item.id,
          type: item.type,
          title: item.title,
          userId: item.userId,
          hasUser: !!item.user,
          userName: item.user ? `${item.user.firstName} ${item.user.lastName}` : null
        })),
        allUsers: allUsers.map(u => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          createdAt: u.createdAt
        }))
      }
    })
  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch debug data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
