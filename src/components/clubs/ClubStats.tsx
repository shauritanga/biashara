interface ClubStatsProps {
  club: {
    id: number
    name: string
    memberCount?: number
    feedItemsCount?: number
  }
  content: any
}

export function ClubStats({ club, content }: ClubStatsProps) {
  // Define brand accent colors for different clubs
  const getBrandAccentColor = (clubName: string) => {
    const name = clubName.toLowerCase()

    if (name.includes('simba')) {
      return 'text-red-600 dark:text-red-400'
    } else if (name.includes('yanga') || name.includes('young africans')) {
      return 'text-yellow-600 dark:text-yellow-400'
    } else {
      return 'text-primary-600 dark:text-primary-400'
    }
  }

  const brandAccentColor = getBrandAccentColor(club.name)

  const stats = [
    {
      label: 'Fans on Platform',
      value: club.memberCount?.toLocaleString() || '0',
      icon: '👥'
    },
    {
      label: 'League Titles',
      value: content?.achievements?.[0]?.split(' ')[0] || '0',
      icon: '🏆'
    },
    {
      label: 'Founded',
      value: content?.founded || 'N/A',
      icon: '📅'
    },
    {
      label: 'Stadium',
      value: content?.stadium || 'N/A',
      icon: '🏟️'
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
