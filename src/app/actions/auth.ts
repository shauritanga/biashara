'use server'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword, generateToken, setAuthCookie, clearAuthCookie } from '@/lib/auth'
import { validateEmail, validatePhone } from '@/lib/utils'

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  country: string
  profession?: string
  businessType?: string
  clubIds?: number[]
  skills?: string[]
}

interface LoginData {
  email: string
  password: string
}

export async function registerUser(data: RegisterData) {
  try {
    // Validate input
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.password) {
      return { error: 'All required fields must be provided' }
    }

    if (!validateEmail(data.email)) {
      return { error: 'Invalid email address' }
    }

    if (!validatePhone(data.phone)) {
      return { error: 'Invalid phone number' }
    }

    if (data.password.length < 6) {
      return { error: 'Password must be at least 6 characters long' }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phone: data.phone }
        ]
      }
    })

    if (existingUser) {
      return { error: 'User with this email or phone already exists' }
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        country: data.country,
        profession: data.profession || null,
        businessType: data.businessType || null,
        clubIds: data.clubIds || [],
        skills: data.skills || [],
        isVerified: false
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        country: true,
        profession: true
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    // Set auth cookie
    await setAuthCookie(token)

    return { success: true, user }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Registration failed. Please try again.' }
  }
}

export async function loginUser(data: LoginData) {
  try {
    // Validate input
    if (!data.email || !data.password) {
      return { error: 'Email and password are required' }
    }

    if (!validateEmail(data.email)) {
      return { error: 'Invalid email address' }
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        country: true,
        profession: true,
        avatar: true,
        isVerified: true
      }
    })

    if (!user) {
      return { error: 'Invalid email or password' }
    }

    // Verify password
    const isValidPassword = await verifyPassword(data.password, user.password)
    if (!isValidPassword) {
      return { error: 'Invalid email or password' }
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    // Set auth cookie
    await setAuthCookie(token)

    // Return user data (without password)
    const { password, ...userWithoutPassword } = user
    return { success: true, user: userWithoutPassword }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Login failed. Please try again.' }
  }
}

export async function logoutUser(_formData?: FormData) {
  try {
    await clearAuthCookie()
    // Redirect to home to ensure UI updates after logout
    redirect('/')
  } catch (error) {
    console.error('Logout error:', error)
    // On error, still redirect to home; optionally attach a query param
    redirect('/?logout=failed')
  }
}

export async function getCurrentUserProfile() {
  try {
    // This would typically get the user from the JWT token
    // For now, we'll implement a basic version
    return { user: null }
  } catch (error) {
    console.error('Get current user error:', error)
    return { user: null }
  }
}
