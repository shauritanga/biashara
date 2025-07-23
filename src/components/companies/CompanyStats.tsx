interface CompanyStatsProps {
  company: {
    id: number
    name: string
    industry: string
    feedItemsCount?: number
  }
  content: any
}

export function CompanyStats({ company, content }: CompanyStatsProps) {
  // Define brand accent colors for different companies
  const getBrandAccentColor = (companyName: string) => {
    const name = companyName.toLowerCase()

    if (name.includes('dstv')) {
      return 'text-blue-600 dark:text-blue-400'
    } else if (name.includes('crdb')) {
      return 'text-green-600 dark:text-green-400'
    } else if (name.includes('azam')) {
      return 'text-blue-600 dark:text-blue-400'
    } else if (name.includes('tech')) {
      return 'text-purple-600 dark:text-purple-400'
    } else {
      return 'text-primary-600 dark:text-primary-400'
    }
  }

  const brandAccentColor = getBrandAccentColor(company.name)

  const stats = [
    {
      label: 'Years of Service',
      value: content?.founded ? new Date().getFullYear() - parseInt(content.founded) : 'N/A',
      icon: '📅'
    },
    {
      label: 'Employees',
      value: content?.employees?.toLocaleString() || 'N/A',
      icon: '👥'
    },
    {
      label: 'Services',
      value: content?.services?.length || '0',
      icon: '🛠️'
    },
    {
      label: 'Industry',
      value: company.industry,
      icon: company.industry === 'Banking' ? '🏦' :
            company.industry === 'Entertainment' ? '📺' :
            company.industry === 'Technology' ? '💻' : '🏢'
    }
  ]

  return (
    <div className="bg-white dark:bg-neutral-800 py-8">
      <div className="container-mobile">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-2xl">{stat.icon}</div>
              <div className={`text-2xl font-bold md:text-3xl ${brandAccentColor}`}>
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
