'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

interface CreatePostData {
  title: string
  description: string
  tags: string[]
  mediaUrls: string[]
}

export async function createPost(data: CreatePostData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Validate input
    if (!data.title.trim() || !data.description.trim()) {
      return { error: 'Title and description are required' }
    }

    if (data.title.length > 100) {
      return { error: 'Title must be 100 characters or less' }
    }

    if (data.description.length > 500) {
      return { error: 'Description must be 500 characters or less' }
    }

    // Log the data being saved for debugging
    console.log('Creating post with data:', {
      title: data.title.trim(),
      description: data.description.trim(),
      mediaUrls: data.mediaUrls,
      tags: data.tags,
      userId: currentUser.userId
    })

    // Create the feed item
    const feedItem = await prisma.feedItem.create({
      data: {
        type: 'post',
        contentId: 0, // For user posts, we'll use 0 as contentId
        userId: currentUser.userId,
        title: data.title.trim(),
        description: data.description.trim(),
        mediaUrls: data.mediaUrls,
        tags: data.tags,
        isActive: true
      }
    })

    console.log('Created feed item:', feedItem)

    // Revalidate the home page to show the new post
    revalidatePath('/')
    
    return { success: true, data: feedItem }
  } catch (error) {
    console.error('Error creating post:', error)
    return { error: 'Failed to create post' }
  }
}

export async function createProduct(data: {
  title: string
  description: string
  price: number
  currency: string
  category: string
  location: string
  tags: string[]
  mediaUrls: string[]
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Validate input
    if (!data.title.trim() || !data.description.trim()) {
      return { error: 'Title and description are required' }
    }

    if (data.price <= 0) {
      return { error: 'Price must be greater than 0' }
    }

    // Create the product
    const product = await prisma.product.create({
      data: {
        userId: currentUser.userId,
        title: data.title.trim(),
        description: data.description.trim(),
        price: data.price,
        currency: data.currency,
        category: data.category,
        location: data.location,
        tags: data.tags,
        mediaUrls: data.mediaUrls,
        isActive: true
      }
    })

    // Create a feed item for the product
    await prisma.feedItem.create({
      data: {
        type: 'product',
        contentId: product.id,
        userId: currentUser.userId,
        title: `New ${data.category}: ${data.title}`,
        description: data.description.trim(),
        mediaUrls: data.mediaUrls,
        tags: data.tags,
        isActive: true
      }
    })

    // Revalidate relevant pages
    revalidatePath('/')
    revalidatePath('/marketplace')
    
    return { success: true, data: product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { error: 'Failed to create product' }
  }
}

export async function createPortfolio(data: {
  title: string
  description: string
  skills: string[]
  projectUrl?: string
  mediaUrls: string[]
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Validate input
    if (!data.title.trim() || !data.description.trim()) {
      return { error: 'Title and description are required' }
    }

    // Create the portfolio item
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: currentUser.userId,
        title: data.title.trim(),
        description: data.description.trim(),
        skills: data.skills,
        projectUrl: data.projectUrl,
        mediaUrls: data.mediaUrls,
        isPublished: true
      }
    })

    // Create a feed item for the portfolio
    await prisma.feedItem.create({
      data: {
        type: 'portfolio',
        contentId: portfolio.id,
        userId: currentUser.userId,
        title: `New Portfolio: ${data.title}`,
        description: data.description.trim(),
        mediaUrls: data.mediaUrls,
        tags: data.skills,
        isActive: true
      }
    })

    // Revalidate relevant pages
    revalidatePath('/')
    revalidatePath('/portfolio')
    
    return { success: true, data: portfolio }
  } catch (error) {
    console.error('Error creating portfolio:', error)
    return { error: 'Failed to create portfolio' }
  }
}

export async function createJob(data: {
  title: string
  description: string
  company: string
  location: string
  salary?: number
  currency: string
  requirements: string[]
  benefits: string[]
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'User not authenticated' }
    }

    // Validate input
    if (!data.title.trim() || !data.description.trim() || !data.company.trim()) {
      return { error: 'Title, description, and company are required' }
    }

    // Create a feed item for the job posting
    // Store job details in the description as structured text
    const jobDescription = `${data.description.trim()}

Company: ${data.company}
Location: ${data.location}
${data.salary ? `Salary: ${data.salary} ${data.currency}` : ''}
${data.requirements.length > 0 ? `Requirements: ${data.requirements.join(', ')}` : ''}
${data.benefits.length > 0 ? `Benefits: ${data.benefits.join(', ')}` : ''}`

    const job = await prisma.feedItem.create({
      data: {
        type: 'job',
        contentId: 0, // We'll use this as a placeholder since we don't have a separate job model
        userId: currentUser.userId,
        title: `Job Opening: ${data.title} at ${data.company}`,
        description: jobDescription,
        mediaUrls: [],
        tags: [...data.requirements, data.company, data.location, 'job'].filter(Boolean),
        isActive: true
      }
    })

    // Revalidate relevant pages
    revalidatePath('/')
    revalidatePath('/jobs')
    
    return { success: true, data: job }
  } catch (error) {
    console.error('Error creating job:', error)
    return { error: 'Failed to create job' }
  }
}
