'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export interface InteractionCounts {
  likes: number
  comments: number
  shares: number
  bookmarks: number
}

export interface UserInteractions {
  hasLiked: boolean
  hasBookmarked: boolean
  hasShared: boolean
}

// Get interaction counts for a feed item
export async function getInteractionCounts(feedItemId: number): Promise<InteractionCounts> {
  try {
    const [likes, comments, shares, bookmarks] = await Promise.all([
      prisma.interaction.count({
        where: { feedItemId, type: 'like' }
      }),
      prisma.interaction.count({
        where: { feedItemId, type: 'comment' }
      }),
      prisma.interaction.count({
        where: { feedItemId, type: 'share' }
      }),
      prisma.interaction.count({
        where: { feedItemId, type: 'save' }
      })
    ])

    return { likes, comments, shares, bookmarks }
  } catch (error) {
    console.error('Error getting interaction counts:', error)
    return { likes: 0, comments: 0, shares: 0, bookmarks: 0 }
  }
}

// Get user's interactions for a feed item
export async function getUserInteractions(feedItemId: number): Promise<UserInteractions> {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { hasLiked: false, hasBookmarked: false, hasShared: false }
    }

    const interactions = await prisma.interaction.findMany({
      where: {
        feedItemId,
        userId: currentUser.userId,
        type: { in: ['like', 'save', 'share'] }
      },
      select: { type: true }
    })

    return {
      hasLiked: interactions.some(i => i.type === 'like'),
      hasBookmarked: interactions.some(i => i.type === 'save'),
      hasShared: interactions.some(i => i.type === 'share')
    }
  } catch (error) {
    console.error('Error getting user interactions:', error)
    return { hasLiked: false, hasBookmarked: false, hasShared: false }
  }
}

// Toggle like interaction
export async function toggleLike(feedItemId: number) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Check if user already liked this item
    const existingLike = await prisma.interaction.findUnique({
      where: {
        userId_feedItemId_type: {
          userId: currentUser.userId,
          feedItemId,
          type: 'like'
        }
      }
    })

    if (existingLike) {
      // Remove like
      await prisma.interaction.delete({
        where: { id: existingLike.id }
      })
    } else {
      // Add like
      await prisma.interaction.create({
        data: {
          userId: currentUser.userId,
          feedItemId,
          type: 'like'
        }
      })
    }

    // Revalidate pages that might show this content
    revalidatePath('/')
    revalidatePath('/posts')
    
    return { success: true }
  } catch (error) {
    console.error('Error toggling like:', error)
    return { error: 'Failed to toggle like' }
  }
}

// Toggle bookmark interaction
export async function toggleBookmark(feedItemId: number) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Check if user already bookmarked this item
    const existingBookmark = await prisma.interaction.findUnique({
      where: {
        userId_feedItemId_type: {
          userId: currentUser.userId,
          feedItemId,
          type: 'save'
        }
      }
    })

    if (existingBookmark) {
      // Remove bookmark
      await prisma.interaction.delete({
        where: { id: existingBookmark.id }
      })
    } else {
      // Add bookmark
      await prisma.interaction.create({
        data: {
          userId: currentUser.userId,
          feedItemId,
          type: 'save'
        }
      })
    }

    revalidatePath('/')
    revalidatePath('/posts')
    revalidatePath('/bookmarks')
    
    return { success: true }
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    return { error: 'Failed to toggle bookmark' }
  }
}

// Add share interaction
export async function addShare(feedItemId: number) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Add share interaction (can have multiple shares)
    await prisma.interaction.create({
      data: {
        userId: currentUser.userId,
        feedItemId,
        type: 'share'
      }
    })

    revalidatePath('/')
    revalidatePath('/posts')
    
    return { success: true }
  } catch (error) {
    console.error('Error adding share:', error)
    return { error: 'Failed to add share' }
  }
}

// Add comment
export async function addComment(feedItemId: number, content: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    if (!content.trim()) {
      return { error: 'Comment content is required' }
    }

    if (content.length > 500) {
      return { error: 'Comment must be 500 characters or less' }
    }

    const comment = await prisma.interaction.create({
      data: {
        userId: currentUser.userId,
        feedItemId,
        type: 'comment',
        content: content.trim()
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            profession: true
          }
        }
      }
    })

    revalidatePath('/')
    revalidatePath('/posts')
    
    return { success: true, data: comment }
  } catch (error) {
    console.error('Error adding comment:', error)
    return { error: 'Failed to add comment' }
  }
}

// Get comments for a feed item
export async function getComments(feedItemId: number) {
  try {
    const comments = await prisma.interaction.findMany({
      where: {
        feedItemId,
        type: 'comment'
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            profession: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, data: comments }
  } catch (error) {
    console.error('Error getting comments:', error)
    return { error: 'Failed to get comments', data: [] }
  }
}
