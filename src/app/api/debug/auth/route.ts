import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // Get raw cookie
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth-token')
    
    // Get current user from auth
    const currentUser = await getCurrentUser()
    
    // Get all users from database
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true
      }
    })
    
    // If we have a current user, get their full data
    let userFromDb = null
    if (currentUser) {
      userFromDb = await prisma.user.findUnique({
        where: { id: currentUser.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profession: true,
          country: true,
          createdAt: true,
          isVerified: true
        }
      })
    }
    
    // Get recent feed items created by the current user
    let userFeedItems: Array<{
      id: number;
      type: string;
      title: string;
      createdAt: Date;
    }> = []
    if (currentUser) {
      userFeedItems = await prisma.feedItem.findMany({
        where: { userId: currentUser.userId },
        select: {
          id: true,
          type: true,
          title: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    }

    return NextResponse.json({
      success: true,
      debug: {
        hasAuthToken: !!authToken,
        authTokenValue: authToken?.value ? `${authToken.value.substring(0, 20)}...` : null,
        currentUserFromJWT: currentUser,
        userFromDatabase: userFromDb,
        userExists: !!userFromDb,
        totalUsersInDb: allUsers.length,
        allUsers: allUsers,
        userFeedItems: userFeedItems,
        userFeedItemsCount: userFeedItems.length
      }
    })
  } catch (error) {
    console.error('Auth debug error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to debug auth',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
