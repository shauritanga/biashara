'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ProfilePictureUploadProps {
  currentAvatar?: string
  onAvatarChange: (avatarUrl: string) => void
  userName?: string
}

export function ProfilePictureUpload({ 
  currentAvatar, 
  onAvatarChange, 
  userName = 'User' 
}: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be less than 5MB')
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      // Use the existing upload API route
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onAvatarChange(data.url)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveAvatar = () => {
    onAvatarChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Profile Picture
        </h3>
        
        {/* Current Avatar Display */}
        <div className="relative">
          <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
            {currentAvatar ? (
              <img
                src={currentAvatar}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500 text-2xl font-bold text-white">
                {getInitials(userName)}
              </div>
            )}
          </div>
          
          {/* Upload overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Change Picture'}
            </Button>
            
            {currentAvatar && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveAvatar}
                disabled={isUploading}
              >
                Remove
              </Button>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            JPG, PNG or GIF. Max size 5MB.
          </p>
        </div>

        {/* Error Message */}
        {uploadError && (
          <p className="text-sm text-destructive text-center">
            {uploadError}
          </p>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </Card>
  )
}
