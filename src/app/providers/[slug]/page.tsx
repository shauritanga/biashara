import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import { ProviderPageClient } from '@/components/providers/ProviderPageClient'
import { ProviderHero } from '@/components/providers/ProviderHero'
import { ProviderBanners } from '@/components/providers/ProviderBanners'
import { ProviderTestimonials } from '@/components/providers/ProviderTestimonials'
import { ProviderStats } from '@/components/providers/ProviderStats'
import { ProviderAbout } from '@/components/providers/ProviderAbout'
import { UserBusinessShowcase } from '@/components/interconnect/UserBusinessShowcase'
import { getConnectedUserBusinesses } from '@/app/actions/connections'

interface ProviderPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProvider(slug: string) {
  try {
    const provider = await prisma.provider.findUnique({
      where: { slug }
    })

    if (!provider) return null

    // Get feed items count separately
    const feedItemsCount = await prisma.feedItem.count({
      where: {
        type: 'provider',
        contentId: provider.id,
        isActive: true
      }
    })

    return {
      ...provider,
      feedItemsCount
    }
  } catch (error) {
    console.error('Error fetching provider:', error)
    return null
  }
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { slug } = await params
  const provider = await getProvider(slug)

  if (!provider) {
    notFound()
  }

  const content = provider.content as any
  const services = provider.services as any[]

  // Get connected user businesses
  const connectedBusinessesResult = await getConnectedUserBusinesses('provider', provider.id)
  const connectedBusinesses = connectedBusinessesResult.success ?
    connectedBusinessesResult.data.map((business: any) => ({
      id: business.id,
      title: business.title,
      description: business.description,
      price: business.price,
      currency: business.currency,
      mediaUrls: business.mediaUrls,
      category: business.category,
      tags: business.tags,
      seller: {
        id: business.seller.id,
        firstName: business.seller.firstName,
        lastName: business.seller.lastName,
        profession: business.seller.profession,
        avatar: business.seller.avatar
      }
    })) : []

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <ProviderHero provider={provider} content={content} />

      {/* Stats Section */}
      <ProviderStats provider={provider} content={content} />

      {/* Banners/Advertisements Section */}
      <ProviderBanners banners={content?.banners || []} />

      <div className="container-mobile space-y-8 py-8">
        {/* Services Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
              Our Services & Packages
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Choose the perfect plan for your needs
            </p>
          </div>

          <ProviderPageClient
            provider={{
              id: provider.id,
              name: provider.name,
              logo: provider.logo || undefined,
              services: services || []
            }}
          />
        </section>

        {/* Testimonials Section */}
        <ProviderTestimonials
          testimonials={content?.testimonials || []}
          totalUsers={content?.totalUsers || 0}
          providerName={provider.name}
        />

        {/* About Section */}
        <ProviderAbout provider={provider} content={content} />
      </div>

      {/* Connected User Businesses */}
      <UserBusinessShowcase
        businesses={connectedBusinesses}
        title={`Businesses from ${provider.name} Users`}
        subtitle={`Discover products and services from fellow ${provider.name} customers in your network`}
        entityName={provider.name}
        entityType="provider"
      />
    </div>
  )
}
