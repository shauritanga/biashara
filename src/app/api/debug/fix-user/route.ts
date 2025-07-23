import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function POST() {
  return handleFixUser()
}

export async function GET() {
  return handleFixUser()
}

async function handleFixUser() {
  try {
    // Get current user from JWT
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      })
    }

    // Check if user exists in database
    const existingUser = await prisma.user.findUnique({
      where: { id: currentUser.userId }
    })

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: 'User already exists',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName
        }
      })
    }

    // Create the missing user
    const hashedPassword = await hashPassword('defaultpassword123') // Default password
    
    const newUser = await prisma.user.create({
      data: {
        id: currentUser.userId,
        email: currentUser.email,
        phone: '+254700000000', // Default phone number
        firstName: 'User',
        lastName: `${currentUser.userId}`,
        password: hashedPassword,
        country: 'Kenya',
        profession: 'Professional',
        businessType: 'Individual',
        skills: ['General'],
        isVerified: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    })
  } catch (error) {
    console.error('Fix user error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fix user',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
