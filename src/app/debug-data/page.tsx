import { getFeedItems } from '@/app/actions/feed'

export default async function DebugData() {
  const feedResult = await getFeedItems(1, 5)
  const feedItems = feedResult.success && feedResult.data ? feedResult.data : []

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Feed Data Debug</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Feed Result Status</h2>
          <p>Success: {feedResult.success ? 'true' : 'false'}</p>
          {!feedResult.success && <p>Error: {feedResult.error}</p>}
          <p>Total items: {feedItems.length}</p>
        </div>

        {feedItems.map((item, index) => (
          <div key={item.id} className="border p-4 rounded-lg bg-white dark:bg-neutral-800">
            <h3 className="font-semibold text-lg mb-2">Item #{index + 1}: {item.title}</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Content ID:</strong> {item.contentId}</p>
                <p><strong>User ID:</strong> {item.userId}</p>
                <p><strong>Description:</strong> {item.description?.substring(0, 100)}...</p>
              </div>
              
              <div>
                <p><strong>Media URLs Count:</strong> {item.mediaUrls?.length || 0}</p>
                <p><strong>Tags Count:</strong> {item.tags?.length || 0}</p>
                <p><strong>Is Promoted:</strong> {item.isPromoted ? 'true' : 'false'}</p>
                <p><strong>Is Active:</strong> {item.isActive ? 'true' : 'false'}</p>
                <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {item.mediaUrls && item.mediaUrls.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Media URLs ({item.mediaUrls.length}):</h4>
                <div className="space-y-2">
                  {item.mediaUrls.map((url, urlIndex) => (
                    <div key={urlIndex} className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded">
                      <p className="text-xs font-mono break-all mb-2">{url}</p>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 h-20 bg-neutral-200 dark:bg-neutral-600 rounded overflow-hidden">
                          {url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') ? (
                            <video
                              src={url}
                              className="w-full h-full object-cover"
                              controls
                              preload="metadata"
                            />
                          ) : (
                            <img
                              src={url}
                              alt={`Media ${urlIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="text-xs text-neutral-500">
                          <p>Type: {url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') ? 'Video' : 'Image'}</p>
                          <p>URL Length: {url.length}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.user && (
              <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-medium mb-1">User Info:</h4>
                <p className="text-sm">Name: {item.user.firstName} {item.user.lastName}</p>
                <p className="text-sm">Profession: {item.user.profession || 'Not specified'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
