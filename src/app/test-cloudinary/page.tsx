'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function TestCloudinaryPage() {
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testUpload = async () => {
    setUploading(true)
    setError(null)
    setResult(null)

    try {
      // Create a simple test image (1x1 pixel PNG)
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(0, 0, 100, 100)
      }

      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!)
        }, 'image/png')
      })

      // Create form data
      const formData = new FormData()
      formData.append('file', blob, 'test-image.png')
      formData.append('folder', 'test')

      // Upload to our API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const uploadResult = await response.json()
      
      if (uploadResult.success) {
        setResult(uploadResult)
      } else {
        setError(uploadResult.error || 'Upload failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test Cloudinary Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testUpload} 
              disabled={uploading}
              className="w-full"
            >
              {uploading ? 'Testing Upload...' : 'Test Upload to Cloudinary'}
            </Button>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <h3 className="font-semibold">Error:</h3>
                <p>{error}</p>
              </div>
            )}

            {result && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <h3 className="font-semibold mb-2">Upload Successful!</h3>
                <div className="space-y-2">
                  <p><strong>URL:</strong> <a href={result.url} target="_blank" className="underline">{result.url}</a></p>
                  <p><strong>Public ID:</strong> {result.publicId}</p>
                  <p><strong>Type:</strong> {result.type}</p>
                  <p><strong>Size:</strong> {result.size} bytes</p>
                  {result.width && <p><strong>Dimensions:</strong> {result.width}x{result.height}</p>}
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Preview:</h4>
                  <img 
                    src={result.url} 
                    alt="Uploaded test image" 
                    className="w-32 h-32 object-cover border rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.border = '2px solid red'
                      target.alt = 'Failed to load from Cloudinary'
                    }}
                  />
                </div>
              </div>
            )}

            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              <h3 className="font-semibold mb-2">Environment Check:</h3>
              <p>This test creates a simple red square image and uploads it to Cloudinary.</p>
              <p>If successful, it means your Cloudinary credentials are working.</p>
              <p>If it fails, check your .env file and Cloudinary settings.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
