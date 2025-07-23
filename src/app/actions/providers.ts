'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

interface PurchaseServiceData {
  providerId: number
  serviceName: string
  price: number
  currency: string
  phoneNumber: string
  paymentMethod: string
}

export async function purchaseService(data: PurchaseServiceData) {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'You must be logged in to purchase services' }
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId }
    })

    if (!user) {
      return { error: 'User not found' }
    }

    // Validate provider
    const provider = await prisma.provider.findUnique({
      where: { id: data.providerId }
    })

    if (!provider) {
      return { error: 'Provider not found' }
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        buyerId: user.id,
        sellerId: user.id, // For provider services, we can use the same user or create a system user
        productId: 1, // We'll need to create a product entry for services
        quantity: 1,
        totalAmount: data.price,
        currency: data.currency,
        status: 'pending',
        notes: `${data.serviceName} purchase from ${provider.name} for ${data.phoneNumber}`
      }
    })

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        orderId: order.id,
        amount: data.price,
        currency: data.currency,
        method: data.paymentMethod,
        status: 'pending',
        metadata: {
          providerId: data.providerId,
          serviceName: data.serviceName,
          phoneNumber: data.phoneNumber,
          providerName: provider.name
        }
      }
    })

    // In a real implementation, here you would:
    // 1. Integrate with payment gateway (M-Pesa, Stripe, etc.)
    // 2. Process the payment
    // 3. Update payment status
    // 4. Notify the provider's API
    // 5. Send confirmation to user

    // For now, we'll simulate a successful purchase
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'completed' }
    })

    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'confirmed' }
    })

    return { 
      success: true, 
      orderId: order.id,
      paymentId: payment.id,
      message: `Successfully purchased ${data.serviceName} from ${provider.name}` 
    }
  } catch (error) {
    console.error('Purchase service error:', error)
    return { error: 'Failed to process purchase. Please try again.' }
  }
}

export async function getProviderServices(providerId: number) {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
      select: {
        id: true,
        name: true,
        services: true
      }
    })

    if (!provider) {
      return { error: 'Provider not found' }
    }

    return { success: true, data: provider }
  } catch (error) {
    console.error('Error fetching provider services:', error)
    return { error: 'Failed to fetch provider services' }
  }
}

export async function getUserPurchaseHistory() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'You must be logged in to view purchase history' }
    }

    const orders = await prisma.order.findMany({
      where: { buyerId: currentUser.userId },
      include: {
        payment: true
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    })

    return { success: true, data: orders }
  } catch (error) {
    console.error('Error fetching purchase history:', error)
    return { error: 'Failed to fetch purchase history' }
  }
}

export async function createProviderFeedPost(data: {
  providerId: number
  title: string
  description: string
  mediaUrls?: string[]
  tags?: string[]
  isPromoted?: boolean
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'You must be logged in to create posts' }
    }

    // Verify provider exists
    const provider = await prisma.provider.findUnique({
      where: { id: data.providerId }
    })

    if (!provider) {
      return { error: 'Provider not found' }
    }

    // Create feed item
    const feedItem = await prisma.feedItem.create({
      data: {
        type: 'provider',
        contentId: data.providerId,
        userId: currentUser.userId,
        title: data.title,
        description: data.description,
        mediaUrls: data.mediaUrls || [],
        tags: data.tags || [],
        isPromoted: data.isPromoted || false,
        isActive: true
      }
    })

    return { success: true, data: feedItem }
  } catch (error) {
    console.error('Error creating provider feed post:', error)
    return { error: 'Failed to create feed post' }
  }
}

export async function searchProviders(query: string) {
  try {
    const providers = await prisma.provider.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { slug: { contains: query, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        services: true
      },
      take: 10
    })

    return { success: true, data: providers }
  } catch (error) {
    console.error('Error searching providers:', error)
    return { error: 'Failed to search providers' }
  }
}
