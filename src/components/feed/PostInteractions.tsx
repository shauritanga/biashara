'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  toggleLike, 
  toggleBookmark, 
  addShare, 
  addComment,
  getInteractionCounts,
  getUserInteractions,
  getComments,
  type InteractionCounts,
  type UserInteractions
} from '@/app/actions/interactions'
import { formatRelativeTime } from '@/lib/utils'

interface Comment {
  id: number
  content: string | null
  createdAt: Date | string
  user: {
    id: number
    firstName: string
    lastName: string
    avatar: string | null
    profession: string | null
  }
}

interface PostInteractionsProps {
  feedItemId: number
  initialCounts?: InteractionCounts
  initialUserInteractions?: UserInteractions
  className?: string
}

export function PostInteractions({ 
  feedItemId, 
  initialCounts,
  initialUserInteractions,
  className = '' 
}: PostInteractionsProps) {
  const [counts, setCounts] = useState<InteractionCounts>(
    initialCounts || { likes: 0, comments: 0, shares: 0, bookmarks: 0 }
  )
  const [userInteractions, setUserInteractions] = useState<UserInteractions>(
    initialUserInteractions || { hasLiked: false, hasBookmarked: false, hasShared: false }
  )
  const [comments, setComments] = useState<Comment[]>([])
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load initial data if not provided
  useEffect(() => {
    if (!initialCounts || !initialUserInteractions) {
      loadInteractionData()
    }
  }, [feedItemId])

  const loadInteractionData = async () => {
    setIsLoading(true)
    try {
      const [countsResult, userInteractionsResult] = await Promise.all([
        getInteractionCounts(feedItemId),
        getUserInteractions(feedItemId)
      ])
      
      setCounts(countsResult)
      setUserInteractions(userInteractionsResult)
    } catch (error) {
      console.error('Error loading interaction data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadComments = async () => {
    try {
      const result = await getComments(feedItemId)
      if (result.success) {
        setComments(result.data)
      }
    } catch (error) {
      console.error('Error loading comments:', error)
    }
  }

  const handleLike = async () => {
    try {
      const result = await toggleLike(feedItemId)
      if (result.success) {
        setUserInteractions(prev => ({ ...prev, hasLiked: !prev.hasLiked }))
        setCounts(prev => ({ 
          ...prev, 
          likes: prev.likes + (userInteractions.hasLiked ? -1 : 1) 
        }))
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const handleBookmark = async () => {
    try {
      const result = await toggleBookmark(feedItemId)
      if (result.success) {
        setUserInteractions(prev => ({ ...prev, hasBookmarked: !prev.hasBookmarked }))
        setCounts(prev => ({ 
          ...prev, 
          bookmarks: prev.bookmarks + (userInteractions.hasBookmarked ? -1 : 1) 
        }))
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  const handleShare = async () => {
    try {
      // Create a shareable URL - use current page with a hash to the post
      const url = `${window.location.origin}${window.location.pathname}#post-${feedItemId}`

      // Try to use Web Share API if available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this post on Glbiashara',
          url: url
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      }

      // Record share interaction
      const result = await addShare(feedItemId)
      if (result.success) {
        setCounts(prev => ({ ...prev, shares: prev.shares + 1 }))
        setUserInteractions(prev => ({ ...prev, hasShared: true }))
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Fallback: just copy current page URL
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Page link copied to clipboard!')
      } catch (clipboardError) {
        alert('Unable to share post')
      }
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmittingComment) return

    setIsSubmittingComment(true)
    try {
      const result = await addComment(feedItemId, newComment)
      if (result.success) {
        setNewComment('')
        setCounts(prev => ({ ...prev, comments: prev.comments + 1 }))
        // Reload comments to show the new one
        await loadComments()
      } else {
        alert(result.error || 'Failed to add comment')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment')
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleShowComments = async () => {
    if (!showComments) {
      await loadComments()
    }
    setShowComments(!showComments)
  }

  return (
    <div className={`border-t border-neutral-200 dark:border-neutral-700 pt-3 ${className}`}>
      {/* Interaction Buttons */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              userInteractions.hasLiked 
                ? 'text-red-500' 
                : 'text-neutral-600 dark:text-neutral-400 hover:text-red-500'
            }`}
          >
            <svg className="w-5 h-5" fill={userInteractions.hasLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{counts.likes}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={handleShowComments}
            className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{counts.comments}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-green-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>{counts.shares}</span>
          </button>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          disabled={isLoading}
          className={`flex items-center space-x-1 text-sm transition-colors ${
            userInteractions.hasBookmarked 
              ? 'text-yellow-500' 
              : 'text-neutral-600 dark:text-neutral-400 hover:text-yellow-500'
          }`}
        >
          <svg className="w-5 h-5" fill={userInteractions.hasBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-3">
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              maxLength={500}
            />
            <Button
              type="submit"
              size="sm"
              disabled={!newComment.trim() || isSubmittingComment}
            >
              Post
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  {comment.user.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={`${comment.user.firstName} ${comment.user.lastName}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center">
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        {comment.user.firstName[0] || '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {comment.user.firstName} {comment.user.lastName}
                      </span>
                      {comment.user.profession && (
                        <span className="text-xs text-neutral-500">
                          {comment.user.profession}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {comment.content || '[No content]'}
                    </p>
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {formatRelativeTime(comment.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
