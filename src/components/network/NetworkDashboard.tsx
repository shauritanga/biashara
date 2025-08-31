import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface NetworkDashboardProps {
  network: {
    user: {
      id: number
      firstName?: string
      lastName?: string
      profession?: string
      skills: string[]
      provider?: {
        id: number
        name: string
        slug: string
        logo?: string
      } | null
      clubs: Array<{
        id: number
        name: string
        slug: string
        sport: string
        logo?: string
      }>
      institution?: {
        id: number
        name: string
        slug: string
        type: string
        logo?: string
      } | null
    }
    similarUsers: Array<{
      id: number
      firstName?: string
      lastName?: string
      profession?: string
      avatar?: string
    }>
  }
}

export function NetworkDashboard({ network }: NetworkDashboardProps) {
  const { user, similarUsers } = network

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Current Provider */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">📱</span>
            <span>Your Provider</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.provider ? (
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
                {user.provider.logo ? (
                  <img
                    src={user.provider.logo}
                    alt={user.provider.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <span className="font-bold text-primary-600">
                    {user.provider.name[0]}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {user.provider.name}
                </p>
                <Button size="sm" className="mt-2" asChild>
                  <Link href={`/providers/${user.provider.slug}`}>
                    View Services
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                No provider connected
              </p>
              <Button size="sm" asChild>
                <Link href="/providers">
                  Choose Provider
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Favorite Clubs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">⚽</span>
            <span>Your Clubs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.clubs && user.clubs.length > 0 ? (
            <div className="space-y-3">
              {user.clubs.slice(0, 2).map((club) => (
                <div key={club.id} className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
                    {club.logo ? (
                      <img
                        src={club.logo}
                        alt={club.name}
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <span className="font-bold text-accent-600 text-sm">
                        {club.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                      {club.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {club.sport}
                    </p>
                  </div>
                </div>
              ))}
              {user.clubs.length > 2 && (
                <p className="text-sm text-neutral-500">
                  +{user.clubs.length - 2} more clubs
                </p>
              )}
              <Button size="sm" className="w-full mt-2" asChild>
                <Link href="/clubs">
                  View All Clubs
                </Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                No clubs joined
              </p>
              <Button size="sm" asChild>
                <Link href="/clubs">
                  Join Clubs
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Institution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">🏫</span>
            <span>Your Institution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.institution ? (
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
                {user.institution.logo ? (
                  <img
                    src={user.institution.logo}
                    alt={user.institution.name}
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <span className="font-bold text-purple-600">
                    {user.institution.name[0]}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {user.institution.name}
                </p>
                <p className="text-sm text-neutral-500">
                  {user.institution.type}
                </p>
                <Button size="sm" className="mt-2" asChild>
                  <Link href={`/institutions/${user.institution.slug}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                No institution connected
              </p>
              <Button size="sm" asChild>
                <Link href="/institutions">
                  Find Institution
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Professional Network */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">👥</span>
            <span>Your Professional Network</span>
          </CardTitle>
          <CardDescription>
            Connect with {similarUsers.length} professionals in your field
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {similarUsers.slice(0, 4).map((similarUser) => (
              <div key={similarUser.id} className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center dark:bg-primary-900/20">
                  {similarUser.avatar ? (
                    <img
                      src={similarUser.avatar}
                      alt={`${similarUser.firstName} ${similarUser.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-semibold text-primary-600 text-sm">
                      {similarUser.firstName?.[0] || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 text-sm truncate">
                    {similarUser.firstName} {similarUser.lastName}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {similarUser.profession}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {similarUsers.length > 4 && (
            <div className="mt-4 text-center">
              <Button asChild>
                <Link href="/network#similar-users">
                  View All {similarUsers.length} Connections
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills & Interests */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-lg">🎯</span>
            <span>Your Skills & Interests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Button size="sm" asChild>
              <Link href="/marketplace?skills=true">
                Find Related Products
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/jobs?skills=true">
                Find Related Jobs
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/network?skills=true">
                Find Similar People
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
