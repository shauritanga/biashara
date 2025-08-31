'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'
import { createPost } from '@/app/actions/posts'

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
    <>
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
            <div className="space-y-2">
              <Label htmlFor="title">Post Title *</Label>
              <Input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="What's on your mind?"
                maxLength={100}
              />
              <div className="text-sm text-muted-foreground">
                {formData.title.length}/100 characters
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                rows={5}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Share more details about your post..."
                maxLength={500}
                className="resize-none"
              />
              <div className="text-sm text-muted-foreground">
                {formData.description.length}/500 characters
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="technology, business, innovation (separate with commas)"
              />
              <div className="text-sm text-muted-foreground">
                Add relevant tags to help people discover your post
              </div>
              {formData.tags && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
                    tag.trim() && (
                      <Badge key={index}>
                        {tag.trim()}
                      </Badge>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Media Upload */}
            <div className="space-y-2">
              <Label>Images & Videos</Label>
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
              <div className="space-y-2">
                <Label>Preview</Label>
                <Card className="bg-muted/50">
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
               
                className="sm:flex-1"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="sm:flex-1"
                disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="mt-6 bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 Tips for a Great Post
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Use a clear, engaging title that summarizes your post</li>
            <li>• Add relevant tags to help people discover your content</li>
            <li>• Share valuable insights or experiences from your profession</li>
            <li>• Ask questions to encourage engagement from your network</li>
            <li>• Keep it professional but authentic to your voice</li>
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
