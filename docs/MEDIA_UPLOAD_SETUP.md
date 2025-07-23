# 📸 Media Upload Implementation Guide

## 🚀 Complete Cloudinary Integration

This guide covers the fully implemented media upload functionality using Cloudinary for the GLBiashara platform.

## ✅ What's Implemented

### 1. **Cloudinary Integration**
- Professional cloud-based media storage
- Automatic image optimization and compression
- Video processing and streaming
- CDN delivery for fast loading
- Secure upload with authentication

### 2. **Upload API (`/api/upload`)**
- Server-side file validation
- Cloudinary upload integration
- Progress tracking support
- Error handling and validation
- File type and size restrictions

### 3. **CloudinaryUpload Component**
- Drag & drop file upload
- Progress tracking with visual feedback
- File preview with thumbnails
- Multiple file support
- Real-time validation
- Error handling with user feedback

### 4. **Form Integration**
- Post creation with media
- Product listing with images/videos
- Portfolio uploads
- Job posting attachments

## 🔧 Setup Instructions

### 1. **Cloudinary Account Setup**

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Create a free account (generous free tier)
3. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

### 2. **Environment Variables**

Update your `.env` file with Cloudinary credentials:

```env
# Cloudinary (for media storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. **Dependencies**

Already installed:
```bash
npm install cloudinary next-cloudinary uuid @types/uuid
```

## 📁 File Structure

```
src/
├── app/api/upload/route.ts          # Upload API endpoint
├── lib/cloudinary.ts                # Cloudinary configuration
├── components/ui/
│   ├── CloudinaryUpload.tsx         # Main upload component
│   └── MediaUpload.tsx              # Legacy component (kept for reference)
└── components/create/
    ├── CreatePostForm.tsx           # Post creation with media
    └── CreateProductForm.tsx        # Product creation with media
```

## 🎯 Features

### **File Support**
- **Images**: JPEG, PNG, WebP, GIF (up to 10MB)
- **Videos**: MP4, WebM, QuickTime (up to 100MB)
- **Automatic optimization**: Quality and format optimization
- **Responsive images**: Multiple sizes generated automatically

### **Upload Features**
- **Drag & Drop**: Intuitive file selection
- **Progress Tracking**: Real-time upload progress
- **Batch Upload**: Multiple files simultaneously
- **Preview**: Immediate preview of uploaded media
- **Validation**: Client and server-side validation
- **Error Handling**: User-friendly error messages

### **Security**
- **Authentication**: Only logged-in users can upload
- **File Validation**: Type and size restrictions
- **Secure URLs**: Cloudinary secure URLs
- **Folder Organization**: User-specific folders

## 🔄 Usage Examples

### **Basic Upload Component**
```tsx
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

function MyForm() {
  const [mediaFiles, setMediaFiles] = useState([])

  return (
    <CloudinaryUpload
      onUpload={setMediaFiles}
      maxFiles={5}
      allowImages={true}
      allowVideos={true}
      folder="my-folder"
    />
  )
}
```

### **Post Creation**
```tsx
// In CreatePostForm.tsx
<CloudinaryUpload
  onUpload={handleMediaUpload}
  maxFiles={5}
  allowImages={true}
  allowVideos={true}
  folder="glbiashara/posts"
/>
```

### **Product Listing**
```tsx
// In CreateProductForm.tsx
<CloudinaryUpload
  onUpload={handleMediaUpload}
  maxFiles={8}
  allowImages={true}
  allowVideos={true}
  folder="glbiashara/products"
/>
```

## 📊 File Organization

Cloudinary folders are organized as:
```
glbiashara/
├── user-{userId}/
│   ├── images/
│   └── videos/
├── posts/
├── products/
├── portfolios/
└── general/
```

## 🎨 Transformations

Automatic transformations applied:
- **Images**: Quality auto, format auto, max 1200x800
- **Videos**: Quality auto, max 1280x720
- **Responsive**: Multiple sizes for different devices

## 🔍 API Response

Upload API returns:
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "glbiashara/user-123/images/uuid",
  "type": "image",
  "fileName": "original-name.jpg",
  "size": 1024000,
  "width": 1200,
  "height": 800
}
```

## 🚨 Error Handling

Common errors and solutions:

### **"File type not allowed"**
- Check file extension
- Ensure MIME type is supported

### **"File size exceeds limit"**
- Images: Max 10MB
- Videos: Max 100MB

### **"Upload failed"**
- Check Cloudinary credentials
- Verify network connection
- Check file corruption

### **"Authentication required"**
- User must be logged in
- Check JWT token validity

## 🎯 Testing

### **Test Upload Functionality**

1. **Navigate to Create Post**: `/create/post`
2. **Test drag & drop**: Drag images/videos to upload area
3. **Test file selection**: Click "Choose Files" button
4. **Test validation**: Try uploading invalid files
5. **Test progress**: Watch upload progress bars
6. **Test preview**: Verify media previews correctly

### **Test Different File Types**

- ✅ JPEG images
- ✅ PNG images  
- ✅ WebP images
- ✅ GIF images
- ✅ MP4 videos
- ✅ WebM videos
- ❌ Unsupported formats (should show error)

## 🔧 Troubleshooting

### **Uploads Not Working**

1. Check environment variables
2. Verify Cloudinary credentials
3. Check network connectivity
4. Review browser console for errors

### **Images Not Displaying**

1. Verify Cloudinary URLs
2. Check CORS settings
3. Ensure public access to uploaded files

### **Slow Uploads**

1. Check file sizes
2. Verify internet connection
3. Consider image compression

## 🚀 Production Deployment

### **Environment Setup**
1. Set production Cloudinary credentials
2. Configure upload presets
3. Set up monitoring and alerts

### **Performance Optimization**
1. Enable auto-optimization
2. Use responsive images
3. Implement lazy loading
4. Cache Cloudinary URLs

## 📈 Monitoring

Track upload metrics:
- Upload success rate
- File sizes and types
- User upload patterns
- Error frequencies

## 🎉 Conclusion

The media upload functionality is now fully implemented with:
- ✅ Professional Cloudinary integration
- ✅ Comprehensive error handling
- ✅ Progress tracking and user feedback
- ✅ Security and validation
- ✅ Mobile-responsive design
- ✅ Production-ready architecture

Users can now upload images and videos seamlessly across the platform!
