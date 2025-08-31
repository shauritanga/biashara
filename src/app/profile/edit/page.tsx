import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getUserProfile } from '@/app/actions/profile'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ProfileEditForm } from '@/components/profile/ProfileEditForm'
import Link from 'next/link'

export default async function ProfileEditPage() {
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
                <Link href="/profile">Back to Profile</Link>
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Button asChild>
            <Link href="/profile">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Profile
            </Link>
          </Button>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          Edit Profile
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Update your personal information and preferences
        </p>
      </div>

      {/* Edit Form */}
      <ProfileEditForm profile={{
        ...profile,
        profession: profile.profession || undefined,
        businessType: profile.businessType || undefined,
        avatar: profile.avatar || undefined,
        providerId: profile.providerId || undefined,
        institutionId: profile.institutionId || undefined
      }} />
    </div>
  )
}
