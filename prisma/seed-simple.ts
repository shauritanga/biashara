import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Update Vodacom provider with rich content
  await prisma.provider.update({
    where: { slug: 'vodacom' },
    data: {
      content: {
        description: 'Leading telecommunications provider in Tanzania with over 15 million customers',
        website: 'https://vodacom.co.tz',
        services: ['Mobile', 'Internet', 'M-Pesa', 'Enterprise Solutions'],
        about: 'Vodacom Tanzania is the leading mobile telecommunications company in Tanzania, providing innovative mobile, internet and digital services to over 15 million customers. We are committed to connecting people and enabling digital transformation across Tanzania.',
        founded: '1999',
        headquarters: 'Dar es Salaam, Tanzania',
        employees: '2,500+',
        coverage: '99% population coverage',
        awards: ['Best Mobile Network 2023', 'Digital Innovation Award 2022', 'Customer Service Excellence 2023'],
        socialMedia: {
          facebook: 'https://facebook.com/VodacomTanzania',
          twitter: 'https://twitter.com/VodacomTZ',
          instagram: 'https://instagram.com/vodacomtz',
          linkedin: 'https://linkedin.com/company/vodacom-tanzania'
        },
        banners: [
          {
            type: 'video',
            url: '/providers/vodacom-ad-1.mp4',
            title: 'Vodacom 5G Network Launch',
            description: 'Experience the future with Vodacom 5G'
          },
          {
            type: 'image',
            url: 'https://picsum.photos/1200/400?random=30',
            title: 'M-Pesa - Your Money, Your Way',
            description: 'Send, receive, and pay with M-Pesa'
          },
          {
            type: 'image',
            url: 'https://picsum.photos/1200/400?random=31',
            title: 'Unlimited Data Plans',
            description: 'Stay connected with our unlimited data packages'
          }
        ],
        testimonials: [
          {
            name: 'Dr. Amina Hassan',
            profession: 'Medical Doctor',
            business: 'Muhimbili Hospital',
            avatar: '/avatars/amina-hassan.jpg',
            quote: 'Vodacom\'s reliable network helps me stay connected with patients and colleagues 24/7.',
            rating: 5
          },
          {
            name: 'John Mwalimu',
            profession: 'Small Business Owner',
            business: 'Mwalimu Electronics',
            avatar: '/avatars/john-mwalimu.jpg',
            quote: 'M-Pesa has revolutionized how I handle payments in my electronics shop.',
            rating: 5
          },
          {
            name: 'Grace Kimaro',
            profession: 'University Student',
            business: 'University of Dar es Salaam',
            avatar: '/avatars/grace-kimaro.jpg',
            quote: 'Affordable data bundles keep me connected for online classes and research.',
            rating: 5
          },
          {
            name: 'Hassan Mbwana',
            profession: 'Farmer & Entrepreneur',
            business: 'Mbwana Agribusiness',
            avatar: '/avatars/hassan-mbwana.jpg',
            quote: 'Vodacom helps me track market prices and connect with buyers across Tanzania.',
            rating: 5
          },
          {
            name: 'Sarah Mollel',
            profession: 'Software Developer',
            business: 'TechHub Tanzania',
            avatar: '/avatars/sarah-mollel.jpg',
            quote: 'Fast internet speeds are crucial for my development work. Vodacom delivers.',
            rating: 5
          }
        ],
        totalUsers: 15200000,
        activeUsers: 12800000
      },
      services: [
        {
          name: '10GB Data Bundle',
          price: 10000,
          currency: 'TZS',
          validity: '30 days',
          description: 'High-speed internet for a month',
          features: ['4G/5G Speed', 'No Fair Usage Policy', '24/7 Support'],
          popular: true
        },
        {
          name: '5GB Data Bundle',
          price: 5000,
          currency: 'TZS',
          validity: '7 days',
          description: 'Perfect for weekly usage',
          features: ['4G Speed', 'Social Media Bonus', 'Weekend Double Data'],
          popular: false
        },
        {
          name: '25GB Data Bundle',
          price: 25000,
          currency: 'TZS',
          validity: '30 days',
          description: 'For heavy internet users',
          features: ['5G Speed', 'Unlimited Social Media', 'Free Vodacom to Vodacom'],
          popular: false
        },
        {
          name: 'Unlimited Voice Package',
          price: 15000,
          currency: 'TZS',
          validity: '30 days',
          description: 'Unlimited calls to all networks',
          features: ['Unlimited Local Calls', '1000 SMS', '2GB Bonus Data'],
          popular: true
        }
      ]
    }
  })

  console.log('✅ Vodacom provider updated successfully')

  // Update Airtel provider with rich content
  await prisma.provider.update({
    where: { slug: 'airtel' },
    data: {
      content: {
        description: 'Affordable telecommunications solutions for everyone in Tanzania',
        website: 'https://airtel.co.tz',
        services: ['Mobile', 'Internet', 'Airtel Money', 'International Roaming'],
        about: 'Airtel Tanzania is committed to providing affordable and reliable telecommunications services to all Tanzanians. With our extensive network coverage and innovative solutions, we connect communities and empower businesses across the country.',
        founded: '2010',
        headquarters: 'Dar es Salaam, Tanzania',
        employees: '1,800+',
        coverage: '95% population coverage',
        awards: ['Most Affordable Network 2023', 'Rural Connectivity Award 2022', 'Innovation in Mobile Money 2023'],
        socialMedia: {
          facebook: 'https://facebook.com/AirtelTanzania',
          twitter: 'https://twitter.com/AirtelTZ',
          instagram: 'https://instagram.com/airteltz',
          linkedin: 'https://linkedin.com/company/airtel-tanzania'
        },
        banners: [
          {
            type: 'video',
            url: '/providers/airtel-ad-1.mp4',
            title: 'Airtel Money - Banking Made Simple',
            description: 'Experience seamless mobile banking with Airtel Money'
          },
          {
            type: 'image',
            url: 'https://picsum.photos/1200/400?random=32',
            title: 'Affordable Data for Everyone',
            description: 'Get more data for less with Airtel\'s value packages'
          },
          {
            type: 'image',
            url: 'https://picsum.photos/1200/400?random=33',
            title: 'International Roaming',
            description: 'Stay connected wherever you go with affordable roaming'
          }
        ],
        testimonials: [
          {
            name: 'Fatuma Ally',
            profession: 'Market Vendor',
            business: 'Kariakoo Market',
            avatar: '/avatars/fatuma-ally.jpg',
            quote: 'Airtel Money helps me receive payments from customers easily and safely.',
            rating: 5
          },
          {
            name: 'Peter Msigwa',
            profession: 'Teacher',
            business: 'Mwenge Secondary School',
            avatar: '/avatars/peter-msigwa.jpg',
            quote: 'Affordable data bundles allow me to prepare lessons and communicate with students.',
            rating: 5
          },
          {
            name: 'Mary Kileo',
            profession: 'Entrepreneur',
            business: 'Kileo Fashion House',
            avatar: '/avatars/mary-kileo.jpg',
            quote: 'Reliable network coverage helps me run my online fashion business smoothly.',
            rating: 5
          },
          {
            name: 'Ibrahim Juma',
            profession: 'Taxi Driver',
            business: 'Uber/Bolt Driver',
            avatar: '/avatars/ibrahim-juma.jpg',
            quote: 'Cheap calls and data keep me connected with passengers and navigation apps.',
            rating: 5
          },
          {
            name: 'Neema Mwamba',
            profession: 'Nurse',
            business: 'Temeke Hospital',
            avatar: '/avatars/neema-mwamba.jpg',
            quote: 'Airtel\'s affordable rates help me stay in touch with family while working.',
            rating: 5
          }
        ],
        totalUsers: 8500000,
        activeUsers: 7200000
      },
      services: [
        {
          name: '15GB Data Bundle',
          price: 12000,
          currency: 'TZS',
          validity: '30 days',
          description: 'Best value data package',
          features: ['4G Speed', 'Free WhatsApp', 'Night Browsing Bonus'],
          popular: true
        },
        {
          name: '8GB Data Bundle',
          price: 8000,
          currency: 'TZS',
          validity: '14 days',
          description: 'Perfect for moderate usage',
          features: ['4G Speed', 'Social Media Bonus', 'Free Airtel to Airtel'],
          popular: false
        },
        {
          name: '30GB Data Bundle',
          price: 20000,
          currency: 'TZS',
          validity: '30 days',
          description: 'For power users and families',
          features: ['4G Speed', 'Unlimited YouTube', 'Family Sharing'],
          popular: false
        },
        {
          name: 'Voice & SMS Combo',
          price: 10000,
          currency: 'TZS',
          validity: '30 days',
          description: 'Talk and text unlimited',
          features: ['Unlimited Airtel Calls', '500 SMS to All Networks', '1GB Bonus Data'],
          popular: true
        }
      ]
    }
  })

  console.log('✅ Airtel provider updated successfully')

  // Create sample users with businesses connected to providers
  const sampleUsers = [
    {
      email: 'amina.hassan@example.com',
      phone: '+255123456789',
      password: 'password123',
      firstName: 'Amina',
      lastName: 'Hassan',
      country: 'TZ',
      profession: 'Medical Doctor',
      skills: ['Healthcare', 'Medical Consultation', 'Emergency Care'],
      providerId: 1, // Vodacom
      products: [
        {
          title: 'Medical Consultation Services',
          description: 'Professional medical consultation and health advice from experienced doctor',
          price: 50000,
          currency: 'TZS',
          category: 'Healthcare',
          location: 'Dar es Salaam, TZ',
          tags: ['Medical', 'Consultation', 'Health'],
          mediaUrls: ['https://picsum.photos/600/400?random=20'],
          isActive: true
        }
      ]
    },
    {
      email: 'john.mwalimu@example.com',
      phone: '+255123456790',
      password: 'password123',
      firstName: 'John',
      lastName: 'Mwalimu',
      country: 'TZ',
      profession: 'Electronics Retailer',
      skills: ['Electronics', 'Mobile Phones', 'Repair Services'],
      providerId: 1, // Vodacom
      products: [
        {
          title: 'Smartphone Repair Services',
          description: 'Professional smartphone and tablet repair services with warranty',
          price: 25000,
          currency: 'TZS',
          category: 'Electronics',
          location: 'Dar es Salaam, TZ',
          tags: ['Repair', 'Smartphone', 'Electronics'],
          mediaUrls: ['https://picsum.photos/600/400?random=21'],
          isActive: true
        },
        {
          title: 'Mobile Phone Accessories',
          description: 'Quality phone cases, chargers, and accessories for all brands',
          price: 15000,
          currency: 'TZS',
          category: 'Electronics',
          location: 'Dar es Salaam, TZ',
          tags: ['Accessories', 'Mobile', 'Cases'],
          mediaUrls: ['https://picsum.photos/600/400?random=22'],
          isActive: true
        }
      ]
    },
    {
      email: 'fatuma.ally@example.com',
      phone: '+255123456791',
      password: 'password123',
      firstName: 'Fatuma',
      lastName: 'Ally',
      country: 'TZ',
      profession: 'Market Vendor',
      skills: ['Trading', 'Food Products', 'Customer Service'],
      providerId: 2, // Airtel
      products: [
        {
          title: 'Fresh Organic Vegetables',
          description: 'Farm-fresh organic vegetables delivered daily from local farms',
          price: 8000,
          currency: 'TZS',
          category: 'Food',
          location: 'Dar es Salaam, TZ',
          tags: ['Organic', 'Vegetables', 'Fresh'],
          mediaUrls: ['https://picsum.photos/600/400?random=23'],
          isActive: true
        }
      ]
    },
    {
      email: 'peter.msigwa@example.com',
      phone: '+255123456792',
      password: 'password123',
      firstName: 'Peter',
      lastName: 'Msigwa',
      country: 'TZ',
      profession: 'Teacher',
      skills: ['Education', 'Tutoring', 'Mathematics'],
      providerId: 2, // Airtel
      products: [
        {
          title: 'Private Mathematics Tutoring',
          description: 'Expert mathematics tutoring for secondary school students',
          price: 30000,
          currency: 'TZS',
          category: 'Education',
          location: 'Dar es Salaam, TZ',
          tags: ['Tutoring', 'Mathematics', 'Education'],
          mediaUrls: ['https://picsum.photos/600/400?random=24'],
          isActive: true
        }
      ]
    }
  ]

  // Create users and their products
  for (const userData of sampleUsers) {
    const { products, ...userInfo } = userData

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      create: userInfo,
      update: {
        providerId: userInfo.providerId,
        profession: userInfo.profession,
        skills: userInfo.skills
      }
    })

    // Create products for each user
    for (const productData of products) {
      await prisma.product.create({
        data: {
          ...productData,
          userId: user.id
        }
      })
    }
  }

  console.log('✅ Sample users and businesses created successfully')
  console.log('🌱 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
