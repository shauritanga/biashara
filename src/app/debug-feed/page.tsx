import { prisma } from '@/lib/prisma'

export default async function DebugFeedPage() {
  // Get the latest feed items with media
  const feedItems = await prisma.feedItem.findMany({
    where: {
      isActive: true,
      mediaUrls: {
        isEmpty: false
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
          profession: true
        }
      }
    }
  })

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Debug Feed Items with Media</h1>
        
        <div className="space-y-6">
          {feedItems.length === 0 ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              No feed items with media found in database.
            </div>
          ) : (
            feedItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">{item.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Media URLs ({item.mediaUrls.length}):</h3>
                  <div className="space-y-2">
                    {item.mediaUrls.map((url, index) => (
                      <div key={index} className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded">
                        <p className="text-sm font-mono break-all">{url}</p>
                        <div className="mt-2">
                          {url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') ? (
                            <video
                              src={url}
                              className="h-32 w-32 object-cover rounded"
                              controls
                              preload="metadata"
                            />
                          ) : (
                            <img
                              src={url}
                              alt={`Media ${index + 1}`}
                              className="h-32 w-32 object-cover rounded"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-neutral-500">
                  <p>Type: {item.type}</p>
                  <p>Content ID: {item.contentId}</p>
                  <p>User: {item.user?.firstName} {item.user?.lastName}</p>
                  <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-8 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>Total feed items with media: {feedItems.length}</p>
          <p>If images show "Failed to load", there's an issue with the Cloudinary URLs.</p>
          <p>If no items are found, check if posts are being created with mediaUrls.</p>
        </div>
      </div>
    </div>
  )
}
