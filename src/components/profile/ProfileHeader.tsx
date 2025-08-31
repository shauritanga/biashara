import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProfileHeaderProps {
  profile: {
    id: number
    firstName?: string
    lastName?: string
    email: string
    phone: string
    profession?: string
    businessType?: string
    skills: string[]
    avatar?: string
    country: string
    isVerified: boolean
    createdAt: Date
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
  }
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
  const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase()

  return (
    <Card className="overflow-hidden">
      {/* Cover Background */}
      <div className="h-32 bg-gradient-to-r from-primary-500 to-accent-500 relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <CardContent className="relative -mt-16 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
          {/* Profile Picture */}
          <div className="relative mb-4 sm:mb-0">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={fullName || 'Profile'}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500 text-2xl font-bold text-white">
                  {initials || 'U'}
                </div>
              )}
            </div>
            {profile.isVerified && (
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {fullName || 'User'}
                </h1>
                {profile.profession && (
                  <p className="text-lg text-neutral-600 dark:text-neutral-400">
                    {profile.profession}
                  </p>
                )}
                {profile.businessType && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {profile.businessType}
                  </p>
                )}
                <div className="mt-2 flex items-center space-x-4 text-sm text-neutral-500">
                  <span className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span>{profile.email}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{profile.phone}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button asChild>
                  <Link href="/profile/edit">
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/network">
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    View Network
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        {profile.skills.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Connections */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {profile.provider && (
            <div className="flex items-center space-x-3 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-neutral-700">
                {profile.provider.logo ? (
                  <img
                    src={profile.provider.logo}
                    alt={profile.provider.name}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-primary-600">
                    {profile.provider.name[0]}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {profile.provider.name}
                </p>
                <p className="text-xs text-neutral-500">Provider</p>
              </div>
            </div>
          )}

          {profile.institution && (
            <div className="flex items-center space-x-3 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-neutral-700">
                {profile.institution.logo ? (
                  <img
                    src={profile.institution.logo}
                    alt={profile.institution.name}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold text-primary-600">
                    {profile.institution.name[0]}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {profile.institution.name}
                </p>
                <p className="text-xs text-neutral-500">{profile.institution.level}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Member since
              </p>
              <p className="text-xs text-neutral-500">
                {new Date(profile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
