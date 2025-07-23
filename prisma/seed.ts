import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Update providers with rich content
  const vodacom = await prisma.provider.upsert({
    where: { slug: 'vodacom' },
    create: {
      name: 'Vodacom Tanzania',
      slug: 'vodacom',
      logo: '/providers/vodacom-logo.png',
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
            url: '/providers/vodacom-banner-1.jpg',
            title: 'M-Pesa - Your Money, Your Way',
            description: 'Send, receive, and pay with M-Pesa'
          },
          {
            type: 'image',
            url: '/providers/vodacom-banner-2.jpg',
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
      ],
      isActive: true
    },
    update: {
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
            url: 'https://picsum.photos/1200/400?random=10',
            title: 'M-Pesa - Your Money, Your Way',
            description: 'Send, receive, and pay with M-Pesa'
          },
          {
            type: 'image',
            url: 'https://picsum.photos/1200/400?random=11',
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

  const airtel = await prisma.provider.upsert({
    where: { slug: 'airtel' },
    create: {
      name: 'Airtel Tanzania',
      slug: 'airtel',
      logo: '/providers/airtel-logo.png',
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
            url: '/providers/airtel-banner-1.jpg',
            title: 'Affordable Data for Everyone',
            description: 'Get more data for less with Airtel\'s value packages'
          },
          {
            type: 'image',
            url: '/providers/airtel-banner-2.jpg',
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
      ],
      isActive: true
    },
    update: {
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
            url: '/providers/airtel-banner-1.jpg',
            title: 'Affordable Data for Everyone',
            description: 'Get more data for less with Airtel\'s value packages'
          },
          {
            type: 'image',
            url: '/providers/airtel-banner-2.jpg',
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

  // Create clubs
  const simba = await prisma.club.upsert({
    where: { slug: 'simba-sc' },
    create: {
      name: 'Simba Sports Club',
      slug: 'simba-sc',
      sport: 'Football',
      logo: '/clubs/simba-logo.png',
      content: {
        description: 'The most successful football club in Tanzania',
        founded: '1936',
        stadium: 'Benjamin Mkapa Stadium',
        achievements: ['28 League Titles', '5 Cup Titles']
      },
      isActive: true
    },
    update: {
      content: {
        description: 'The most successful football club in Tanzania',
        founded: '1936',
        stadium: 'Benjamin Mkapa Stadium',
        achievements: ['28 League Titles', '5 Cup Titles']
      }
    }
  })

  const yanga = await prisma.club.upsert({
    where: { slug: 'yanga-sc' },
    create: {
      name: 'Young Africans Sports Club',
      slug: 'yanga-sc',
      sport: 'Football',
      logo: '/clubs/yanga-logo.png',
      content: {
        description: 'Historic football club with passionate fans',
        founded: '1935',
        stadium: 'Benjamin Mkapa Stadium',
        achievements: ['27 League Titles', '4 Cup Titles']
      },
      isActive: true
    },
    update: {
      content: {
        description: 'Historic football club with passionate fans',
        founded: '1935',
        stadium: 'Benjamin Mkapa Stadium',
        achievements: ['27 League Titles', '4 Cup Titles']
      }
    }
  })

  // Create institutions
  const udsm = await prisma.institution.upsert({
    where: { slug: 'udsm' },
    create: {
      name: 'University of Dar es Salaam',
      slug: 'udsm',
      level: 'University',
      logo: '/institutions/udsm-logo.png',
      content: {
        description: 'Premier university in Tanzania',
        established: '1961',
        faculties: ['Engineering', 'Medicine', 'Law', 'Business'],
        students: 40000
      },
      isActive: true
    },
    update: {
      content: {
        description: 'Premier university in Tanzania',
        established: '1961',
        faculties: ['Engineering', 'Medicine', 'Law', 'Business'],
        students: 40000
      }
    }
  })

  // Create companies
  const techCompany = await prisma.company.upsert({
    where: { slug: 'techhub-tz' },
    create: {
      name: 'TechHub Tanzania',
      slug: 'techhub-tz',
      industry: 'Technology',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Mobile Development'],
      logo: '/companies/techhub-logo.png',
      content: {
        description: 'Leading software development company in East Africa',
        founded: '2015',
        employees: 150,
        services: ['Web Development', 'Mobile Apps', 'Cloud Solutions']
      },
      isActive: true
    },
    update: {
      content: {
        description: 'Leading software development company in East Africa',
        founded: '2015',
        employees: 150,
        services: ['Web Development', 'Mobile Apps', 'Cloud Solutions']
      }
    }
  })

  // Create DSTV company
  const dstv = await prisma.company.upsert({
    where: { slug: 'dstv-tanzania' },
    create: {
      name: 'DSTV Tanzania',
      slug: 'dstv-tanzania',
      industry: 'Entertainment',
      skills: [],
      logo: '/companies/dstv-logo.png',
      content: {
        description: 'Leading satellite television provider in Tanzania',
        founded: '1995',
        employees: 500,
        services: ['Satellite TV', 'Premium Channels', 'Sports Broadcasting']
      },
      isActive: true
    },
    update: {
      content: {
        description: 'Leading satellite television provider in Tanzania',
        founded: '1995',
        employees: 500,
        services: ['Satellite TV', 'Premium Channels', 'Sports Broadcasting']
      }
    }
  })

  // Create CRDB Bank
  const crdb = await prisma.company.upsert({
    where: { slug: 'crdb-bank' },
    create: {
      name: 'CRDB Bank',
      slug: 'crdb-bank',
      industry: 'Banking',
      skills: [],
      logo: '/companies/crdb-logo.png',
      content: {
        description: 'Leading commercial bank in Tanzania',
        founded: '1996',
        employees: 3000,
        services: ['Personal Banking', 'Business Banking', 'Mobile Banking', 'Loans']
      },
      isActive: true
    },
    update: {
      content: {
        description: 'Leading commercial bank in Tanzania',
        founded: '1996',
        employees: 3000,
        services: ['Personal Banking', 'Business Banking', 'Mobile Banking', 'Loans']
      }
    }
  })

  // Create Azam TV
  const azamTv = await prisma.company.upsert({
    where: { slug: 'azam-tv' },
    create: {
      name: 'Azam TV',
      slug: 'azam-tv',
      industry: 'Entertainment',
      skills: [],
      logo: '/companies/azam-logo.png',
      content: {
        description: 'Digital satellite television provider in East Africa',
        founded: '2013',
        employees: 200,
        services: ['Digital TV', 'Sports Channels', 'Local Content']
      },
      isActive: true
    },
    update: {
      content: {
        description: 'Digital satellite television provider in East Africa',
        founded: '2013',
        employees: 200,
        services: ['Digital TV', 'Sports Channels', 'Local Content']
      }
    }
  })

  // Create a test user
  const hashedPassword = await hashPassword('password123')
  const testUser = await prisma.user.upsert({
    where: { email: 'test@glbiashara.com' },
    create: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@glbiashara.com',
      phone: '+255123456789',
      password: hashedPassword,
      country: 'TZ',
      profession: 'Software Engineer',
      businessType: 'Technology',
      skills: ['JavaScript', 'React', 'Node.js'],
      isVerified: true
    },
    update: {
      businessType: 'Technology',
      skills: ['JavaScript', 'React', 'Node.js']
    }
  })

  // Create CV for test user
  await prisma.cV.upsert({
    where: { userId: testUser.id },
    create: {
      userId: testUser.id,
      personal: {
        fullName: 'Test User',
        email: 'test@glbiashara.com',
        phone: '+255123456789',
        location: 'Dar es Salaam, Tanzania'
      },
      education: [
        {
          institution: 'University of Dar es Salaam',
          degree: 'Bachelor of Computer Science',
          year: '2020',
          grade: 'First Class'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
      experience: [
        {
          company: 'TechHub Tanzania',
          position: 'Software Developer',
          duration: '2020 - Present',
          description: 'Full-stack web development using modern technologies'
        }
      ],
      summary: 'Passionate software engineer with 3+ years of experience in web development',
      isPublic: true
    },
    update: {
      summary: 'Passionate software engineer with 3+ years of experience in web development',
      isPublic: true
    }
  })

  // Create portfolio for test user
  let portfolio
  try {
    portfolio = await prisma.portfolio.create({
      data: {
        userId: testUser.id,
        title: 'E-commerce Web Application',
      description: 'Full-stack e-commerce platform built with React and Node.js, featuring payment integration and inventory management.',
      mediaUrls: ['https://picsum.photos/800/600?random=1', 'https://picsum.photos/800/600?random=2'],
      skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
      projectUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/testuser/ecommerce',
      isPublished: true
    }
  })
  } catch (error) {
    // Portfolio might already exist, find it
    portfolio = await prisma.portfolio.findFirst({
      where: { userId: testUser.id, title: 'E-commerce Web Application' }
    })
  }

  // Create product for test user
  let product
  try {
    product = await prisma.product.create({
      data: {
        userId: testUser.id,
      title: 'Custom Web Development Services',
      description: 'Professional web development services for small and medium businesses. Specializing in modern, responsive websites and web applications.',
      price: 500000,
      currency: 'TZS',
      mediaUrls: ['https://picsum.photos/600/400?random=3', 'https://picsum.photos/600/400?random=4'],
      category: 'Services',
      location: 'Dar es Salaam, TZ',
      tags: ['Web Development', 'React', 'Node.js', 'Custom Software'],
      isActive: true
    }
  })
  } catch (error) {
    // Product might already exist, find it
    product = await prisma.product.findFirst({
      where: { userId: testUser.id, title: 'Custom Web Development Services' }
    })
  }

  // Create innovation
  let innovation
  try {
    innovation = await prisma.innovation.create({
      data: {
        userId: testUser.id,
      institutionId: udsm.id,
      title: 'Smart Water Management System',
      description: 'IoT-based water management system for urban areas, featuring real-time monitoring and automated distribution control.',
      mediaUrls: ['https://picsum.photos/800/600?random=5', 'https://picsum.photos/800/600?random=6'],
      tags: ['IoT', 'Water Management', 'Smart City', 'Sustainability'],
      isPublished: true
    }
  })
  } catch (error) {
    // Innovation might already exist, find it
    innovation = await prisma.innovation.findFirst({
      where: { userId: testUser.id, title: 'Smart Water Management System' }
    })
  }

  // Create feed items
  await prisma.feedItem.create({
    data: {
      type: 'provider',
      contentId: vodacom.id,
      title: 'New 10GB Data Bundle - Only 10,000 TZS!',
      description: 'Get high-speed internet for a whole month. Perfect for streaming, browsing, and staying connected.',
      mediaUrls: ['https://picsum.photos/600/400?random=7'],
      tags: ['Data Bundle', 'Internet', 'Promotion'],
      isPromoted: true,
      isActive: true
    }
  })

  await prisma.feedItem.create({
    data: {
      type: 'club',
      contentId: simba.id,
      title: 'Simba vs Yanga - The Derby of the Century!',
      description: 'Get ready for the biggest match of the season. Tickets available now at all outlets.',
      mediaUrls: ['https://picsum.photos/600/400?random=8'],
      tags: ['Football', 'Derby', 'Simba', 'Yanga'],
      isPromoted: false,
      isActive: true
    }
  })

  if (portfolio) {
    await prisma.feedItem.create({
      data: {
        type: 'portfolio',
        contentId: portfolio.id,
        userId: testUser.id,
        title: 'E-commerce Web Application Portfolio',
        description: 'Check out this amazing e-commerce platform built with modern technologies.',
        mediaUrls: portfolio.mediaUrls,
        tags: ['Portfolio', 'Web Development', 'E-commerce'],
        isPromoted: false,
        isActive: true
      }
    })
  }

  if (product) {
    await prisma.feedItem.create({
      data: {
        type: 'product',
        contentId: product.id,
        userId: testUser.id,
        title: 'Professional Web Development Services',
        description: 'Transform your business with a modern, responsive website. Contact us for a free consultation.',
        mediaUrls: product.mediaUrls,
        tags: ['Web Development', 'Services', 'Business'],
        isPromoted: false,
        isActive: true
      }
    })
  }

  if (innovation) {
    await prisma.feedItem.create({
      data: {
        type: 'innovation',
        contentId: innovation.id,
        userId: testUser.id,
        title: 'UDSM Students Develop Smart Water Management System',
        description: 'Revolutionary IoT solution for urban water distribution and monitoring.',
        mediaUrls: innovation.mediaUrls,
        tags: ['Innovation', 'IoT', 'UDSM', 'Water Management'],
        isPromoted: false,
        isActive: true
      }
    })
  }

  console.log('✅ Database seeding completed successfully!')
  console.log(`Created:
  - 2 Providers (Vodacom, Airtel)
  - 2 Clubs (Simba, Yanga)
  - 1 Institution (UDSM)
  - 1 Company (TechHub)
  - 1 Test User with CV, Portfolio, Product, and Innovation
  - 5 Feed Items`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
