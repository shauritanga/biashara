'use server'

import { prisma } from '@/lib/prisma'

export async function getFeedItems(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit

    const feedItems = await prisma.feedItem.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { isPromoted: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: limit,
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

    // Get additional data based on content type
    const enrichedFeedItems = await Promise.all(
      feedItems.map(async (item) => {
        let contentData = null

        switch (item.type) {
          case 'provider':
            contentData = await prisma.provider.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true }
            })
            break
          case 'club':
            contentData = await prisma.club.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true, sport: true }
            })
            break
          case 'institution':
            contentData = await prisma.institution.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true, level: true }
            })
            break
          case 'company':
            contentData = await prisma.company.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true, industry: true }
            })
            break
          case 'portfolio':
            contentData = await prisma.portfolio.findUnique({
              where: { id: item.contentId },
              select: { title: true, skills: true, projectUrl: true, githubUrl: true }
            })
            break
          case 'product':
            contentData = await prisma.product.findUnique({
              where: { id: item.contentId },
              select: { title: true, price: true, currency: true, category: true, location: true }
            })
            break
          case 'innovation':
            contentData = await prisma.innovation.findUnique({
              where: { id: item.contentId },
              include: {
                institution: {
                  select: { name: true, logo: true }
                }
              }
            })
            break
        }

        return {
          ...item,
          contentData
        }
      })
    )

    const totalItems = await prisma.feedItem.count({
      where: { isActive: true }
    })

    return {
      success: true,
      data: enrichedFeedItems,
      pagination: {
        page,
        limit,
        total: totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNext: page * limit < totalItems,
        hasPrev: page > 1
      }
    }
  } catch (error) {
    console.error('Error fetching feed items:', error)
    return {
      success: false,
      error: 'Failed to fetch feed items'
    }
  }
}

export async function getProviders() {
  try {
    const providers = await prisma.provider.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        services: true
      },
      orderBy: { name: 'asc' }
    })

    return { success: true, data: providers }
  } catch (error) {
    console.error('Error fetching providers:', error)
    return { success: false, error: 'Failed to fetch providers' }
  }
}

export async function getClubs() {
  try {
    const clubs = await prisma.club.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        sport: true
      },
      orderBy: { name: 'asc' }
    })

    return { success: true, data: clubs }
  } catch (error) {
    console.error('Error fetching clubs:', error)
    return { success: false, error: 'Failed to fetch clubs' }
  }
}

export async function getInstitutions() {
  try {
    const institutions = await prisma.institution.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        level: true
      },
      orderBy: { name: 'asc' }
    })

    return { success: true, data: institutions }
  } catch (error) {
    console.error('Error fetching institutions:', error)
    return { success: false, error: 'Failed to fetch institutions' }
  }
}

// Get all posts with their users (no pagination)
export async function getAllPostsWithUsers() {
  try {
    const posts = await prisma.feedItem.findMany({
      where: {
        isActive: true,
        type: 'post' // Only get actual posts, not products/portfolios/etc
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            profession: true,
            businessType: true,
            skills: true,
            country: true,
            isVerified: true,
            createdAt: true
          }
        }
      }
    })

    return { success: true, data: posts }
  } catch (error) {
    console.error('Error fetching all posts with users:', error)
    return { success: false, error: 'Failed to fetch posts' }
  }
}

// Get all feed items with their users (includes posts, products, portfolios, etc.)
export async function getAllFeedItemsWithUsers(limit?: number) {
  try {
    const feedItems = await prisma.feedItem.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { isPromoted: 'desc' },
        { createdAt: 'desc' }
      ],
      ...(limit && { take: limit }),
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true,
            profession: true,
            businessType: true,
            skills: true,
            country: true,
            isVerified: true,
            createdAt: true
          }
        }
      }
    })

    // Get additional data based on content type
    const enrichedFeedItems = await Promise.all(
      feedItems.map(async (item) => {
        let contentData = null

        switch (item.type) {
          case 'provider':
            contentData = await prisma.provider.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true }
            })
            break
          case 'club':
            contentData = await prisma.club.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true, sport: true }
            })
            break
          case 'institution':
            contentData = await prisma.institution.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true, level: true }
            })
            break
          case 'company':
            contentData = await prisma.company.findUnique({
              where: { id: item.contentId },
              select: { name: true, logo: true, slug: true, industry: true }
            })
            break
          case 'portfolio':
            contentData = await prisma.portfolio.findUnique({
              where: { id: item.contentId },
              select: { title: true, skills: true, projectUrl: true }
            })
            break
          case 'product':
            contentData = await prisma.product.findUnique({
              where: { id: item.contentId },
              select: { title: true, price: true, currency: true, category: true, location: true }
            })
            break
          case 'innovation':
            contentData = await prisma.innovation.findUnique({
              where: { id: item.contentId },
              include: {
                institution: {
                  select: { name: true, logo: true }
                }
              }
            })
            break
          case 'post':
            // For posts, contentData is null since all data is in the feedItem itself
            contentData = null
            break
        }

        return {
          ...item,
          contentData
        }
      })
    )

    const totalItems = await prisma.feedItem.count({
      where: { isActive: true }
    })

    return {
      success: true,
      data: enrichedFeedItems,
      total: totalItems
    }
  } catch (error) {
    console.error('Error fetching all feed items with users:', error)
    return { success: false, error: 'Failed to fetch feed items' }
  }
}
