import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getUserProfile } from '@/app/actions/profile'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileStats } from '@/components/profile/ProfileStats'
import { ProfileContent } from '@/components/profile/ProfileContent'
import { ProfileConnections } from '@/components/profile/ProfileConnections'
import Link from 'next/link'

export default async function ProfilePage() {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  const profileResult = await getUserProfile()
  
  if (!profileResult.success) {
    return (
      <div className="container-mobile py-6">
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <svg className="h-16 w-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Profile Error
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {profileResult.error || 'Failed to load profile'}
                </p>
              </div>
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const profile = profileResult.data

  return (
    <div className="container-mobile py-6">
      {/* Profile Header */}
      <ProfileHeader profile={{
        ...profile,
        profession: profile.profession || undefined,
        businessType: profile.businessType || undefined,
        avatar: profile.avatar || undefined,
        provider: profile.provider ? {
          ...profile.provider,
          logo: profile.provider.logo || undefined
        } : profile.provider,
        institution: profile.institution ? {
          ...profile.institution,
          logo: profile.institution.logo || undefined
        } : profile.institution
      }} />

      {/* Profile Stats */}
      <div className="mt-8">
        <ProfileStats stats={profile.stats} />
      </div>

      {/* Profile Content Tabs */}
      <div className="mt-8">
        <ProfileContent
          posts={profile.feedItems.map(item => ({
            ...item,
            description: item.description || undefined
          }))}
          products={profile.products}
          portfolios={profile.portfolios.map(portfolio => ({
            ...portfolio,
            projectUrl: portfolio.projectUrl || undefined
          }))}
        />
      </div>

      {/* Connections Section */}
      <div className="mt-8">
        <ProfileConnections
          provider={profile.provider ? {
            ...profile.provider,
            logo: profile.provider.logo || undefined
          } : profile.provider}
          institution={profile.institution ? {
            ...profile.institution,
            logo: profile.institution.logo || undefined
          } : profile.institution}
          clubs={profile.clubs.map(club => ({
            ...club,
            logo: club.logo || undefined
          }))}
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <Button variant="ghost" className="w-full h-auto flex-col space-y-2 p-4" asChild>
            <Link href="/create/post">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium">Create Post</span>
            </Link>
          </Button>
        </Card>
        
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <Button variant="ghost" className="w-full h-auto flex-col space-y-2 p-4" asChild>
            <Link href="/create/product">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Add Product</span>
            </Link>
          </Button>
        </Card>
        
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <Button variant="ghost" className="w-full h-auto flex-col space-y-2 p-4" asChild>
            <Link href="/create/portfolio">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-sm font-medium">Portfolio</span>
            </Link>
          </Button>
        </Card>
        
        <Card className="p-4 text-center hover:shadow-lg transition-shadow">
          <Button variant="ghost" className="w-full h-auto flex-col space-y-2 p-4" asChild>
            <Link href="/profile/edit">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </Button>
        </Card>
      </div>

      {/* Profile Completion */}
      {(!profile.profession || !profile.businessType || profile.skills.length === 0) && (
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Complete Your Profile</span>
              </CardTitle>
              <CardDescription>
                Add more information to help others discover and connect with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link href="/profile/edit">
                    Complete Profile
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
      )}
    </div>
  )
}
