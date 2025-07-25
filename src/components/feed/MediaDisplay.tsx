'use client'

import { useState } from 'react'
import { ImagePreviewModal } from '@/components/ui/ImagePreviewModal'

interface MediaDisplayProps {
  mediaUrls: string[]
  title?: string
}

// Helper function to check if URL is likely to be valid
function isValidImageUrl(url: string): boolean {
  // Check if it's a Cloudinary URL or other known valid domains
  const validDomains = ['cloudinary.com', 'res.cloudinary.com', 'images.unsplash.com', 'picsum.photos']
  const isExternalUrl = url.startsWith('http://') || url.startsWith('https://')

  if (isExternalUrl) {
    return validDomains.some(domain => url.includes(domain))
  }

  // For local URLs, we'll let them try to load and handle errors gracefully
  return true
}

export function MediaDisplay({ mediaUrls, title }: MediaDisplayProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)

  if (!mediaUrls || mediaUrls.length === 0) {
    return null
  }

  const handleImageClick = (index: number) => {
    // Only open preview for images, not videos
    const imageUrls = mediaUrls.filter(url =>
      !url.includes('.mp4') && !url.includes('.webm') && !url.includes('.mov')
    )

    if (imageUrls.length > 0) {
      // Find the correct index in the image-only array
      const imageIndex = imageUrls.findIndex(imageUrl => imageUrl === mediaUrls[index])
      if (imageIndex !== -1) {
        setPreviewIndex(imageIndex)
        setPreviewOpen(true)
      }
    }
  }

  // Get only image URLs for preview modal
  const imageUrls = mediaUrls.filter(url =>
    !url.includes('.mp4') && !url.includes('.webm') && !url.includes('.mov')
  )

  return (
    <>
    <div className="mb-4">
      {mediaUrls.length === 1 ? (
        // Single media item
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-700">
          {mediaUrls[0].includes('.mp4') || mediaUrls[0].includes('.webm') || mediaUrls[0].includes('.mov') ? (
            <video
              src={mediaUrls[0]}
              className="h-full w-full object-cover"
              controls
              preload="metadata"
            />
          ) : (
            <img
              src={mediaUrls[0]}
              alt="Post media"
              className="h-full w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(0)}
              onError={(e) => {
                // Only log errors for external URLs to reduce console noise
                if (mediaUrls[0].startsWith('http')) {
                  console.warn('Failed to load external image:', mediaUrls[0])
                }
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-500">
                      <div class="text-center">
                        <svg class="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p class="text-xs">Image not available</p>
                        ${mediaUrls[0].startsWith('/') ? '<p class="text-xs text-neutral-400 mt-1">Demo content</p>' : ''}
                      </div>
                    </div>
                  `
                }
              }}
            />
          )}
        </div>
      ) : (
        // Multiple media items - grid layout
        <div className={`grid gap-2 ${
          mediaUrls.length === 2 ? 'grid-cols-2' :
          mediaUrls.length === 3 ? 'grid-cols-2' :
          'grid-cols-2'
        }`}>
          {mediaUrls.slice(0, 4).map((url, index) => (
            <div
              key={index}
              className={`aspect-square overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-700 relative ${
                mediaUrls.length === 3 && index === 0 ? 'row-span-2' : ''
              }`}
            >
              {url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') ? (
                <video
                  src={url}
                  className="h-full w-full object-cover"
                  preload="metadata"
                />
              ) : (
                <img
                  src={url}
                  alt={`Post media ${index + 1}`}
                  className="h-full w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(index)}
                  onError={(e) => {
                    // Only log errors for external URLs to reduce console noise
                    if (url.startsWith('http')) {
                      console.warn('Failed to load external grid image:', url)
                    }
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-500">
                          <div class="text-center">
                            <svg class="h-6 w-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p class="text-xs">N/A</p>
                          </div>
                        </div>
                      `
                    }
                  }}
                />
              )}
              {mediaUrls.length > 4 && index === 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    +{mediaUrls.length - 4} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        images={imageUrls}
        initialIndex={previewIndex}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  )
}
