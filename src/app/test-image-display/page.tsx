'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TestImageDisplayPage() {
  const [testUrl, setTestUrl] = useState('')
  const [imageStatus, setImageStatus] = useState<'loading' | 'success' | 'error' | null>(null)

  // Test with a known Cloudinary URL format
  const testCloudinaryUrl = 'https://res.cloudinary.com/dnri6csc2/image/upload/v1/glbiashara/test/sample.jpg'

  const testImageLoad = (url: string) => {
    setImageStatus('loading')
    const img = new Image()
    
    img.onload = () => {
      setImageStatus('success')
    }
    
    img.onerror = () => {
      setImageStatus('error')
    }
    
    img.src = url
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Image Display</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Test Image URL:
              </label>
              <input
                type="url"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="Enter Cloudinary URL to test"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>
            
            <Button 
              onClick={() => testImageLoad(testUrl)}
              disabled={!testUrl}
              className="w-full"
            >
              Test Image Load
            </Button>

            <Button 
              onClick={() => testImageLoad(testCloudinaryUrl)}
             
              className="w-full"
            >
              Test Sample Cloudinary URL
            </Button>

            {imageStatus && (
              <div className={`p-4 rounded ${
                imageStatus === 'loading' ? 'bg-blue-100 text-blue-700' :
                imageStatus === 'success' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {imageStatus === 'loading' && 'Loading image...'}
                {imageStatus === 'success' && 'Image loaded successfully!'}
                {imageStatus === 'error' && 'Failed to load image. Check URL and CORS settings.'}
              </div>
            )}

            {testUrl && (
              <div className="space-y-4">
                <h3 className="font-semibold">Image Preview:</h3>
                <div className="border rounded-lg p-4">
                  <img
                    src={testUrl}
                    alt="Test image"
                    className="max-w-full h-auto rounded"
                    onLoad={() => console.log('Image loaded:', testUrl)}
                    onError={(e) => {
                      console.error('Image failed to load:', testUrl)
                      const target = e.target as HTMLImageElement
                      target.style.border = '2px solid red'
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cloudinary Configuration Check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Cloud Name:</strong> dnri6csc2</p>
              <p><strong>Expected URL Format:</strong></p>
              <code className="block bg-neutral-100 p-2 rounded text-xs">
                https://res.cloudinary.com/dnri6csc2/image/upload/v1/glbiashara/folder/filename.jpg
              </code>
              
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <h4 className="font-semibold mb-2">Troubleshooting Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Check if Cloudinary credentials are correct in .env</li>
                  <li>Verify upload API is working (/test-cloudinary)</li>
                  <li>Check browser console for CORS errors</li>
                  <li>Verify image URLs in database (/debug-feed)</li>
                  <li>Test direct image access in new tab</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
