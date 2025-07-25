import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getAllPostsWithUsers, getAllFeedItemsWithUsers } from '@/app/actions/feed'
import { MediaDisplay } from '@/components/feed/MediaDisplay'
import { PostInteractions } from '@/components/feed/PostInteractions'
import { formatRelativeTime } from '@/lib/utils'
import Link from 'next/link'

export default async function PostsPage() {
  // Fetch all posts with users
  const postsResult = await getAllPostsWithUsers()
  const allFeedResult = await getAllFeedItemsWithUsers(50) // Limit to 50 items for performance

  const posts = postsResult.success ? postsResult.data : []
  const allFeedItems = allFeedResult.success ? allFeedResult.data : []

  // Debug information
  console.log('Posts debug info:', {
    postsCount: posts?.length || 0,
    allFeedItemsCount: allFeedItems?.length || 0,
    postsWithUsers: posts?.filter(p => p.user).length || 0,
    allFeedItemsWithUsers: allFeedItems?.filter(item => item.user).length || 0,
    uniqueUserIds: new Set(allFeedItems?.filter(item => item.user).map(item => item.user!.id) || []),
    samplePost: posts?.[0] ? { id: posts[0].id, type: posts[0].type, hasUser: !!posts[0].user } : null,
    sampleFeedItem: allFeedItems?.[0] ? { id: allFeedItems[0].id, type: allFeedItems[0].type, hasUser: !!allFeedItems[0].user } : null
  })

  return (
    <div className="container-mobile py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100 md:text-3xl">
          All Posts & Feed Items
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Browse all posts and content from the community
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {posts?.length || 0}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Total Posts
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {allFeedItems?.length || 0}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              All Feed Items
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {new Set(allFeedItems?.filter(item => item.user).map(item => item.user!.id) || []).size}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Active Users
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {allFeedResult.success ? allFeedResult.total : 0}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Total Content
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-neutral-900 dark:text-neutral-100">
          User Posts ({posts?.length || 0})
        </h2>

        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} variant="elevated">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      {post.user?.avatar ? (
                        <img
                          src={post.user.avatar}
                          alt={`${post.user.firstName} ${post.user.lastName}`}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                          {post.user?.firstName?.[0] || 'U'}{post.user?.lastName?.[0] || ''}
                        </div>
                      )}
                    </div>

                    {/* User Info & Post Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {post.user ? `${post.user.firstName || ''} ${post.user.lastName || ''}`.trim() : 'Unknown User'}
                        </h3>
                        {post.user?.isVerified && (
                          <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      
                      {post.user?.profession && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {post.user.profession}
                        </p>
                      )}
                      
                      <p className="text-xs text-neutral-500">
                        {formatRelativeTime(post.createdAt)} • {post.user?.country || 'Unknown'}
                      </p>
                    </div>

                    {/* Post Type Badge */}
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {post.type}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Post Content */}
                  <div className="mb-4">
                    <h4 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {post.title}
                    </h4>
                    {post.description && (
                      <p className="text-neutral-700 dark:text-neutral-300">
                        {post.description}
                      </p>
                    )}
                  </div>

                  {/* Media */}
                  {post.mediaUrls.length > 0 && (
                    <div className="mb-4">
                      <MediaDisplay mediaUrls={post.mediaUrls} />
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* User Skills */}
                  {post.user?.skills && post.user.skills.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="text-xs text-neutral-500 mb-2">User Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {post.user.skills.slice(0, 5).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                          >
                            {skill}
                          </span>
                        ))}
                        {post.user.skills.length > 5 && (
                          <span className="text-xs text-neutral-500">
                            +{post.user.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Post Interactions */}
                  <PostInteractions feedItemId={post.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <svg className="h-16 w-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    No posts found
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Be the first to create a post!
                  </p>
                </div>
                <Button asChild>
                  <Link href="/create/post">Create Post</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* All Feed Items Section */}
      <div>
        <h2 className="mb-6 text-xl font-bold text-neutral-900 dark:text-neutral-100">
          All Feed Items ({allFeedItems?.length || 0})
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allFeedItems?.map((item) => (
            <Card key={item.id} variant="outlined" className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    item.type === 'post' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                    item.type === 'product' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    item.type === 'portfolio' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                    'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                {item.description && (
                  <CardDescription className="text-sm line-clamp-2">
                    {item.description}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                {item.user && (
                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <span>By {item.user.firstName} {item.user.lastName}</span>
                    {item.user.profession && (
                      <span>• {item.user.profession}</span>
                    )}
                  </div>
                )}
                
                {item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs text-neutral-500">+{item.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Post Interactions */}
                <PostInteractions feedItemId={item.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
