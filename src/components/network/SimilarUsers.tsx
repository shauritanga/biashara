import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SimilarUsersProps {
  users: Array<{
    id: number
    firstName?: string
    lastName?: string
    profession?: string
    skills: string[]
    avatar?: string
    clubIds: number[]
    providerId?: number
    institutionId?: number
  }>
}

export function SimilarUsers({ users }: SimilarUsersProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center dark:bg-primary-900/20">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="font-semibold text-primary-600 text-lg">
                    {user.firstName?.[0] || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>
                  {user.profession || 'Professional'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Skills & Interests
                </h4>
                <div className="flex flex-wrap gap-1">
                  {user.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {skill}
                    </span>
                  ))}
                  {user.skills.length > 3 && (
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                      +{user.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Connection Indicators */}
            <div className="mb-4 space-y-2">
              {user.providerId && (
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="text-blue-500">📱</span>
                  <span>Same telecom provider</span>
                </div>
              )}
              
              {user.clubIds && user.clubIds.length > 0 && (
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="text-green-500">⚽</span>
                  <span>Shares {user.clubIds.length} club{user.clubIds.length > 1 ? 's' : ''}</span>
                </div>
              )}
              
              {user.institutionId && (
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="text-purple-500">🏫</span>
                  <span>Same institution</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button className="flex-1" size="sm">
                View Profile
              </Button>
              <Button className="flex-1" size="sm">
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
