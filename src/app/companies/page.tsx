import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getCompanies() {
  try {
    return await prisma.company.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return []
  }
}

export default async function CompaniesPage() {
  const companies = await getCompanies()

  return (
    <div className="container-mobile py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          Companies & Organizations
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover businesses and organizations serving the Tanzanian community
        </p>
      </div>

      {/* Companies Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => {
          const content = company.content as any

          // Define brand colors for different companies
          const getBrandColors = (companyName: string) => {
            const name = companyName.toLowerCase()

            if (name.includes('dstv')) {
              return {
                bg: 'bg-blue-50 dark:bg-blue-900/20',
                border: 'border-blue-200 dark:border-blue-800',
                accent: 'text-blue-600'
              }
            } else if (name.includes('crdb')) {
              return {
                bg: 'bg-green-50 dark:bg-green-900/20',
                border: 'border-green-200 dark:border-green-800',
                accent: 'text-green-600'
              }
            } else if (name.includes('azam')) {
              return {
                bg: 'bg-blue-50 dark:bg-blue-900/20',
                border: 'border-blue-200 dark:border-blue-800',
                accent: 'text-blue-600'
              }
            } else if (name.includes('tech')) {
              return {
                bg: 'bg-purple-50 dark:bg-purple-900/20',
                border: 'border-purple-200 dark:border-purple-800',
                accent: 'text-purple-600'
              }
            } else {
              return {
                bg: 'bg-primary-50 dark:bg-primary-900/20',
                border: 'border-primary-200 dark:border-primary-800',
                accent: 'text-primary-600'
              }
            }
          }

          const brandColors = getBrandColors(company.name)

          return (
            <Card key={company.id} className={`overflow-hidden ${brandColors.bg} ${brandColors.border}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-lg ${brandColors.bg}`}>
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${brandColors.accent} bg-white font-bold text-lg`}>
                        {company.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{company.industry}</span>
                      {content?.founded && (
                        <>
                          <span>•</span>
                          <span>Since {content.founded}</span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {content?.description || `${company.name} - ${company.industry} company`}
                </p>

                {/* Services Preview */}
                {content?.services && content.services.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                      Services:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {content.services.slice(0, 3).map((service: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
                        >
                          {service}
                        </span>
                      ))}
                      {content.services.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
                          +{content.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-4">
                    {content?.employees && (
                      <span className="flex items-center space-x-1">
                        <span>👥</span>
                        <span>{content.employees.toLocaleString()}</span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <span className={brandColors.accent}>
                        {company.industry === 'Banking' ? '🏦' :
                         company.industry === 'Entertainment' ? '📺' :
                         company.industry === 'Technology' ? '💻' : '🏢'}
                      </span>
                      <span className={brandColors.accent}>{company.industry}</span>
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button className="flex-1" size="sm" asChild>
                    <Link href={`/companies/${company.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button className="flex-1" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {companies.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <svg className="h-16 w-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  No companies available
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Check back later for company listings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
          <CardContent className="pt-0">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Are you a business owner?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Join our platform and connect with thousands of potential customers across Tanzania.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/marketplace/create">
                  List Your Business
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">
                  Join Network
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
