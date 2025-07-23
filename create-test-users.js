const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

async function createTestUsers() {
  try {
    console.log('Creating test users with different connections...')

    const hashedPassword = await hashPassword('password123')

    // Get provider and club IDs
    const vodacom = await prisma.provider.findUnique({ where: { slug: 'vodacom' } })
    const airtel = await prisma.provider.findUnique({ where: { slug: 'airtel' } })
    const simba = await prisma.club.findUnique({ where: { slug: 'simba-sc' } })
    const yanga = await prisma.club.findUnique({ where: { slug: 'yanga-sc' } })

    // User 1: Vodacom user, Simba fan, Retail business
    const user1 = await prisma.user.upsert({
      where: { email: 'john.simba@example.com' },
      create: {
        firstName: 'John',
        lastName: 'Mwangi',
        email: 'john.simba@example.com',
        phone: '+255712345678',
        password: hashedPassword,
        country: 'TZ',
        profession: 'Shop Owner',
        businessType: 'Retail',
        clubIds: [simba.id],
        providerId: vodacom.id,
        skills: ['Customer Service', 'Sales'],
        isVerified: true
      },
      update: {
        businessType: 'Retail',
        clubIds: [simba.id],
        providerId: vodacom.id
      }
    })

    // Create product for user1
    const existingProduct1 = await prisma.product.findFirst({
      where: { userId: user1.id, title: 'Fresh Fruits & Vegetables' }
    })

    if (!existingProduct1) {
      await prisma.product.create({
        data: {
          userId: user1.id,
          title: 'Fresh Fruits & Vegetables',
          description: 'Fresh daily fruits and vegetables from local farms. Best quality at affordable prices.',
          price: 5000,
          currency: 'TZS',
          category: 'Food',
          location: 'Dar es Salaam, TZ',
          tags: ['Fresh', 'Organic', 'Local'],
          isActive: true
        }
      })
    }

    // User 2: Airtel user, Yanga fan, Services business
    const user2 = await prisma.user.upsert({
      where: { email: 'mary.yanga@example.com' },
      create: {
        firstName: 'Mary',
        lastName: 'Juma',
        email: 'mary.yanga@example.com',
        phone: '+255723456789',
        password: hashedPassword,
        country: 'TZ',
        profession: 'Hair Stylist',
        businessType: 'Services',
        clubIds: [yanga.id],
        providerId: airtel.id,
        skills: ['Hair Styling', 'Beauty'],
        isVerified: true
      },
      update: {
        businessType: 'Services',
        clubIds: [yanga.id],
        providerId: airtel.id
      }
    })

    // Create product for user2
    const existingProduct2 = await prisma.product.findFirst({
      where: { userId: user2.id, title: 'Professional Hair Styling Services' }
    })

    if (!existingProduct2) {
      await prisma.product.create({
        data: {
          userId: user2.id,
          title: 'Professional Hair Styling Services',
          description: 'Expert hair styling, cutting, and beauty services. Modern salon with experienced stylists.',
          price: 25000,
          currency: 'TZS',
          category: 'Services',
          location: 'Dar es Salaam, TZ',
          tags: ['Hair', 'Beauty', 'Professional'],
          isActive: true
        }
      })
    }

    // User 3: Vodacom user, both Simba and Yanga fan, Technology business
    const user3 = await prisma.user.upsert({
      where: { email: 'peter.tech@example.com' },
      create: {
        firstName: 'Peter',
        lastName: 'Msigwa',
        email: 'peter.tech@example.com',
        phone: '+255734567890',
        password: hashedPassword,
        country: 'TZ',
        profession: 'Software Developer',
        businessType: 'Technology',
        clubIds: [simba.id, yanga.id],
        providerId: vodacom.id,
        skills: ['Web Development', 'Mobile Apps'],
        isVerified: true
      },
      update: {
        businessType: 'Technology',
        clubIds: [simba.id, yanga.id],
        providerId: vodacom.id
      }
    })

    // Create product for user3
    const existingProduct3 = await prisma.product.findFirst({
      where: { userId: user3.id, title: 'Mobile App Development' }
    })

    if (!existingProduct3) {
      await prisma.product.create({
        data: {
          userId: user3.id,
          title: 'Mobile App Development',
          description: 'Custom mobile app development for Android and iOS. Modern, user-friendly applications.',
          price: 500000,
          currency: 'TZS',
          category: 'Services',
          location: 'Dar es Salaam, TZ',
          tags: ['Mobile Apps', 'Android', 'iOS', 'Custom Development'],
          isActive: true
        }
      })
    }

    // User 4: No provider, no clubs, Agriculture business (will appear on all company pages)
    const user4 = await prisma.user.upsert({
      where: { email: 'grace.farmer@example.com' },
      create: {
        firstName: 'Grace',
        lastName: 'Mwalimu',
        email: 'grace.farmer@example.com',
        phone: '+255745678901',
        password: hashedPassword,
        country: 'TZ',
        profession: 'Farmer',
        businessType: 'Agriculture',
        clubIds: [],
        skills: ['Farming', 'Organic Produce'],
        isVerified: true
      },
      update: {
        businessType: 'Agriculture',
        clubIds: []
      }
    })

    // Create product for user4
    const existingProduct4 = await prisma.product.findFirst({
      where: { userId: user4.id, title: 'Organic Rice & Maize' }
    })

    if (!existingProduct4) {
      await prisma.product.create({
        data: {
          userId: user4.id,
          title: 'Organic Rice & Maize',
          description: 'High-quality organic rice and maize directly from the farm. Pesticide-free and naturally grown.',
          price: 2000,
          currency: 'TZS',
          category: 'Food',
          location: 'Morogoro, TZ',
          tags: ['Organic', 'Rice', 'Maize', 'Farm Fresh'],
          isActive: true
        }
      })
    }

    console.log('✅ Test users created successfully!')
    console.log('Created users:')
    console.log('1. John Mwangi - Vodacom user, Simba fan, Retail business')
    console.log('2. Mary Juma - Airtel user, Yanga fan, Services business')
    console.log('3. Peter Msigwa - Vodacom user, Both clubs fan, Technology business')
    console.log('4. Grace Mwalimu - No provider/clubs, Agriculture business')

  } catch (error) {
    console.error('Error creating test users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUsers()
