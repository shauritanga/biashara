'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { logoutUser } from '@/app/actions/auth'

interface HeaderProps {
  user?: {
    id: number
    email?: string
    firstName?: string
    lastName?: string
    avatar?: string
  } | null
}

export function Header({ user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const navigation = [
    { name: 'Feed', href: '/' },
    { name: 'Network', href: '/network' },
    { name: 'Providers', href: '/providers' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Jobs', href: '/jobs' },
  ]

  // Handle click outside to close user menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isUserMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="container-mobile">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white font-bold">
              G
            </div>
            <span className="hidden font-display text-xl font-bold text-neutral-900 dark:text-neutral-100 sm:block">
              Glbiashara
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button size="sm" className="hidden sm:flex" asChild>
                  <Link href="/create/post">Create Post</Link>
                </Button>
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:ring-2 hover:ring-primary-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-haspopup="menu"
                    aria-expanded={isUserMenuOpen}
                    aria-label="Account menu"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Your avatar"
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-sm font-bold text-white shadow-md ring-2 ring-white dark:ring-neutral-800">
                        {(user.firstName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                      </div>
                    )}
                  </button>

                  {/* Account dropdown menu */}
                  {isUserMenuOpen && (
                    <div className="animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 absolute right-0 z-50 mt-3 w-72 origin-top-right rounded-xl border border-neutral-200 bg-white py-1 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                      {/* User info section */}
                      <div className="px-4 py-3">
                        <div className="flex items-start space-x-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt="Your avatar"
                              className="h-12 w-12 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-lg font-bold text-white shadow-lg ring-2 ring-white dark:ring-neutral-800">
                              {(user.firstName?.[0] || user.email?.[0] || 'U').toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                              {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.firstName || 'User'
                              }
                            </div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate" title={user.email}>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-neutral-100 dark:border-neutral-800"></div>

                      {/* Menu items */}
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="mr-3 h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Your profile
                        </Link>
                        <Link
                          href="/profile/edit"
                          className="flex items-center px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="mr-3 h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </Link>
                      </div>

                      <div className="border-t border-neutral-100 dark:border-neutral-800"></div>

                      {/* Sign out section */}
                      <div className="py-1">
                        <form action={logoutUser}>
                          <button
                            type="submit"
                            className="flex w-full items-center px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                          >
                            <svg className="mr-3 h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button size="sm" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 md:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-neutral-200 py-4 dark:border-neutral-800 md:hidden" id="mobile-nav">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <>
                  <Button size="sm" className="mt-2 w-full" asChild>
                    <Link href="/create/post">Create Post</Link>
                  </Button>
                  <form action={logoutUser} className="w-full">
                    <Button size="sm" type="submit" className="mt-2 w-full">
                      Logout
                    </Button>
                  </form>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
