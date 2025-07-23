'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'
import { createPost } from '@/app/actions/posts'
import { useRouter } from 'next/navigation'

interface MediaFile {
  url: string
  publicId?: string
  type: 'image' | 'video'
  fileName: string
  size: number
  width?: number
  height?: number
}

export function CreatePostForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    mediaUrls: [] as string[]
  })
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const result = await createPost({
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        mediaUrls: mediaFiles.map(file => file.url)
      })

      if (result.success) {
        router.push('/')
        router.refresh()
      } else {
        alert(result.error || 'Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMediaUpload = (files: MediaFile[]) => {
    setMediaFiles(files)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>
            Create a post to share with your professional network
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                placeholder="What's on your mind?"
                maxLength={100}
              />
              <div className="mt-1 text-xs text-neutral-500">
                {formData.title.length}/100 characters
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                placeholder="Share more details about your post..."
                maxLength={500}
              />
              <div className="mt-1 text-xs text-neutral-500">
                {formData.description.length}/500 characters
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                placeholder="technology, business, innovation (separate with commas)"
              />
              <div className="mt-1 text-xs text-neutral-500">
                Add relevant tags to help people discover your post
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Images & Videos
              </label>
              <CloudinaryUpload
                onUpload={handleMediaUpload}
                maxFiles={5}
                allowImages={true}
                allowVideos={true}
                folder="glbiashara/posts"
              />
            </div>

            {/* Preview */}
            {(formData.title || formData.description || mediaFiles.length > 0) && (
              <div>
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Preview
                </h3>
                <Card className="bg-neutral-50 dark:bg-neutral-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{formData.title || 'Your post title'}</CardTitle>
                    <CardDescription>
                      {formData.description || 'Your post description'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-4">
                    {/* Media Preview */}
                    {mediaFiles.length > 0 && (
                      <div className="space-y-2">
                        <div className="grid gap-2 grid-cols-2">
                          {mediaFiles.slice(0, 4).map((file, index) => (
                            <div key={index} className="aspect-video bg-neutral-100 dark:bg-neutral-700 rounded-md overflow-hidden">
                              {file.type === 'image' ? (
                                <img
                                  src={file.url}
                                  alt={`Media ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <video
                                  src={file.url}
                                  className="h-full w-full object-cover"
                                  controls
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        {mediaFiles.length > 4 && (
                          <p className="text-xs text-neutral-500">
                            +{mediaFiles.length - 4} more files
                          </p>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {formData.tags && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.split(',').map((tag, index) => (
                          tag.trim() && (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                            >
                              #{tag.trim()}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="mt-6 bg-primary-50 dark:bg-primary-900/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-3">
            💡 Tips for a Great Post
          </h3>
          <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
            <li>• Use a clear, engaging title that summarizes your post</li>
            <li>• Add relevant tags to help people discover your content</li>
            <li>• Share valuable insights or experiences from your profession</li>
            <li>• Ask questions to encourage engagement from your network</li>
            <li>• Keep it professional but authentic to your voice</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
