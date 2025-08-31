'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Banner {
  type: 'video' | 'image'
  url: string
  title: string
  description: string
}

interface ProviderBannersProps {
  banners: Banner[]
}

export function ProviderBanners({ banners }: ProviderBannersProps) {
  const [currentBanner, setCurrentBanner] = useState(0)

  if (!banners || banners.length === 0) {
    return null
  }

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-8 md:py-12">
      <div className="container-mobile">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Latest Offers & Promotions
          </h2>
          <p className="mt-2 text-primary-100">
            Don't miss out on our exclusive deals
          </p>
        </div>

        <div className="relative">
          {/* Main Banner Display */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
            {banners[currentBanner].type === 'video' ? (
              <div className="aspect-video">
                <video
                  className="h-full w-full object-cover"
                  controls
                  poster="/providers/video-poster.jpg"
                >
                  <source src={banners[currentBanner].url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="aspect-video relative">
                <img
                  src={banners[currentBanner].url}
                  alt={banners[currentBanner].title}
                  className="h-full w-full object-cover"
                />
                {/* Overlay for image banners */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold md:text-2xl">
                    {banners[currentBanner].title}
                  </h3>
                  <p className="mt-2 text-sm opacity-90 md:text-base">
                    {banners[currentBanner].description}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={prevBanner}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                  aria-label="Previous banner"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextBanner}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                  aria-label="Next banner"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Banner Info for Videos */}
          {banners[currentBanner].type === 'video' && (
            <div className="mt-4 rounded-lg bg-white p-4 dark:bg-neutral-800">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {banners[currentBanner].title}
              </h3>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                {banners[currentBanner].description}
              </p>
            </div>
          )}

          {/* Banner Indicators */}
          {banners.length > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`h-2 w-8 rounded-full transition-all ${
                    index === currentBanner
                      ? 'bg-white'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {banners.length > 1 && (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {banners.map((banner, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`group relative overflow-hidden rounded-lg transition-all ${
                  index === currentBanner
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-primary-500'
                    : 'hover:scale-105'
                }`}
              >
                <div className="aspect-video">
                  {banner.type === 'video' ? (
                    <div className="flex h-full items-center justify-center bg-neutral-800">
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  ) : (
                    <img
                      src={banner.url}
                      alt={banner.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {banner.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
