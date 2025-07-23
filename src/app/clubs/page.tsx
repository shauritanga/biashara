import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getClubs() {
  try {
    const clubs = await prisma.club.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })

    // Get member counts for each club
    const clubsWithCounts = await Promise.all(
      clubs.map(async (club) => {
        const memberCount = await prisma.user.count({
          where: {
            clubIds: { has: club.id }
          }
        })
        return { ...club, memberCount }
      })
    )

    return clubsWithCounts
  } catch (error) {
    console.error('Error fetching clubs:', error)
    return []
  }
}

export default async function ClubsPage() {
  const clubs = await getClubs()

  return (
    <div className="container-mobile py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          Sports Clubs
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Follow your favorite sports clubs and connect with fellow fans
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => {
          const content = club.content as any
          
          return (
            <Card key={club.id} variant="elevated" className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                    {club.logo ? (
                      <img
                        src={club.logo}
                        alt={`${club.name} logo`}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-lg">
                        {club.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{club.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{club.sport}</span>
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
                  {content?.description || `${club.name} - ${club.sport} club`}
                </p>

                {/* Achievements Preview */}
                {content?.achievements && content.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                      Achievements:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {content.achievements.slice(0, 2).map((achievement: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-accent-100 px-2 py-1 text-xs font-medium text-accent-700 dark:bg-accent-900/20 dark:text-accent-300"
                        >
                          🏆 {achievement}
                        </span>
                      ))}
                      {content.achievements.length > 2 && (
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
                          +{content.achievements.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <span>👥</span>
                      <span>{club.memberCount?.toLocaleString() || '0'} fans</span>
                    </span>
                    {content?.stadium && (
                      <span className="flex items-center space-x-1">
                        <span>🏟️</span>
                        <span className="truncate max-w-20">{content.stadium}</span>
                      </span>
                    )}
                  </div>
                  <span className="flex items-center space-x-1">
                    <span>⚽</span>
                    <span>{club.sport}</span>
                  </span>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button variant="outline" className="flex-1" size="sm" asChild>
                    <Link href={`/clubs/${club.slug}`}>
                      View Club
                    </Link>
                  </Button>
                  <Button className="flex-1" size="sm">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {clubs.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <svg className="h-16 w-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  No clubs available
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Check back later for sports club listings.
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
              Are you a sports fan?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Join our platform to connect with fellow fans and discover businesses from your club's community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/auth/register">
                  Join Community
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/network">
                  Explore Network
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
