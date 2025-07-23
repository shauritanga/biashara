'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MediaDisplay } from '@/components/feed/MediaDisplay'
import { formatRelativeTime, formatCurrency } from '@/lib/utils'
import Link from 'next/link'

interface ProfileContentProps {
  posts: Array<{
    id: number
    type: string
    title: string
    description?: string
    mediaUrls: string[]
    tags: string[]
    createdAt: Date
  }>
  products: Array<{
    id: number
    title: string
    description: string
    price: number
    currency: string
    mediaUrls: string[]
    category: string
    tags: string[]
    createdAt: Date
  }>
  portfolios: Array<{
    id: number
    title: string
    description: string
    skills: string[]
    projectUrl?: string
    mediaUrls: string[]
    createdAt: Date
  }>
}

export function ProfileContent({ posts, products, portfolios }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'products' | 'portfolios'>('posts')

  const tabs = [
    { id: 'posts', label: 'Posts', count: posts.length },
    { id: 'products', label: 'Products', count: products.length },
    { id: 'portfolios', label: 'Portfolio', count: portfolios.length }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex space-x-1 border-b border-neutral-200 dark:border-neutral-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} variant="outlined">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        {post.description && (
                          <CardDescription className="mt-1">
                            {post.description}
                          </CardDescription>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500">
                        {formatRelativeTime(post.createdAt)}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {post.mediaUrls.length > 0 && (
                      <div className="mb-4">
                        <MediaDisplay mediaUrls={post.mediaUrls} />
                      </div>
                    )}
                    
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
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">No posts yet</h3>
                <p className="mt-1 text-sm text-neutral-500">Start sharing your thoughts with your network.</p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/create/post">Create your first post</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid gap-6 md:grid-cols-2">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id} variant="outlined">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {product.mediaUrls.length > 0 && (
                      <div className="mb-4">
                        <MediaDisplay mediaUrls={product.mediaUrls} />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                          {formatCurrency(product.price, product.currency)}
                        </p>
                        <p className="text-sm text-neutral-500">{product.category}</p>
                      </div>
                      <span className="text-xs text-neutral-500">
                        {formatRelativeTime(product.createdAt)}
                      </span>
                    </div>
                    
                    {product.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                          >
                            {tag}
                          </span>
                        ))}
                        {product.tags.length > 3 && (
                          <span className="text-xs text-neutral-500">
                            +{product.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">No products yet</h3>
                <p className="mt-1 text-sm text-neutral-500">Start selling your products or services.</p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/create/product">Add your first product</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'portfolios' && (
          <div className="grid gap-6 md:grid-cols-2">
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
                <Card key={portfolio.id} variant="outlined">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{portfolio.title}</CardTitle>
                    <CardDescription>{portfolio.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {portfolio.mediaUrls.length > 0 && (
                      <div className="mb-4">
                        <MediaDisplay mediaUrls={portfolio.mediaUrls} />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      {portfolio.projectUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={portfolio.projectUrl} target="_blank" rel="noopener noreferrer">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Project
                          </a>
                        </Button>
                      )}
                      <span className="text-xs text-neutral-500">
                        {formatRelativeTime(portfolio.createdAt)}
                      </span>
                    </div>
                    
                    {portfolio.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {portfolio.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900/20 dark:text-primary-400"
                          >
                            {skill}
                          </span>
                        ))}
                        {portfolio.skills.length > 4 && (
                          <span className="text-xs text-neutral-500">
                            +{portfolio.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">No portfolio items yet</h3>
                <p className="mt-1 text-sm text-neutral-500">Showcase your work and projects.</p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/create/portfolio">Create portfolio item</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
