import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getProviders } from '@/app/actions/feed'
import Link from 'next/link'

export default async function ProvidersPage() {
  const providersResult = await getProviders()
  const providers = providersResult.success ? (providersResult.data || []) : []

  return (
    <div className="container-mobile py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          Telecommunication Providers
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover the best data bundles, voice packages, and mobile services from leading providers in Tanzania
        </p>
      </div>

      {/* Providers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => {
          // Define brand colors for different providers
          const getBrandColors = (providerName: string) => {
            const name = providerName.toLowerCase()

            if (name.includes('vodacom')) {
              return {
                bg: 'bg-red-50 dark:bg-red-900/20',
                border: 'border-red-200 dark:border-red-800',
                accent: 'text-red-600',
                button: 'bg-red-600 hover:bg-red-700'
              }
            } else if (name.includes('airtel')) {
              return {
                bg: 'bg-red-50 dark:bg-red-900/20',
                border: 'border-red-200 dark:border-red-800',
                accent: 'text-red-500',
                button: 'bg-red-500 hover:bg-red-600'
              }
            } else if (name.includes('tigo')) {
              return {
                bg: 'bg-blue-50 dark:bg-blue-900/20',
                border: 'border-blue-200 dark:border-blue-800',
                accent: 'text-blue-600',
                button: 'bg-blue-600 hover:bg-blue-700'
              }
            } else if (name.includes('halotel')) {
              return {
                bg: 'bg-orange-50 dark:bg-orange-900/20',
                border: 'border-orange-200 dark:border-orange-800',
                accent: 'text-orange-600',
                button: 'bg-orange-600 hover:bg-orange-700'
              }
            } else {
              return {
                bg: 'bg-primary-50 dark:bg-primary-900/20',
                border: 'border-primary-200 dark:border-primary-800',
                accent: 'text-primary-600',
                button: 'bg-primary-600 hover:bg-primary-700'
              }
            }
          }

          const brandColors = getBrandColors(provider.name)

          return (
            <Card key={provider.id} variant="elevated" className={`overflow-hidden ${brandColors.bg} ${brandColors.border}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-lg ${brandColors.bg}`}>
                  {provider.logo ? (
                    <img
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${brandColors.button} text-white font-bold text-lg`}>
                      {provider.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <CardDescription>
                    Leading telecommunications provider
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Featured Services */}
              {provider.services && provider.services.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    Featured Services
                  </h4>
                  <div className="space-y-2">
                    {provider.services.slice(0, 2).map((service: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {service.name}
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {service.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
                            {new Intl.NumberFormat('en-TZ', {
                              style: 'currency',
                              currency: service.currency || 'TZS',
                              minimumFractionDigits: 0,
                            }).format(service.price)}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {service.validity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button asChild className={`flex-1 ${brandColors.button} text-white`}>
                  <Link href={`/providers/${provider.slug}`}>
                    View All Services
                  </Link>
                </Button>
                <Button variant="outline" size="md" className="px-4">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {providers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <svg className="h-16 w-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  No providers available
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Check back later for telecommunication provider listings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="p-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Data Bundles</span>
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Voice Packages</span>
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium">SMS Packages</span>
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Mobile Money</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
