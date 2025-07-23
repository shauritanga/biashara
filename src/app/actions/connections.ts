'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// Get users with similar interests/professions
export async function getSimilarUsers(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        profession: true,
        skills: true,
        clubIds: true,
        providerId: true,
        institutionId: true
      }
    })

    if (!user) {
      return { error: 'User not found' }
    }

    // Find users with similar attributes
    const similarUsers = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          {
            OR: [
              { profession: user.profession },
              { skills: { hasSome: user.skills } },
              { clubIds: { hasSome: user.clubIds } },
              { providerId: user.providerId },
              { institutionId: user.institutionId }
            ]
          }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profession: true,
        skills: true,
        avatar: true,
        clubIds: true,
        providerId: true,
        institutionId: true
      },
      take: 20
    })

    return { success: true, data: similarUsers }
  } catch (error) {
    console.error('Error finding similar users:', error)
    return { error: 'Failed to find similar users' }
  }
}

// Get user's business/service recommendations based on their profile
export async function getPersonalizedRecommendations() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      include: {
        provider: true
      }
    })

    if (!user) {
      return { error: 'User not found' }
    }

    // Get recommendations based on user profile
    const recommendations: {
      providers: Array<Record<string, unknown>>;
      clubs: Array<Record<string, unknown>>;
      institutions: Array<Record<string, unknown>>;
      products: Array<Record<string, unknown>>;
      users: Array<Record<string, unknown>>;
    } = {
      providers: [],
      clubs: [],
      institutions: [],
      products: [],
      users: []
    }

    // Provider recommendations (if user doesn't have one or wants to compare)
    const providers = await prisma.provider.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        services: true,
        content: true
      }
    })
    recommendations.providers = providers

    // Club recommendations based on user's interests
    const clubs = await prisma.club.findMany({
      where: {
        OR: [
          { id: { in: user.clubIds } },
          { sport: { in: user.skills } }
        ]
      },
      select: {
        id: true,
        name: true,
        slug: true,
        sport: true,
        logo: true,
        content: true
      }
    })
    recommendations.clubs = clubs

    // Institution recommendations
    const institutions = await prisma.institution.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        level: true,
        logo: true,
        content: true
      },
      take: 10
    })
    recommendations.institutions = institutions

    // Product recommendations based on profession/skills
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { tags: { hasSome: user.skills } },
          ...(user.profession ? [{ category: user.profession }] : [])
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      },
      take: 10
    })
    recommendations.products = products

    // Similar users
    const similarUsersResult = await getSimilarUsers(user.id)
    if (similarUsersResult.success) {
      recommendations.users = similarUsersResult.data
    }

    return { success: true, data: recommendations }
  } catch (error) {
    console.error('Error getting recommendations:', error)
    return { error: 'Failed to get recommendations' }
  }
}

// Connect user to a company/provider/club
export async function connectToEntity(entityType: 'provider' | 'club' | 'institution', entityId: number) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    const updateData: Record<string, unknown> = {}
    
    if (entityType === 'provider') {
      updateData.providerId = entityId
    } else if (entityType === 'club') {
      // Add to clubIds array
      const user = await prisma.user.findUnique({
        where: { id: currentUser.userId },
        select: { clubIds: true }
      })
      
      if (user && !user.clubIds.includes(entityId)) {
        updateData.clubIds = [...user.clubIds, entityId]
      }
    } else if (entityType === 'institution') {
      updateData.institutionId = entityId
    }

    await prisma.user.update({
      where: { id: currentUser.userId },
      data: updateData
    })

    // Create a feed item about this connection
    await prisma.feedItem.create({
      data: {
        type: 'connection',
        contentId: entityId,
        userId: currentUser.userId,
        title: `Connected to ${entityType}`,
        description: `User connected to a new ${entityType}`,
        isActive: true
      }
    })

    return { success: true, message: `Successfully connected to ${entityType}` }
  } catch (error) {
    console.error('Error connecting to entity:', error)
    return { error: 'Failed to connect to entity' }
  }
}

