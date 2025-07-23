import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface CompanyAboutProps {
  company: {
    id: number
    name: string
    industry: string
  }
  content: any
}

export function CompanyAbout({ company, content }: CompanyAboutProps) {
  // Define brand accent colors for different companies
  const getBrandAccentColor = (companyName: string) => {
    const name = companyName.toLowerCase()

    if (name.includes('dstv')) {
      return 'text-blue-500'
    } else if (name.includes('crdb')) {
      return 'text-green-500'
    } else if (name.includes('azam')) {
      return 'text-blue-500'
    } else if (name.includes('tech')) {
      return 'text-purple-500'
    } else {
      return 'text-accent-500'
    }
  }

  const brandAccentColor = getBrandAccentColor(company.name)

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          About {company.name}
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Learn more about our company and what we do
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏢</span>
              <span>Company Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400">
              {content?.description || `${company.name} is a leading company in the ${company.industry} industry.`}
            </p>
            
            {content?.founded && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">Founded:</span>
                <span className="text-neutral-600 dark:text-neutral-400">{content.founded}</span>
              </div>
            )}

            {content?.employees && (
              <div className="flex items-center space-x-2">
                <span className="font-medium">Employees:</span>
                <span className="text-neutral-600 dark:text-neutral-400">{content.employees.toLocaleString()}</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <span className="font-medium">Industry:</span>
              <span className="text-neutral-600 dark:text-neutral-400">{company.industry}</span>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🛠️</span>
              <span>Our Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {content?.services && content.services.length > 0 ? (
              <ul className="space-y-2">
                {content.services.map((service: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className={brandAccentColor}>•</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{service}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400">
                Service information will be available soon.
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
            <span>Company Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Industry</h4>
              <p className="text-neutral-600 dark:text-neutral-400">{company.industry}</p>
            </div>
            
            {content?.founded && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Established</h4>
                <p className="text-neutral-600 dark:text-neutral-400">{content.founded}</p>
              </div>
            )}

            {content?.employees && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Team Size</h4>
                <p className="text-neutral-600 dark:text-neutral-400">{content.employees.toLocaleString()} employees</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
