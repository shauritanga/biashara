'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'

interface MediaFile {
  url: string
  publicId?: string
  type: 'image' | 'video'
  fileName: string
  size: number
  width?: number
  height?: number
}

interface UploadProgress {
  fileName: string
  progress: number
  status: 'uploading' | 'success' | 'error'
  error?: string
}

interface CloudinaryUploadProps {
  onUpload: (files: MediaFile[]) => void
  maxFiles?: number
  allowImages?: boolean
  allowVideos?: boolean
  className?: string
  folder?: string
}

export function CloudinaryUpload({
  onUpload,
  maxFiles = 5,
  allowImages = true,
  allowVideos = true,
  className = '',
  folder = 'general'
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([])
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptedTypes = [
    ...(allowImages ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] : []),
    ...(allowVideos ? ['video/mp4', 'video/webm', 'video/quicktime'] : [])
  ].join(',')

  const validateFile = (file: File): string | null => {
    // Check file type
    const isImage = allowImages && ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)
    const isVideo = allowVideos && ['video/mp4', 'video/webm', 'video/quicktime'].includes(file.type)
    
    if (!isImage && !isVideo) {
      return 'File type not supported'
    }

    // Check file size
    const maxImageSize = 10 * 1024 * 1024 // 10MB
    const maxVideoSize = 100 * 1024 * 1024 // 100MB
    
    if (isImage && file.size > maxImageSize) {
      return 'Image size must be less than 10MB'
    }
    
    if (isVideo && file.size > maxVideoSize) {
      return 'Video size must be less than 100MB'
    }

    return null
  }

  const uploadFile = async (file: File): Promise<MediaFile | null> => {
    const validation = validateFile(file)
    if (validation) {
      throw new Error(validation)
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      if (response.status === 413) {
        throw new Error('File too large for upload. Please use a smaller file (max 100MB for videos).')
      }
      if (response.status === 504) {
        throw new Error('Upload timeout. Please try with a smaller file.')
      }
      // Try to get error message from response
      const text = await response.text()
      if (text.includes('Request Entity Too Large')) {
        throw new Error('File too large for upload. Please use a smaller file.')
      }
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'Upload failed')
    }

    return {
      url: result.url,
      publicId: result.publicId,
      type: result.type,
      fileName: result.fileName,
      size: result.size,
      width: result.width,
      height: result.height
    }
  }

  const handleFiles = useCallback(async (files: FileList) => {
    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (uploadedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`)
      return
    }

    setUploading(true)
    const newFiles: MediaFile[] = []
    const progressArray: UploadProgress[] = []

    // Initialize progress tracking
    for (let i = 0; i < files.length; i++) {
      progressArray.push({
        fileName: files[i].name,
        progress: 0,
        status: 'uploading'
      })
    }
    setUploadProgress(progressArray)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        try {
          // Update progress
          setUploadProgress(prev => prev.map((p, index) => 
            index === i ? { ...p, progress: 50 } : p
          ))

          const uploadedFile = await uploadFile(file)
          
          if (uploadedFile) {
            newFiles.push(uploadedFile)
            
            // Update progress to success
            setUploadProgress(prev => prev.map((p, index) => 
              index === i ? { ...p, progress: 100, status: 'success' } : p
            ))
          }
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error)
          
          // Update progress to error
          setUploadProgress(prev => prev.map((p, index) => 
            index === i ? { 
              ...p, 
              progress: 0, 
              status: 'error', 
              error: error instanceof Error ? error.message : 'Upload failed'
            } : p
          ))
        }
      }
      
      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      onUpload(updatedFiles)
    } finally {
      setUploading(false)
      // Clear progress after a delay
      setTimeout(() => setUploadProgress([]), 3000)
    }
  }, [uploadedFiles, maxFiles, onUpload, folder])

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
              {uploading ? 'Uploading to Cloudinary...' : 'Drag and drop files here, or click to select'}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {allowImages && allowVideos && 'Images (10MB) and videos (100MB) supported'}
              {allowImages && !allowVideos && 'Images up to 10MB'}
              {!allowImages && allowVideos && 'Videos up to 100MB'}
              {' • '}
              Max {maxFiles} files
            </p>
          </div>
          
          <Button
            type="button"
           
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || uploadedFiles.length >= maxFiles}
          >
            {uploading ? 'Uploading...' : 'Choose Files'}
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Upload Progress
          </h4>
          {uploadProgress.map((progress, index) => (
            <div key={index} className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">
                  {progress.fileName}
                </span>
                <span className="text-xs text-neutral-500">
                  {progress.status === 'success' && '✅'}
                  {progress.status === 'error' && '❌'}
                  {progress.status === 'uploading' && '⏳'}
                </span>
              </div>
              
              {progress.status === 'uploading' && (
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>
              )}
              
              {progress.status === 'error' && progress.error && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {progress.error}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

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
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500">
                      {formatFileSize(file.size)}
                    </p>
                    {file.width && file.height && (
                      <p className="text-xs text-neutral-500">
                        {file.width}×{file.height}
                      </p>
                    )}
                  </div>
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