// Get user's network (connections and their activities)
export async function getUserNetwork() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      include: {
        provider: true
      }
    })

    if (!user) {
      return { error: 'User not found' }
    }

    // Get user's clubs
    const clubs = await prisma.club.findMany({
      where: { id: { in: user.clubIds } }
    })

    // Get user's institution
    const institution = user.institutionId ? await prisma.institution.findUnique({
      where: { id: user.institutionId }
    }) : null

    // Get similar users' activities
    const similarUsersResult = await getSimilarUsers(user.id)
    const similarUsers = similarUsersResult.success ? similarUsersResult.data : []

    // Get recent activities from user's network
    const networkActivities = await prisma.feedItem.findMany({
      where: {
        OR: [
          { userId: { in: similarUsers.map(u => u.id) } },
          ...(user.providerId ? [{ type: 'provider' as const, contentId: user.providerId }] : []),
          ...(user.clubIds.length > 0 ? [{ type: 'club' as const, contentId: { in: user.clubIds } }] : []),
          ...(user.institutionId ? [{ type: 'institution' as const, contentId: user.institutionId }] : [])
        ]
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
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    return {
      success: true,
      data: {
        user: {
          ...user,
          provider: user.provider,
          clubs,
          institution
        },
        similarUsers,
        networkActivities
      }
    }
  } catch (error) {
    console.error('Error getting user network:', error)
    return { error: 'Failed to get user network' }
  }
}

// Get businesses from users connected to a specific entity (provider/club/institution)
export async function getConnectedUserBusinesses(entityType: 'provider' | 'club' | 'institution', entityId: number) {
  try {
    let connectedUsers: Array<Record<string, unknown>> = []

    if (entityType === 'provider') {
      connectedUsers = await prisma.user.findMany({
        where: { providerId: entityId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profession: true,
          avatar: true,
          products: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              currency: true,
              mediaUrls: true,
              category: true,
              tags: true
            },
            take: 2 // Limit products per user
          }
        },
        take: 20
      })
    } else if (entityType === 'club') {
      connectedUsers = await prisma.user.findMany({
        where: { clubIds: { has: entityId } },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profession: true,
          avatar: true,
          products: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              currency: true,
              mediaUrls: true,
              category: true,
              tags: true
            },
            take: 2
          }
        },
        take: 20
      })
    } else if (entityType === 'institution') {
      connectedUsers = await prisma.user.findMany({
        where: { institutionId: entityId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profession: true,
          avatar: true,
          products: {
            where: { isActive: true },
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              currency: true,
              mediaUrls: true,
              category: true,
              tags: true
            },
            take: 2
          }
        },
        take: 20
      })
    }

    // Flatten products with seller information
    const businesses = connectedUsers.flatMap(user =>
      (user.products as Array<Record<string, unknown>>).map((product: Record<string, unknown>) => ({
        ...product,
        seller: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          profession: user.profession,
          avatar: user.avatar
        }
      }))
    )

    return { success: true, data: businesses }
  } catch (error) {
    console.error('Error getting connected user businesses:', error)
    return { error: 'Failed to get connected user businesses' }
  }
}

// Get all user businesses for entities without specific connections (like DSTV, CRDB)
export async function getAllUserBusinesses() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profession: true,
        businessType: true,
        avatar: true,
        products: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            description: true,
            price: true,
            currency: true,
            mediaUrls: true,
            category: true,
            tags: true
          },
          take: 2
        }
      },
      where: {
        products: {
          some: {
            isActive: true
          }
        }
      },
      take: 50
    })

    // Flatten products with seller information
    const businesses = users.flatMap(user =>
      user.products.map((product: Record<string, unknown>) => ({
        ...product,
        seller: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          profession: user.profession,
          businessType: user.businessType,
          avatar: user.avatar
        }
      }))
    )

    return { success: true, data: businesses }
  } catch (error) {
    console.error('Error getting all user businesses:', error)
    return { success: false, error: 'Failed to get all user businesses' }
  }
}

// Get interconnectivity statistics for the platform
export async function getInterconnectivityStats() {
  try {
    const [
      totalUsers,
      totalProviders,
      totalClubs,
      totalInstitutions,
      totalBusinesses,
      connectedUsers
    ] = await Promise.all([
      prisma.user.count(),
      prisma.provider.count({ where: { isActive: true } }),
      prisma.club.count({ where: { isActive: true } }),
      prisma.institution.count({ where: { isActive: true } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.user.count({
        where: {
          OR: [
            { providerId: { not: null } },
            { institutionId: { not: null } },
            { clubIds: { isEmpty: false } }
          ]
        }
      })
    ])

    // Calculate total connections (users connected to providers + clubs + institutions)
    const providerConnections = await prisma.user.count({ where: { providerId: { not: null } } })
    const institutionConnections = await prisma.user.count({ where: { institutionId: { not: null } } })
    const clubConnections = await prisma.user.count({ where: { clubIds: { isEmpty: false } } })

    const totalConnections = providerConnections + institutionConnections + clubConnections

    return {
      success: true,
      data: {
        totalUsers,
        totalProviders,
        totalClubs,
        totalInstitutions,
        totalBusinesses,
        totalConnections,
        connectedUsers,
        connectionRate: totalUsers > 0 ? Math.round((connectedUsers / totalUsers) * 100) : 0
      }
    }
  } catch (error) {
    console.error('Error getting interconnectivity stats:', error)
    return { error: 'Failed to get interconnectivity stats' }
  }
}
