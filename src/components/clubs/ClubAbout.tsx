import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ClubAboutProps {
  club: {
    id: number
    name: string
    sport: string
  }
  content: any
}

export function ClubAbout({ club, content }: ClubAboutProps) {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          About {club.name}
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Learn more about our club's history and achievements
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Club History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📖</span>
              <span>Club History</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400">
              {content?.description || `${club.name} is one of the most prestigious ${club.sport} clubs with a rich history and passionate fanbase.`}
            </p>
            
            {content?.founded && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">Founded:</span>
                <span className="text-neutral-600 dark:text-neutral-400">{content.founded}</span>
              </div>
            )}

            {content?.stadium && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">Home Stadium:</span>
                <span className="text-neutral-600 dark:text-neutral-400">{content.stadium}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏆</span>
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {content?.achievements && content.achievements.length > 0 ? (
              <ul className="space-y-2">
                {content.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-accent-500">•</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{achievement}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">
                Achievements and trophies will be displayed here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>ℹ️</span>
            <span>Club Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Sport</h4>
              <p className="text-neutral-600 dark:text-neutral-400">{club.sport}</p>
            </div>
            
            {content?.founded && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Established</h4>
                <p className="text-neutral-600 dark:text-neutral-400">{content.founded}</p>
              </div>
            )}

            {content?.stadium && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Stadium</h4>
                <p className="text-neutral-600 dark:text-neutral-400">{content.stadium}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
