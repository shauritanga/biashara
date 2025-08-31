import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/utils'

interface ProviderHeroProps {
  provider: {
    id: number
    name: string
    logo?: string | null
    feedItemsCount?: number
  }
  content: any
}

export function ProviderHero({ provider, content }: ProviderHeroProps) {
  // Define brand colors for different providers
  const getBrandColors = (providerName: string) => {
    const name = providerName.toLowerCase()

    if (name.includes('vodacom')) {
      return 'bg-gradient-to-br from-red-50 via-red-100 to-red-200 dark:from-red-900/20 dark:via-red-800/20 dark:to-red-700/20'
    } else if (name.includes('airtel')) {
      return 'bg-gradient-to-br from-red-50 via-red-100 to-orange-100 dark:from-red-900/20 dark:via-red-800/20 dark:to-orange-800/20'
    } else if (name.includes('tigo')) {
      return 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-900/20 dark:via-blue-800/20 dark:to-blue-700/20'
    } else if (name.includes('halotel')) {
      return 'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 dark:from-orange-900/20 dark:via-orange-800/20 dark:to-orange-700/20'
    } else {
      return 'bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900/20 dark:via-neutral-900 dark:to-accent-900/20'
    }
  }

  const brandColors = getBrandColors(provider.name)

  return (
    <div className={`relative overflow-hidden ${brandColors}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-neutral-100/50 dark:bg-grid-neutral-800/50" />
      
      <div className="container-mobile relative py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          {/* Logo */}
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-neutral-800 md:h-32 md:w-32">
            {provider.logo ? (
              <img
                src={provider.logo}
                alt={`${provider.name} logo`}
                className="h-16 w-16 object-contain md:h-24 md:w-24"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-500 text-white font-bold text-2xl md:h-24 md:w-24 md:text-3xl">
                {provider.name[0]}
              </div>
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 md:text-4xl lg:text-5xl">
              {provider.name}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 md:text-xl">
              {content?.description || 'Leading telecommunications provider'}
            </p>
          </div>

          {/* Key Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {content?.totalUsers && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 md:text-3xl">
                  {formatNumber(content.totalUsers)}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Total Users
                </div>
              </div>
            )}
            
            {content?.coverage && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 md:text-3xl">
                  {content.coverage}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Coverage
                </div>
              </div>
            )}
            
            {content?.founded && (
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 md:text-3xl">
                  {new Date().getFullYear() - parseInt(content.founded)}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Years Experience
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-8">
              View Services
            </Button>
            {content?.website && (
              <Button 
                
                size="lg" 
                className="px-8"
                asChild
              >
                <a 
                  href={content.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </Button>
            )}
          </div>

          {/* Awards */}
          {content?.awards && content.awards.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {content.awards.slice(0, 3).map((award: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-900/20 dark:text-accent-400"
                >
                  🏆 {award}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-6 w-full text-neutral-50 dark:text-neutral-900"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}
