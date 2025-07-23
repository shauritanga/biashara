'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { validateEmail, validatePhone } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

interface UpdateProfileData {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  profession?: string
  businessType?: string
  skills?: string[]
  clubIds?: number[]
  avatar?: string
  providerId?: number
  institutionId?: number
}

// Get current user's full profile
export async function getUserProfile() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true
          }
        },
        institution: {
          select: {
            id: true,
            name: true,
            slug: true,
            level: true,
            logo: true
          }
        },
        cv: true,
        portfolios: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' },
          take: 6
        },
        products: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 6
        },
        feedItems: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!user) {
      return { error: 'User not found' }
    }

    // Get user's clubs
    const clubs = await prisma.club.findMany({
      where: { id: { in: user.clubIds } },
      select: {
        id: true,
        name: true,
        slug: true,
        sport: true,
        logo: true
      }
    })

    // Get user stats
    const stats = {
      totalPosts: await prisma.feedItem.count({
        where: { userId: user.id, isActive: true }
      }),
      totalProducts: await prisma.product.count({
        where: { userId: user.id, isActive: true }
      }),
      totalPortfolios: await prisma.portfolio.count({
        where: { userId: user.id, isPublished: true }
      }),
      totalConnections: await prisma.user.count({
        where: {
          OR: [
            { providerId: user.providerId },
            { institutionId: user.institutionId },
            { clubIds: { hasSome: user.clubIds } }
          ],
          NOT: { id: user.id }
        }
      })
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user

    return {
      success: true,
      data: {
        ...userWithoutPassword,
        clubs,
        stats
      }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return { error: 'Failed to fetch profile' }
  }
}

// Update user profile
export async function updateUserProfile(data: UpdateProfileData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Validate input
    if (data.email && !validateEmail(data.email)) {
      return { error: 'Invalid email address' }
    }

    if (data.phone && !validatePhone(data.phone)) {
      return { error: 'Invalid phone number' }
    }

    // Check if email/phone already exists (if being updated)
    if (data.email || data.phone) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            ...(data.email ? [{ email: data.email }] : []),
            ...(data.phone ? [{ phone: data.phone }] : [])
          ],
          NOT: { id: currentUser.userId }
        }
      })

      if (existingUser) {
        return { error: 'Email or phone number already in use' }
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.userId },
      data: {
        ...(data.firstName && { firstName: data.firstName.trim() }),
        ...(data.lastName && { lastName: data.lastName.trim() }),
        ...(data.email && { email: data.email }),
        ...(data.phone && { phone: data.phone }),
        ...(data.profession && { profession: data.profession.trim() }),
        ...(data.businessType && { businessType: data.businessType }),
        ...(data.skills && { skills: data.skills }),
        ...(data.clubIds && { clubIds: data.clubIds }),
        ...(data.avatar && { avatar: data.avatar }),
        ...(data.providerId !== undefined && { providerId: data.providerId }),
        ...(data.institutionId !== undefined && { institutionId: data.institutionId }),
        updatedAt: new Date()
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        profession: true,
        businessType: true,
        skills: true,
        clubIds: true,
        avatar: true,
        providerId: true,
        institutionId: true,
        updatedAt: true
      }
    })

    // Revalidate profile page
    revalidatePath('/profile')
    revalidatePath('/network')

    return { success: true, data: updatedUser }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { error: 'Failed to update profile' }
  }
}

// Get user's content (posts, products, portfolios)
export async function getUserContent(type?: 'posts' | 'products' | 'portfolios') {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    const content: Record<string, unknown> = {}

    if (!type || type === 'posts') {
      content.posts = await prisma.feedItem.findMany({
        where: { userId: currentUser.userId, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 20
      })
    }

    if (!type || type === 'products') {
      content.products = await prisma.product.findMany({
        where: { userId: currentUser.userId, isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 20
      })
    }

    if (!type || type === 'portfolios') {
      content.portfolios = await prisma.portfolio.findMany({
        where: { userId: currentUser.userId, isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 20
      })
    }

    return { success: true, data: content }
  } catch (error) {
    console.error('Error fetching user content:', error)
    return { error: 'Failed to fetch content' }
  }
}

// Delete user account
export async function deleteUserAccount() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Delete user and all related data (cascade delete should handle this)
    await prisma.user.delete({
      where: { id: currentUser.userId }
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting user account:', error)
    return { error: 'Failed to delete account' }
  }
}
