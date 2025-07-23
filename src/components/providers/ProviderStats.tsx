import { formatNumber } from '@/lib/utils'

interface ProviderStatsProps {
  provider: {
    name: string
    feedItemsCount?: number
  }
  content: any
}

export function ProviderStats({ provider, content }: ProviderStatsProps) {
  // Define brand accent colors for different providers
  const getBrandAccentColor = (providerName: string) => {
    const name = providerName.toLowerCase()

    if (name.includes('vodacom')) {
      return 'text-red-600 dark:text-red-400'
    } else if (name.includes('airtel')) {
      return 'text-red-500 dark:text-red-400'
    } else if (name.includes('tigo')) {
      return 'text-blue-600 dark:text-blue-400'
    } else if (name.includes('halotel')) {
      return 'text-orange-600 dark:text-orange-400'
    } else {
      return 'text-primary-600 dark:text-primary-400'
    }
  }

  const brandAccentColor = getBrandAccentColor(provider.name)

  const stats = [
    {
      label: 'Total Users',
      value: content?.totalUsers ? formatNumber(content.totalUsers) : '0',
      icon: '👥',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      label: 'Active Users',
      value: content?.activeUsers ? formatNumber(content.activeUsers) : '0',
      icon: '📱',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      label: 'Network Coverage',
      value: content?.coverage || 'N/A',
      icon: '📡',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    },
    {
      label: 'Years of Service',
      value: content?.founded ? `${new Date().getFullYear() - parseInt(content.founded)}+` : 'N/A',
      icon: '🏆',
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
    },
    {
      label: 'Employees',
      value: content?.employees || 'N/A',
      icon: '👔',
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
    },
    {
      label: 'Feed Posts',
      value: provider.feedItemsCount?.toString() || '0',
      icon: '📰',
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
    }
  ]

  return (
    <div className="bg-white dark:bg-neutral-800 py-8 md:py-12">
      <div className="container-mobile">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
            {provider.name} at a Glance
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Key statistics and achievements
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl bg-neutral-50 p-4 text-center transition-transform hover:scale-105 dark:bg-neutral-700 md:p-6"
            >
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`text-xl font-bold md:text-2xl ${brandAccentColor}`}>
                {stat.value}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Company Info */}
        {content?.headquarters && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-6 rounded-lg bg-neutral-100 px-6 py-3 dark:bg-neutral-700">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🏢</span>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Headquarters: {content.headquarters}
                </span>
              </div>
              {content?.founded && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📅</span>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Founded: {content.founded}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
