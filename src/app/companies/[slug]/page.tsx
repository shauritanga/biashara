import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'
import { CompanyHero } from '@/components/companies/CompanyHero'
import { CompanyStats } from '@/components/companies/CompanyStats'
import { CompanyAbout } from '@/components/companies/CompanyAbout'
import { UserBusinessShowcase } from '@/components/interconnect/UserBusinessShowcase'
import { getAllUserBusinesses } from '@/app/actions/connections'

interface CompanyPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getCompany(slug: string) {
  try {
    const company = await prisma.company.findUnique({
      where: { slug }
    })

    if (!company) return null

    // Get feed items count separately
    const feedItemsCount = await prisma.feedItem.count({
      where: {
        type: 'company',
        contentId: company.id,
        isActive: true
      }
    })

    return {
      ...company,
      feedItemsCount
    }
  } catch (error) {
    console.error('Error fetching company:', error)
    return null
  }
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params
  const company = await getCompany(slug)

  if (!company) {
    notFound()
  }

  const content = company.content as any

  // Get all user businesses (since companies like DSTV, CRDB serve all users)
  const allBusinessesResult = await getAllUserBusinesses()
  const allBusinesses = allBusinessesResult.success && allBusinessesResult.data
    ? (allBusinessesResult.data as Array<Record<string, unknown>>).map((business: Record<string, unknown>) => ({
        id: business.id as number,
        title: business.title as string,
        description: business.description as string,
        price: business.price as number | undefined,
        currency: business.currency as string | undefined,
        mediaUrls: business.mediaUrls as string[],
        category: business.category as string,
        tags: business.tags as string[],
        seller: business.seller as {
          id: number;
          firstName?: string;
          lastName?: string;
          profession?: string;
          avatar?: string;
        }
      }))
    : []

  // Define brand colors for different companies
  const getBrandIconColor = (companyName: string) => {
    const name = companyName.toLowerCase()

    if (name.includes('dstv')) {
      return 'text-blue-600'
    } else if (name.includes('crdb')) {
      return 'text-green-600'
    } else if (name.includes('azam')) {
      return 'text-blue-600'
    } else if (name.includes('tech')) {
      return 'text-purple-600'
    } else {
      return 'text-primary-600'
    }
  }

  const brandIconColor = getBrandIconColor(company.name)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <CompanyHero company={company} content={content} />

      {/* Stats Section */}
      <CompanyStats company={company} content={content} />

      <div className="container-mobile space-y-8 py-8">
        {/* About Section */}
        <CompanyAbout company={company} content={content} />

        {/* Services/Products */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
              Our Services
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Discover what {company.name} has to offer
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content?.services?.map((service: string, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className={`text-2xl ${brandIconColor}`}>
                      {company.industry === 'Banking' ? '🏦' :
                       company.industry === 'Entertainment' ? '📺' :
                       company.industry === 'Technology' ? '💻' : '🏢'}
                    </span>
                    <span>{service}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Learn more about our {service.toLowerCase()} offerings.
                  </p>
                </CardContent>
              </Card>
            )) || (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="text-center py-8">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Service information will be available soon.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>

      {/* All User Businesses */}
      <UserBusinessShowcase
        businesses={allBusinesses}
        title={`Businesses from Our Community`}
        subtitle={`Discover products and services from entrepreneurs across Tanzania`}
        entityName={company.name}
        entityType="company"
      />
    </div>
  )
}
