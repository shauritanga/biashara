'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'
import { createProduct } from '@/app/actions/posts'
import { useRouter } from 'next/navigation'
import { formatCurrency } from '@/lib/utils'

interface MediaFile {
  url: string
  publicId?: string
  type: 'image' | 'video'
  fileName: string
  size: number
  width?: number
  height?: number
}

export function CreateProductForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'TZS',
    category: '',
    location: 'Dar es Salaam, TZ',
    tags: '',
    mediaUrls: [] as string[]
  })
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])

  const categories = [
    'Electronics',
    'Fashion',
    'Food & Beverages',
    'Healthcare',
    'Education',
    'Services',
    'Agriculture',
    'Construction',
    'Transportation',
    'Other'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const result = await createProduct({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        currency: formData.currency,
        category: formData.category,
        location: formData.location,
        tags: tagsArray,
        mediaUrls: mediaFiles.map(file => file.url)
      })

      if (result.success) {
        router.push('/marketplace')
        router.refresh()
      } else {
        alert(result.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
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
          <CardTitle>List Your Product or Service</CardTitle>
          <CardDescription>
            Reach customers through your provider, club, and professional networks
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Product/Service Name *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                placeholder="e.g., Smartphone Repair Services, Fresh Vegetables"
                maxLength={100}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                >
                  <option value="TZS">TZS (Tanzanian Shilling)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
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
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                placeholder="Describe your product or service in detail..."
                maxLength={500}
              />
              <div className="mt-1 text-xs text-neutral-500">
                {formData.description.length}/500 characters
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                placeholder="e.g., Dar es Salaam, TZ"
              />
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
                className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-100"
                placeholder="repair, smartphone, warranty (separate with commas)"
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Product Images & Videos
              </label>
              <CloudinaryUpload
                onUpload={handleMediaUpload}
                maxFiles={8}
                allowImages={true}
                allowVideos={true}
                folder="glbiashara/products"
              />
              <div className="mt-1 text-xs text-neutral-500">
                Add high-quality images and videos to showcase your product
              </div>
            </div>

            {/* Preview */}
            {(formData.title || formData.description || mediaFiles.length > 0) && (
              <div>
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Preview
                </h3>
                <Card className="bg-neutral-50 dark:bg-neutral-800">
                  {/* Media Preview */}
                  {mediaFiles.length > 0 && (
                    <div className="aspect-video bg-neutral-100 dark:bg-neutral-700">
                      {mediaFiles[0].type === 'image' ? (
                        <img
                          src={mediaFiles[0].url}
                          alt="Product preview"
                          className="h-full w-full object-cover rounded-t-lg"
                        />
                      ) : (
                        <video
                          src={mediaFiles[0].url}
                          className="h-full w-full object-cover rounded-t-lg"
                          controls
                        />
                      )}
                      {mediaFiles.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          +{mediaFiles.length - 1} more
                        </div>
                      )}
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{formData.title || 'Your product name'}</CardTitle>
                        <CardDescription>
                          {formData.description || 'Your product description'}
                        </CardDescription>
                        {formData.category && (
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                              {formData.category}
                            </span>
                          </div>
                        )}
                      </div>
                      {formData.price && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(parseFloat(formData.price) || 0, formData.currency)}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <Button
                type="button"
               
                className="flex-1"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting || !formData.title.trim() || !formData.description.trim() || !formData.price || !formData.category}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Network Visibility Info */}
      <Card className="mt-6 bg-green-50 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
            🌐 Your Product Will Appear On
          </h3>
          <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
            <li>• Your telecom provider's page (Vodacom/Airtel users)</li>
            <li>• Your sports club's community section</li>
            <li>• Your institution's marketplace</li>
            <li>• Professional networks with similar interests</li>
            <li>• Main marketplace for all users</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
