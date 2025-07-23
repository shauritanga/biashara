import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface ProviderAboutProps {
  provider: {
    name: string
  }
  content: any
}

export function ProviderAbout({ provider, content }: ProviderAboutProps) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          About {provider.name}
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Learn more about our company and services
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🏢</span>
              <span>Company Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {content?.about || `${provider.name} is a leading telecommunications provider committed to connecting people and enabling digital transformation.`}
            </p>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🛠️</span>
              <span>Our Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {content?.services && content.services.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {content.services.map((service: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary-500" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">
                Mobile, Internet, and Digital Services
              </p>
            )}
          </CardContent>
        </Card>

        {/* Awards & Recognition */}
        {content?.awards && content.awards.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <span>Awards & Recognition</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {content.awards.map((award: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 rounded-lg bg-accent-50 p-3 dark:bg-accent-900/20"
                  >
                    <span className="text-lg">🥇</span>
                    <span className="text-sm font-medium text-accent-700 dark:text-accent-400">
                      {award}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">📞</span>
              <span>Contact & Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Customer Service */}
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Customer Service
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Call 100 (Free)
                </p>
              </div>

              {/* Live Chat */}
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Live Chat
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  24/7 Support
                </p>
              </div>

              {/* Website */}
              {content?.website && (
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Website
                  </h4>
                  <a 
                    href={content.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
                  >
                    Visit Site
                  </a>
                </div>
              )}

              {/* Social Media */}
              {content?.socialMedia && (
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Follow Us
                  </h4>
                  <div className="flex justify-center space-x-2 mt-2">
                    {content.socialMedia.facebook && (
                      <a
                        href={content.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500"
                        aria-label="Facebook"
                      >
                        📘
                      </a>
                    )}
                    {content.socialMedia.twitter && (
                      <a
                        href={content.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                        aria-label="Twitter"
                      >
                        🐦
                      </a>
                    )}
                    {content.socialMedia.instagram && (
                      <a
                        href={content.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-500"
                        aria-label="Instagram"
                      >
                        📷
                      </a>
                    )}
                    {content.socialMedia.linkedin && (
                      <a
                        href={content.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-600"
                        aria-label="LinkedIn"
                      >
                        💼
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
