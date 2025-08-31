import { Button } from '@/components/ui/button'

interface ClubHeroProps {
  club: {
    id: number
    name: string
    sport: string
    logo?: string | null
    memberCount?: number
  }
  content: any
}

export function ClubHero({ club, content }: ClubHeroProps) {
  // Define brand colors for different clubs
  const getBrandColors = (clubName: string) => {
    const name = clubName.toLowerCase()

    if (name.includes('simba')) {
      return 'bg-gradient-to-r from-red-600 to-yellow-500' // Simba red/yellow
    } else if (name.includes('yanga') || name.includes('young africans')) {
      return 'bg-gradient-to-r from-yellow-500 to-green-600' // Yanga yellow/green
    } else {
      return 'bg-gradient-to-r from-primary-600 to-accent-600' // Default
    }
  }

  const brandColors = getBrandColors(club.name)

  return (
    <div className={`relative ${brandColors} py-16 md:py-24`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('/patterns/club-pattern.svg')] opacity-10"></div>
      
      <div className="container-mobile relative">
        <div className="flex flex-col items-center text-center text-white md:flex-row md:text-left">
          {/* Club Logo */}
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-white p-2 shadow-lg md:h-32 md:w-32">
              {club.logo ? (
                <img
                  src={club.logo}
                  alt={`${club.name} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-2xl font-bold text-neutral-600 md:text-3xl">
                  {club.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Club Info */}
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-center space-x-2 md:justify-start">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                {club.sport}
              </span>
              {club.memberCount && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                  {club.memberCount.toLocaleString()} Fans
                </span>
              )}
            </div>
            
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              {club.name}
            </h1>
            
            <p className="mb-6 text-lg text-primary-100 md:text-xl">
              {content?.description || `Official page of ${club.name}`}
            </p>

            {content?.founded && (
              <p className="mb-6 text-primary-200">
                Founded: {content.founded}
              </p>
            )}

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                Join Fan Community
              </Button>
              <Button 
                size="lg" 
                
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Latest News
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
