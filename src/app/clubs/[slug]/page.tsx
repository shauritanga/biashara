import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { ClubHero } from '@/components/clubs/ClubHero'
import { ClubStats } from '@/components/clubs/ClubStats'
import { ClubAbout } from '@/components/clubs/ClubAbout'
import { UserBusinessShowcase } from '@/components/interconnect/UserBusinessShowcase'
import { getConnectedUserBusinesses } from '@/app/actions/connections'

interface ClubPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getClub(slug: string) {
  try {
    const club = await prisma.club.findUnique({
      where: { slug }
    })

    if (!club) return null

    // Get feed items count separately
    const feedItemsCount = await prisma.feedItem.count({
      where: {
        type: 'club',
        contentId: club.id,
        isActive: true
      }
    })

    // Get member count
    const memberCount = await prisma.user.count({
      where: {
        clubIds: { has: club.id }
      }
    })

    return {
      ...club,
      feedItemsCount,
      memberCount
    }
  } catch (error) {
    console.error('Error fetching club:', error)
    return null
  }
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params
  const club = await getClub(slug)

  if (!club) {
    notFound()
  }

  const content = club.content as any

  // Get connected user businesses
  const connectedBusinessesResult = await getConnectedUserBusinesses('club', club.id)
  const connectedBusinesses = connectedBusinessesResult.success
    ? (connectedBusinessesResult.data as Array<Record<string, unknown>>).map((business: Record<string, unknown>) => ({
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

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <ClubHero club={club} content={content} />

      {/* Stats Section */}
      <ClubStats club={club} content={content} />

      <div className="container-mobile space-y-8 py-8">
        {/* About Section */}
        <ClubAbout club={club} content={content} />

        {/* Latest News/Updates */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
              Latest Updates
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Stay updated with the latest news from {club.name}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for news/updates */}
            <Card>
              <CardHeader>
                <CardTitle>Match Results</CardTitle>
                <CardDescription>Latest match results and upcoming fixtures</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Check back for the latest match results and upcoming fixtures.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team News</CardTitle>
                <CardDescription>Player transfers and team updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Stay tuned for the latest team news and player updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fan Events</CardTitle>
                <CardDescription>Upcoming fan events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Join us for upcoming fan events and club activities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Connected User Businesses */}
      <UserBusinessShowcase
        businesses={connectedBusinesses}
        title={`Businesses from ${club.name} Fans`}
        subtitle={`Discover products and services from fellow ${club.name} supporters in your network`}
        entityName={club.name}
        entityType="club"
      />
    </div>
  )
}
