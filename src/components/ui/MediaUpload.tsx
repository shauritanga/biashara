'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/Button'

interface MediaFile {
  url: string
  publicId?: string
  type: 'image' | 'video'
  fileName: string
  size: number
  width?: number
  height?: number
}

interface MediaUploadProps {
  onUpload: (files: MediaFile[]) => void
  maxFiles?: number
  allowImages?: boolean
  allowVideos?: boolean
  className?: string
}

export function MediaUpload({
  onUpload,
  maxFiles = 5,
  allowImages = true,
  allowVideos = true,
  className = ''
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptedTypes = [
    ...(allowImages ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] : []),
    ...(allowVideos ? ['video/mp4', 'video/webm', 'video/quicktime'] : [])
  ].join(',')

  const handleFiles = useCallback(async (files: FileList) => {
    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (uploadedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`)
      return
    }

    setUploading(true)
    const newFiles: MediaFile[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Create form data
        const formData = new FormData()
        formData.append('file', file)
        
        // Upload file
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        const result = await response.json()
        
        if (result.success) {
          newFiles.push({
            url: result.url,
            publicId: result.publicId,
            type: result.type,
            fileName: result.fileName,
            size: result.size,
            width: result.width,
            height: result.height
          })
        } else {
          alert(`Failed to upload ${file.name}: ${result.error}`)
        }
      }
      
      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      onUpload(updatedFiles)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload files')
    } finally {
      setUploading(false)
    }
  }, [uploadedFiles, maxFiles, onUpload])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeFile = useCallback((index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)
    onUpload(updatedFiles)
  }, [uploadedFiles, onUpload])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-neutral-300 dark:border-neutral-600'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleInputChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="mx-auto h-12 w-12 text-neutral-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {uploading ? 'Uploading...' : 'Drag and drop files here, or click to select'}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {allowImages && allowVideos && 'Images and videos supported'}
              {allowImages && !allowVideos && 'Images only'}
              {!allowImages && allowVideos && 'Videos only'}
              {' • '}
              Max {maxFiles} files
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || uploadedFiles.length >= maxFiles}
          >
            {uploading ? 'Uploading...' : 'Choose Files'}
          </Button>
        </div>
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Uploaded Files ({uploadedFiles.length}/{maxFiles})
          </h4>
          
          <div className="grid gap-3 md:grid-cols-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="relative group border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
              >
                {/* File Preview */}
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800">
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.fileName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      src={file.url}
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                    />
                  )}
                </div>
                
                {/* File Info */}
                <div className="p-2 bg-white dark:bg-neutral-800">
                  <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
                    {file.fileName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
