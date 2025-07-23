export default function TestImages() {
  const testImageUrl = "https://res.cloudinary.com/dnri6csc2/image/upload/v1753091845/glbiashara/user-3/images/3afdab9f-2355-4ddd-bc26-dea31407bcbd.jpg"
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Direct Image Test</h2>
          <img
            src={testImageUrl}
            alt="Test image"
            className="w-64 h-64 object-cover border"
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Image URL</h2>
          <p className="text-sm break-all">{testImageUrl}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Test with aspect-video container</h2>
          <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-700">
            <img
              src={testImageUrl}
              alt="Test image in container"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
