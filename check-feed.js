const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkFeed() {
  try {
    console.log('Checking feed items...')
    
    const feedItems = await prisma.feedItem.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
    
    console.log(`Found ${feedItems.length} feed items:`)
    
    feedItems.forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.title}`)
      console.log(`   Type: ${item.type}`)
      console.log(`   Description: ${item.description?.substring(0, 100)}...`)
      console.log(`   Media URLs: ${item.mediaUrls?.length || 0} items`)
      if (item.mediaUrls?.length > 0) {
        item.mediaUrls.forEach((url, i) => {
          console.log(`     ${i + 1}: ${url}`)
        })
      }
      console.log(`   User: ${item.user?.firstName} ${item.user?.lastName}`)
      console.log(`   Created: ${item.createdAt}`)
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkFeed()
