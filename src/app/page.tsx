import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getFeedItems } from '@/app/actions/feed'
import { getInterconnectivityStats } from '@/app/actions/connections'
import { InterconnectivityShowcase } from '@/components/home/InterconnectivityShowcase'
import { MediaDisplay } from '@/components/feed/MediaDisplay'
import { PostInteractions } from '@/components/feed/PostInteractions'
import { formatRelativeTime, formatCurrency } from '@/lib/utils'
import Link from 'next/link'

export default async function Home() {
  const [feedResult, statsResult] = await Promise.all([
    getFeedItems(1, 10),
    getInterconnectivityStats()
  ])

  const feedItems = feedResult.success ? feedResult.data : []
  const stats = statsResult.success ? statsResult.data : {
    totalUsers: 25000,
    totalProviders: 5,
    totalClubs: 12,
    totalInstitutions: 20,
    totalBusinesses: 5000,
    totalConnections: 35000
  }

  return (
    <div className="container-mobile py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          Welcome to Glbiashara
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Discover opportunities, connect with your community, and grow your business
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
          <Link href="/create/post">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs">Create Post</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
          <Link href="/marketplace">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs">Marketplace</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
          <Link href="/jobs">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6" />
            </svg>
            <span className="text-xs">Jobs</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
          <Link href="/network">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">Network</span>
          </Link>
        </Button>
      </div>

      {/* Interconnectivity Showcase */}
      <InterconnectivityShowcase stats={stats} />

      {/* Feed */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Latest Updates
        </h2>

        {feedItems?.map((item) => {
          const getAuthorName = () => {
            if (item.user) {
              return `${item.user.firstName} ${item.user.lastName}`
            }
            if (item.contentData) {
              // Handle different content data types
              if ('name' in item.contentData) {
                return item.contentData.name || 'Unknown'
              }
              if ('title' in item.contentData) {
                return item.contentData.title || 'Unknown'
              }
              return 'Unknown'
            }
            return 'Glbiashara'
          }

          const getCategory = () => {
            switch (item.type) {
              case 'provider': return 'Telecommunications'
              case 'club': return 'Sports'
              case 'institution': return 'Education'
              case 'innovation': return 'Innovation'
              case 'portfolio': return 'Portfolio'
              case 'product': return 'Marketplace'
              case 'company': return 'Jobs'
              default: return 'General'
            }
          }

          const getPriceInfo = () => {
            if (item.type === 'product' && item.contentData && 'price' in item.contentData) {
              return formatCurrency(item.contentData.price, item.contentData.currency)
            }
            return null
          }

          return (
            <Card key={item.id} id={`post-${item.id}`} variant="elevated" className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {item.isPromoted && (
                        <span className="rounded-full bg-accent-500 px-2 py-1 text-xs font-medium text-white">
                          Promoted
                        </span>
                      )}
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {getCategory()}
                      </span>
                      <span className="text-sm text-neutral-500">•</span>
                      <span className="text-sm text-neutral-500">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <CardTitle className="mt-1">{item.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {item.description}
                      {getPriceInfo() && (
                        <span className="ml-2 font-semibold text-accent-600">
                          {getPriceInfo()}
                        </span>
                      )}
                    </CardDescription>
                    <div className="mt-2 flex items-center space-x-2 text-sm text-neutral-500">
                      <span>by {getAuthorName()}</span>
                      {item.user?.profession && (
                        <>
                          <span>•</span>
                          <span>{item.user.profession}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

            <CardContent className="pt-0">
              <MediaDisplay mediaUrls={item.mediaUrls} title={item.title} />


              {item.tags && item.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 4).map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 4 && (
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                      +{item.tags.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Post Interactions */}
              <PostInteractions feedItemId={item.id} />
            </CardContent>
          </Card>
        )
        })}

        {feedItems && feedItems.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <svg className="h-16 w-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    No posts yet
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Be the first to share something with the community!
                  </p>
                </div>
                <Button asChild>
                  <Link href="/create/post">Create Post</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
