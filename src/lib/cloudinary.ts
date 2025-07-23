import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// Helper function to upload file to Cloudinary
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  fileName: string,
  resourceType: 'image' | 'video' = 'image',
  folder: string = 'glbiashara'
) {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: resourceType,
        folder: folder,
        public_id: fileName.split('.')[0], // Remove extension
        overwrite: true,
        transformation: resourceType === 'image' ? [
          { quality: 'auto', fetch_format: 'auto' },
          { width: 1200, height: 800, crop: 'limit' }
        ] : [
          { quality: 'auto' },
          { width: 1280, height: 720, crop: 'limit' }
        ]
      }

      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      ).end(fileBuffer)
    })

    return result
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

// Helper function to delete file from Cloudinary
export async function deleteFromCloudinary(publicId: string, resourceType: 'image' | 'video' = 'image') {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    })
    return result
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw error
  }
}

// Helper function to get optimized URL
export function getOptimizedUrl(publicId: string, options: any = {}) {
  return cloudinary.url(publicId, {
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  })
}
