'use client'

import { useState } from 'react'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MediaFile {
  url: string
  publicId?: string
  type: 'image' | 'video'
  fileName: string
  size: number
  width?: number
  height?: number
}

export default function TestUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([])

  const handleUpload = (files: MediaFile[]) => {
    setUploadedFiles(files)
    console.log('Uploaded files:', files)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test Media Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <CloudinaryUpload
              onUpload={handleUpload}
              maxFiles={5}
              allowImages={true}
              allowVideos={true}
              folder="test"
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Upload Results:</h3>
                <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-auto">
                  {JSON.stringify(uploadedFiles, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
