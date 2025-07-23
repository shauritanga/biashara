import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface ProfileConnectionsProps {
  provider?: {
    id: number
    name: string
    slug: string
    logo?: string
  } | null
  institution?: {
    id: number
    name: string
    slug: string
    level: string
    logo?: string
  } | null
  clubs: Array<{
    id: number
    name: string
    slug: string
    sport: string
    logo?: string
  }>
}

export function ProfileConnections({ provider, institution, clubs }: ProfileConnectionsProps) {
  const hasConnections = provider || institution || clubs.length > 0

  if (!hasConnections) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Your Network</span>
          </CardTitle>
          <CardDescription>
            Connect with providers, institutions, and clubs to expand your network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">No connections yet</h3>
            <p className="mt-1 text-sm text-neutral-500">Start building your network by connecting with organizations.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/providers">Browse Providers</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/clubs">Explore Clubs</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Your Network</span>
        </CardTitle>
        <CardDescription>
          Your connections across the Glbiashara ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Provider Connection */}
          {provider && (
            <div>
              <h4 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Telecom Provider
              </h4>
              <Card variant="outlined" className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-neutral-800">
                      {provider.logo ? (
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <span className="text-lg font-bold text-primary-600">
                          {provider.name[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {provider.name}
                      </h5>
                      <p className="text-sm text-neutral-500">Telecommunications Provider</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/providers/${provider.slug}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Institution Connection */}
          {institution && (
            <div>
              <h4 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Institution
              </h4>
              <Card variant="outlined" className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-neutral-800">
                      {institution.logo ? (
                        <img
                          src={institution.logo}
                          alt={institution.name}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <span className="text-lg font-bold text-primary-600">
                          {institution.name[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {institution.name}
                      </h5>
                      <p className="text-sm text-neutral-500">{institution.level}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/institutions/${institution.slug}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Club Connections */}
          {clubs.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Favorite Clubs ({clubs.length})
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {clubs.map((club) => (
                  <Card key={club.id} variant="outlined" className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-neutral-800">
                          {club.logo ? (
                            <img
                              src={club.logo}
                              alt={club.name}
                              className="h-6 w-6 object-contain"
                            />
                          ) : (
                            <span className="text-sm font-bold text-primary-600">
                              {club.name[0]}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {club.name}
                          </h5>
                          <p className="text-xs text-neutral-500">{club.sport}</p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/clubs/${club.slug}`}>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Expand Network CTA */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild className="flex-1">
                <Link href="/network">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explore Network
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/profile/edit">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Connections
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
