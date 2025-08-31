import { Button } from '@/components/ui/button'

interface CompanyHeroProps {
  company: {
    id: number
    name: string
    industry: string
    logo?: string | null
  }
  content: any
}

export function CompanyHero({ company, content }: CompanyHeroProps) {
  // Define brand colors for different companies
  const getBrandColors = (companyName: string) => {
    const name = companyName.toLowerCase()

    if (name.includes('dstv')) {
      return 'bg-gradient-to-r from-blue-800 to-blue-900' // DSTV blue
    } else if (name.includes('crdb')) {
      return 'bg-gradient-to-r from-green-600 to-green-700' // CRDB green
    } else if (name.includes('azam')) {
      return 'bg-gradient-to-r from-blue-700 to-blue-600' // Azam blue
    } else if (name.includes('tech')) {
      return 'bg-gradient-to-r from-purple-600 to-indigo-600' // Tech purple
    } else {
      return 'bg-gradient-to-r from-primary-600 to-accent-600' // Default
    }
  }

  const brandColors = getBrandColors(company.name)

  return (
    <div className={`relative ${brandColors} py-16 md:py-24`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('/patterns/company-pattern.svg')] opacity-10"></div>
      
      <div className="container-mobile relative">
        <div className="flex flex-col items-center text-center text-white md:flex-row md:text-left">
          {/* Company Logo */}
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-white p-2 shadow-lg md:h-32 md:w-32">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-2xl font-bold text-neutral-600 md:text-3xl">
                  {company.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-center space-x-2 md:justify-start">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                {company.industry}
              </span>
              {content?.employees && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                  {content.employees.toLocaleString()} Employees
                </span>
              )}
            </div>
            
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              {company.name}
            </h1>
            
            <p className="mb-6 text-lg text-primary-100 md:text-xl">
              {content?.description || `Official page of ${company.name}`}
            </p>

            {content?.founded && (
              <p className="mb-6 text-primary-200">
                Founded: {content.founded}
              </p>
            )}

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-white text-neutral-800 hover:bg-neutral-100 font-semibold">
                Our Services
              </Button>
              <Button
                size="lg"
               
                className="border-white text-white hover:bg-white hover:text-neutral-800 font-semibold"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
