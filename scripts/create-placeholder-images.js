const fs = require('fs')
const path = require('path')

// Create a simple SVG placeholder image
function createPlaceholderSVG(width, height, text, bgColor = '#e5e7eb', textColor = '#6b7280') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`
}

// Create placeholder images for different categories
const placeholders = [
  // Portfolio images
  { path: 'public/portfolio/ecommerce-1.jpg', text: 'E-commerce Demo', width: 800, height: 600 },
  { path: 'public/portfolio/ecommerce-2.jpg', text: 'E-commerce UI', width: 800, height: 600 },
  
  // Product images
  { path: 'public/products/web-dev-1.jpg', text: 'Web Development', width: 600, height: 400 },
  { path: 'public/products/web-dev-2.jpg', text: 'Web Services', width: 600, height: 400 },
  { path: 'public/products/medical-consultation.jpg', text: 'Medical Services', width: 600, height: 400 },
  { path: 'public/products/phone-repair.jpg', text: 'Phone Repair', width: 600, height: 400 },
  
  // Innovation images
  { path: 'public/innovations/water-system-1.jpg', text: 'Smart Water System', width: 800, height: 600 },
  { path: 'public/innovations/water-system-2.jpg', text: 'IoT Monitoring', width: 800, height: 600 },
  
  // Feed images
  { path: 'public/feed/vodacom-data-offer.jpg', text: 'Vodacom Data Offer', width: 600, height: 400, bgColor: '#dc2626', textColor: '#ffffff' },
  { path: 'public/feed/simba-yanga-derby.jpg', text: 'Simba vs Yanga', width: 600, height: 400, bgColor: '#16a34a', textColor: '#ffffff' },
  
  // Provider banners
  { path: 'public/providers/vodacom-banner-1.jpg', text: 'M-Pesa Services', width: 1200, height: 400, bgColor: '#dc2626', textColor: '#ffffff' },
  { path: 'public/providers/vodacom-banner-2.jpg', text: 'Unlimited Data', width: 1200, height: 400, bgColor: '#dc2626', textColor: '#ffffff' },
  { path: 'public/providers/airtel-banner-1.jpg', text: 'Affordable Data', width: 1200, height: 400, bgColor: '#ea580c', textColor: '#ffffff' },
  { path: 'public/providers/airtel-banner-2.jpg', text: 'International Roaming', width: 1200, height: 400, bgColor: '#ea580c', textColor: '#ffffff' }
]

// Create the placeholder images
placeholders.forEach(({ path: filePath, text, width, height, bgColor, textColor }) => {
  const dir = path.dirname(filePath)
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  // Create SVG content
  const svgContent = createPlaceholderSVG(width, height, text, bgColor, textColor)
  
  // Write SVG file (we'll use .svg extension instead of .jpg for simplicity)
  const svgPath = filePath.replace(/\.(jpg|jpeg|png)$/, '.svg')
  fs.writeFileSync(svgPath, svgContent)
  
  console.log(`Created placeholder: ${svgPath}`)
})

console.log('\n✅ All placeholder images created successfully!')
console.log('\nNote: These are SVG placeholders. For production, replace with actual images.')
console.log('You can also use services like Unsplash or Picsum for better placeholder images.')
