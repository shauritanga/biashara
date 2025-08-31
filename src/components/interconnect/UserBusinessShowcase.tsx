import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface UserBusiness {
  id: number
  title: string
  description: string
  price?: number
  currency?: string
  mediaUrls: string[]
  category: string
  tags: string[]
  seller: {
    id: number
    firstName?: string
    lastName?: string
    profession?: string
    avatar?: string
  }
}

interface UserBusinessShowcaseProps {
  businesses: UserBusiness[]
  title: string
  subtitle: string
  entityName: string // Provider/Club/Company name
  entityType: 'provider' | 'club' | 'institution' | 'company'
}

export function UserBusinessShowcase({
  businesses,
  title,
  subtitle,
  entityName,
  entityType
}: UserBusinessShowcaseProps) {
  if (!businesses || businesses.length === 0) {
    return null
  }

  // Define brand colors for companies
  const getBrandColors = (entityName: string, entityType: string) => {
    if (entityType === 'company') {
      const name = entityName.toLowerCase()

      if (name.includes('dstv')) {
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          text: 'text-blue-700 dark:text-blue-400',
          icon: '📺'
        }
      } else if (name.includes('crdb')) {
        return {
          bg: 'bg-green-100 dark:bg-green-900/20',
          text: 'text-green-700 dark:text-green-400',
          icon: '🏦'
        }
      } else if (name.includes('azam')) {
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          text: 'text-blue-700 dark:text-blue-400',
          icon: '📺'
        }
      } else if (name.includes('tech')) {
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/20',
          text: 'text-purple-700 dark:text-purple-400',
          icon: '💻'
        }
      }
    } else if (entityType === 'club') {
      const name = entityName.toLowerCase()

      if (name.includes('simba')) {
        return {
          bg: 'bg-red-100 dark:bg-red-900/20',
          text: 'text-red-700 dark:text-red-400',
          icon: '🦁'
        }
      } else if (name.includes('yanga') || name.includes('young africans')) {
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/20',
          text: 'text-yellow-700 dark:text-yellow-400',
          icon: '💛'
        }
      }
    } else if (entityType === 'provider') {
      const name = entityName.toLowerCase()

      if (name.includes('vodacom')) {
        return {
          bg: 'bg-red-100 dark:bg-red-900/20',
          text: 'text-red-700 dark:text-red-400',
          icon: '📱'
        }
      } else if (name.includes('airtel')) {
        return {
          bg: 'bg-red-100 dark:bg-red-900/20',
          text: 'text-red-600 dark:text-red-400',
          icon: '📱'
        }
      } else if (name.includes('tigo')) {
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          text: 'text-blue-700 dark:text-blue-400',
          icon: '📱'
        }
      } else if (name.includes('halotel')) {
        return {
          bg: 'bg-orange-100 dark:bg-orange-900/20',
          text: 'text-orange-700 dark:text-orange-400',
          icon: '📱'
        }
      }
    }

    // Default colors for other entity types
    return {
      bg: 'bg-primary-100 dark:bg-primary-900/20',
      text: 'text-primary-700 dark:text-primary-400',
      icon: entityType === 'provider' ? '📱' :
            entityType === 'club' ? '⚽' :
            entityType === 'company' ? '🏢' : '🏫'
    }
  }

  const brandColors = getBrandColors(entityName, entityType)

  return (
    <section className="py-8 bg-neutral-50 dark:bg-neutral-800/50">
      <div className="container-mobile">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
          <div className={`mt-4 inline-flex items-center space-x-2 rounded-full ${brandColors.bg} px-4 py-2 text-sm font-medium ${brandColors.text}`}>
            <span className="text-lg">
              {brandColors.icon}
            </span>
            <span>
              {entityType === 'company' ? `Serving ${entityName} Community` : `Connected to ${entityName}`}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
              {/* Business Image */}
              <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 relative">
                {business.mediaUrls && business.mediaUrls.length > 0 ? (
                  <img
                    src={business.mediaUrls[0]}
                    alt={business.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {business.category === 'Electronics' ? '📱' :
                         business.category === 'Fashion' ? '👗' :
                         business.category === 'Food' ? '🍽️' :
                         business.category === 'Services' ? '🛠️' : '📦'}
                      </div>
                      <span className="text-sm text-neutral-400">{business.category}</span>
                    </div>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
                    {business.category}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-1">{business.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {business.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Price */}
                {business.price && (
                  <div className="mb-4">
                    <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {formatCurrency(business.price, business.currency || 'TZS')}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {business.tags && business.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {business.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {business.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                          +{business.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Seller Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center dark:bg-primary-900/20">
                      {business.seller.avatar ? (
                        <img
                          src={business.seller.avatar}
                          alt={`${business.seller.firstName} ${business.seller.lastName}`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="font-semibold text-primary-600 text-sm">
                          {business.seller.firstName?.[0] || 'S'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                        {business.seller.firstName} {business.seller.lastName}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">
                        {business.seller.profession}
                      </p>
                    </div>
                  </div>
                  
                  {/* Connection Indicator */}
                  <div className="flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Connected</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button className="flex-1" size="sm" asChild>
                    <Link href={`/marketplace/products/${business.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button className="flex-1" size="sm">
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        {businesses.length >= 6 && (
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href={`/marketplace?${entityType}=${entityName.toLowerCase()}`}>
                View All {entityName} Connected Businesses
              </Link>
            </Button>
          </div>
        )}

        {/* Call to Action for Users */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
            <CardContent className="pt-0">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Are you a {entityName} user with a business?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Connect your business to {entityName} and reach thousands of potential customers who share your network.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/marketplace/create">
                    List Your Business
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/network">
                    Join Network
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
