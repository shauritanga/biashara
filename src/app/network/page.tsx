import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getPersonalizedRecommendations, getUserNetwork } from '@/app/actions/connections'
import { NetworkDashboard } from '@/components/network/NetworkDashboard'
import { RecommendationCards } from '@/components/network/RecommendationCards'
import { SimilarUsers } from '@/components/network/SimilarUsers'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function NetworkPage() {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  const [networkResult, recommendationsResult] = await Promise.all([
    getUserNetwork(),
    getPersonalizedRecommendations()
  ])

  const network = networkResult.success && networkResult.data ? {
    ...networkResult.data,
    user: {
      ...networkResult.data.user,
      profession: networkResult.data.user.profession || undefined,
      provider: networkResult.data.user.provider ? {
        id: networkResult.data.user.provider.id,
        name: networkResult.data.user.provider.name,
        slug: networkResult.data.user.provider.slug,
        logo: networkResult.data.user.provider.logo || undefined
      } : null,
      clubs: networkResult.data.user.clubs.map((club: any) => ({
        id: club.id,
        name: club.name,
        slug: club.slug,
        sport: club.sport,
        logo: club.logo || undefined
      })),
      institution: networkResult.data.user.institution ? {
        id: networkResult.data.user.institution.id,
        name: networkResult.data.user.institution.name,
        slug: networkResult.data.user.institution.slug,
        type: networkResult.data.user.institution.level, // Map level to type
        logo: networkResult.data.user.institution.logo || undefined
      } : null
    },
    similarUsers: networkResult.data.similarUsers.map((user: any) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      profession: user.profession || undefined,
      avatar: user.avatar || undefined,
      skills: [], // Add empty skills array as required by the component
      clubIds: [], // Add empty clubIds array as required by the component
      providerId: user.providerId || undefined,
      institutionId: user.institutionId || undefined
    }))
  } : null
  const recommendations = recommendationsResult.success && recommendationsResult.data ? {
    providers: (recommendationsResult.data.providers as Array<Record<string, unknown>>).map((provider: Record<string, unknown>) => ({
      id: provider.id as number,
      name: provider.name as string,
      slug: provider.slug as string,
      logo: (provider.logo as string) || undefined,
      services: provider.services,
      content: provider.content
    })),
    clubs: (recommendationsResult.data.clubs as Array<Record<string, unknown>>).map((club: Record<string, unknown>) => ({
      id: club.id as number,
      name: club.name as string,
      slug: club.slug as string,
      sport: club.sport as string,
      logo: (club.logo as string) || undefined,
      content: club.content
    })),
    institutions: (recommendationsResult.data.institutions as Array<Record<string, unknown>>).map((institution: Record<string, unknown>) => ({
      id: institution.id as number,
      name: institution.name as string,
      slug: institution.slug as string,
      type: institution.level as string, // Map level to type
      logo: (institution.logo as string) || undefined,
      content: institution.content
    })),
    products: (recommendationsResult.data.products as Array<Record<string, unknown>>).map((product: Record<string, unknown>) => ({
      id: product.id as number,
      name: product.title as string, // Map title to name
      description: product.description as string,
      price: product.price as number,
      currency: product.currency as string,
      images: product.mediaUrls as string[], // Map mediaUrls to images
      seller: product.seller as {
        id: number;
        firstName?: string;
        lastName?: string;
        avatar?: string;
      }
    })),
    users: (recommendationsResult.data.users as Array<Record<string, unknown>>).map((user: Record<string, unknown>) => ({
      id: user.id as number,
      firstName: (user.firstName as string) || undefined,
      lastName: (user.lastName as string) || undefined,
      profession: (user.profession as string) || undefined,
      skills: [], // Add empty skills array as required by the component
      avatar: (user.avatar as string) || undefined
    }))
  } : null

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-8 md:py-12">
        <div className="container-mobile">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold md:text-4xl">
              Your Business Network
            </h1>
            <p className="mt-2 text-primary-100">
              Connect with companies, clubs, institutions, and like-minded professionals
            </p>
          </div>
        </div>
      </div>

      <div className="container-mobile py-8 space-y-8">
        {/* Network Overview */}
        {network && (
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Your Connections
            </h2>
            <NetworkDashboard network={network} />
          </section>
        )}

        {/* Personalized Recommendations */}
        {recommendations && (
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Recommended for You
            </h2>
            <RecommendationCards recommendations={recommendations} />
          </section>
        )}

        {/* Similar Users */}
        {network?.similarUsers && network.similarUsers.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Connect with Similar Professionals
            </h2>
            <SimilarUsers users={network.similarUsers} />
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Explore More
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Companies
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Explore telecom providers
                  </p>
                </div>
              </div>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Sports Clubs
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Join your favorite teams
                  </p>
                </div>
              </div>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Universities
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Connect with institutions
                  </p>
                </div>
              </div>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Marketplace
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Buy & sell products
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Network Activity Feed */}
        {network?.networkActivities && network.networkActivities.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Network Activity
            </h2>
            <div className="space-y-4">
              {network.networkActivities.slice(0, 10).map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center dark:bg-primary-900/20">
                      {activity.user?.avatar ? (
                        <img
                          src={activity.user.avatar}
                          alt={`${activity.user.firstName} ${activity.user.lastName}`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-sm">
                          {activity.user?.firstName?.[0] || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {activity.user?.firstName} {activity.user?.lastName}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {activity.user?.profession}
                        </span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 mt-1">
                        {activity.title}
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
