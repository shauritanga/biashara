import { formatNumber } from '@/lib/utils'

interface Testimonial {
  name: string
  profession: string
  business: string
  avatar: string
  quote: string
  rating: number
}

interface ProviderTestimonialsProps {
  testimonials: Testimonial[]
  totalUsers: number
  providerName: string
}

export function ProviderTestimonials({ testimonials, totalUsers, providerName }: ProviderTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const remainingUsers = Math.max(0, totalUsers - testimonials.length)

  return (
    <section className="py-8 md:py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Real experiences from {providerName} users across Tanzania
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {testimonials.slice(0, 5).map((testimonial, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
          >
            {/* Rating Stars */}
            <div className="mb-4 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? 'text-yellow-400'
                      : 'text-neutral-300 dark:text-neutral-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-4 text-neutral-700 dark:text-neutral-300">
              "{testimonial.quote}"
            </blockquote>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                {/* Use initials as fallback since we can't use onError in server components */}
                <div className="flex h-full w-full items-center justify-center bg-primary-500 text-white font-semibold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                  {testimonial.name}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                  {testimonial.profession}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate">
                  {testimonial.business}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Count Summary */}
      <div className="rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 p-6 text-center dark:from-primary-900/20 dark:to-accent-900/20 md:p-8">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-center md:space-x-8 md:space-y-0">
          {/* Featured Users */}
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <div
                  key={index}
                  className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-700"
                >
                  {/* Use initials as fallback */}
                  <div className="flex h-full w-full items-center justify-center bg-primary-500 text-white font-semibold text-xs">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              ))}
              {remainingUsers > 0 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-neutral-300 text-xs font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-600 dark:text-neutral-300">
                  +{remainingUsers > 999999 ? `${Math.floor(remainingUsers / 1000000)}M` : remainingUsers > 999 ? `${Math.floor(remainingUsers / 1000)}K` : remainingUsers}
                </div>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Join {formatNumber(totalUsers)}+ satisfied customers
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Trusted by professionals across Tanzania
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="rounded-lg bg-primary-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600">
              Join Our Network
            </button>
            <button className="rounded-lg border border-primary-500 px-6 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/20">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Professional Categories */}
      <div className="mt-8">
        <h3 className="text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Trusted by Professionals in Every Field
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from(new Set(testimonials.map(t => t.profession))).map((profession, index) => (
            <span
              key={index}
              className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {profession}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
