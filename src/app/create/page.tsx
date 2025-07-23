import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CreatePage() {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  const createOptions = [
    {
      title: 'Share a Post',
      description: 'Share thoughts, updates, or announcements with your network',
      icon: '📝',
      href: '/create/post',
      color: 'bg-blue-500',
      popular: true
    },
    {
      title: 'List Product/Service',
      description: 'Sell products or offer services to your network',
      icon: '🛍️',
      href: '/create/product',
      color: 'bg-green-500',
      popular: true
    },
    {
      title: 'Add Portfolio Item',
      description: 'Showcase your work, projects, or achievements',
      icon: '🎨',
      href: '/create/portfolio',
      color: 'bg-purple-500',
      popular: false
    },
    {
      title: 'Post a Job',
      description: 'Find talented professionals for your business',
      icon: '💼',
      href: '/create/job',
      color: 'bg-orange-500',
      popular: false
    },
    {
      title: 'Share Innovation',
      description: 'Present your innovative ideas or solutions',
      icon: '💡',
      href: '/create/innovation',
      color: 'bg-yellow-500',
      popular: false
    },
    {
      title: 'Create Event',
      description: 'Organize events for your community',
      icon: '📅',
      href: '/create/event',
      color: 'bg-red-500',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-8 md:py-12">
        <div className="container-mobile">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold md:text-4xl">
              Create & Share
            </h1>
            <p className="mt-2 text-primary-100">
              Share your content with Tanzania's largest business network
            </p>
          </div>
        </div>
      </div>

      <div className="container-mobile py-8">
        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="text-center p-4">
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                25K+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Active Users
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-4">
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                15M+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Network Reach
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center p-4">
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                5K+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Daily Posts
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            What would you like to create?
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {createOptions.map((option, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {option.popular && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center rounded-full bg-accent-500 px-2 py-1 text-xs font-medium text-white">
                      Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-3">
                  <div className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center text-3xl text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {option.icon}
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center pt-0">
                  <Button className="w-full group-hover:bg-primary-600" asChild>
                    <Link href={option.href}>
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">💡</span>
              <span>Tips for Success</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  📱 Connect Your Profile
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Link to your telecom provider and clubs to reach more people in your network.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  🎯 Use Relevant Tags
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Add tags related to your profession and interests for better discoverability.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  📸 Add Quality Images
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Posts with images get 3x more engagement than text-only posts.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  🤝 Engage with Community
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Respond to comments and interact with others to build your network.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
