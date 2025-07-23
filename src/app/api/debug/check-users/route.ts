import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get current user from JWT
    const currentUser = await getCurrentUser()
    
    // Get all users from database
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true
      },
      orderBy: { id: 'asc' }
    })
    
    // Check if current user exists in database
    let userExistsInDb = false
    let userFromDb = null
    
    if (currentUser) {
      userFromDb = await prisma.user.findUnique({
        where: { id: currentUser.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true
        }
      })
      userExistsInDb = !!userFromDb
    }

    return NextResponse.json({
      success: true,
      debug: {
        currentUserFromJWT: currentUser,
        userExistsInDatabase: userExistsInDb,
        userFromDatabase: userFromDb,
        allUsersInDatabase: allUsers,
        totalUsers: allUsers.length,
        userIds: allUsers.map(u => u.id),
        issue: currentUser && !userExistsInDb ? 'JWT contains user ID that does not exist in database' : null
      }
    })
  } catch (error) {
    console.error('Check users error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to check users',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
