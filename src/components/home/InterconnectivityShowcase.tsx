import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface InterconnectivityShowcaseProps {
  stats: {
    totalUsers: number
    totalProviders: number
    totalClubs: number
    totalInstitutions: number
    totalBusinesses: number
    totalConnections: number
  }
}

export function InterconnectivityShowcase({ stats }: InterconnectivityShowcaseProps) {
  const connections = [
    {
      title: 'Telecom Providers',
      description: 'Connect with Vodacom, Airtel users and discover their businesses',
      icon: '📱',
      count: stats.totalProviders,
      userCount: '15M+ users',
      color: 'bg-blue-500',
      href: '/providers'
    },
    {
      title: 'Sports Clubs',
      description: 'Join Simba SC, Yanga fans and connect with fellow supporters',
      icon: '⚽',
      count: stats.totalClubs,
      userCount: '2M+ fans',
      color: 'bg-green-500',
      href: '/clubs'
    },
    {
      title: 'Universities & Institutions',
      description: 'Connect with students, alumni, and academic professionals',
      icon: '🏫',
      count: stats.totalInstitutions,
      userCount: '500K+ students',
      color: 'bg-purple-500',
      href: '/institutions'
    },
    {
      title: 'User Businesses',
      description: 'Discover products and services from your network',
      icon: '🏪',
      count: stats.totalBusinesses,
      userCount: '50K+ businesses',
      color: 'bg-orange-500',
      href: '/marketplace'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900/10 dark:via-neutral-900 dark:to-accent-900/10">
      <div className="container-mobile">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 md:text-4xl">
            Tanzania's Largest Business Network
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Connecting users with companies, institutions, clubs, and each other. 
            Your business appears on popular pages where your customers already are.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {(stats.totalUsers / 1000000).toFixed(1)}M+
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Connected Users
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">
                {stats.totalBusinesses.toLocaleString()}+
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Active Businesses
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.totalConnections.toLocaleString()}+
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Network Connections
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 bg-white/80 backdrop-blur-sm dark:bg-neutral-800/80">
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {((stats.totalProviders + stats.totalClubs + stats.totalInstitutions)).toLocaleString()}+
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Partner Organizations
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connection Types */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {connections.map((connection, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm dark:bg-neutral-800/90">
              <CardHeader className="text-center pb-3">
                <div className={`w-16 h-16 rounded-full ${connection.color} flex items-center justify-center text-3xl text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {connection.icon}
                </div>
                <CardTitle className="text-xl">{connection.title}</CardTitle>
                <CardDescription className="text-sm">
                  {connection.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center pt-0">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    {connection.count}+
                  </div>
                  <div className="text-sm text-neutral-500">
                    {connection.userCount}
                  </div>
                </div>
                
                <Button className="w-full group-hover:bg-primary-600" asChild>
                  <Link href={connection.href}>
                    Explore Network
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white/60 dark:bg-neutral-800/60 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-8">
            How Interconnectivity Works
          </h3>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Connect Your Profile
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Link your account to your telecom provider, favorite clubs, and institutions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900/20 flex items-center justify-center text-accent-600 dark:text-accent-400 mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                List Your Business
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Your products appear on your provider's page, reaching millions of potential customers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Grow Your Network
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Connect with like-minded professionals and discover new opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Ready to Join Tanzania's Business Network?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Connect with millions of users through their favorite providers, clubs, and institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/network">
                  Explore Your Network
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/marketplace/create">
                  List Your Business
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
