'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LegacyInput } from '@/components/ui/LegacyInput'
import { validateEmail, validatePhone } from '@/lib/utils'

const countries = [
  { code: 'TZ', name: 'Tanzania' },
  { code: 'KE', name: 'Kenya' },
  { code: 'UG', name: 'Uganda' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
]

const professions = [
  'Software Engineer',
  'Teacher',
  'Doctor',
  'Nurse',
  'Farmer',
  'Business Owner',
  'Student',
  'Artist',
  'Driver',
  'Other'
]

const businessTypes = [
  'Retail',
  'Services',
  'Manufacturing',
  'Agriculture',
  'Technology',
  'Healthcare',
  'Education',
  'Transportation',
  'Construction',
  'Food & Beverages',
  'Fashion & Beauty',
  'Finance',
  'Real Estate',
  'Entertainment',
  'Other'
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: 'TZ',
    profession: '',
    businessType: '',
    clubIds: [] as number[],
    skills: [] as string[],
    agreeToTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [clubs, setClubs] = useState<Array<Record<string, unknown>>>([])
  const [loadingClubs, setLoadingClubs] = useState(false)

  // Fetch clubs on component mount
  useEffect(() => {
    const fetchClubs = async () => {
      setLoadingClubs(true)
      try {
        const response = await fetch('/api/clubs')
        const data = await response.json()
        if (data.success) {
          setClubs(data.data)
        }
      } catch (error) {
        console.error('Error fetching clubs:', error)
      } finally {
        setLoadingClubs(false)
      }
    }

    fetchClubs()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleClubSelection = (clubId: number) => {
    setFormData(prev => ({
      ...prev,
      clubIds: prev.clubIds.includes(clubId)
        ? prev.clubIds.filter(id => id !== clubId)
        : [...prev.clubIds, clubId]
    }))
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.country) {
      newErrors.country = 'Please select your country'
    }

    if (!formData.profession) {
      newErrors.profession = 'Please select your profession'
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Please select your business type'
    }

    if (formData.clubIds.length === 0) {
      newErrors.clubIds = 'Please select at least one club you are interested in'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep2()) return

    setIsLoading(true)

    try {
      const result = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await result.json()

      if (data.success) {
        router.push('/')
        router.refresh()
      } else {
        setErrors({ general: data.error || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="container-mobile flex min-h-screen items-center justify-center py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription className="text-base">
              Join Glbiashara to connect and grow your business
            </CardDescription>

            {/* Progress indicator */}
            <div className="mt-6 flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${step >= 1 ? 'bg-accent-500' : 'bg-neutral-300'} transition-colors`} />
                <span className={`text-xs font-medium ${step >= 1 ? 'text-accent-600' : 'text-neutral-500'}`}>Basic Info</span>
              </div>
              <div className={`h-0.5 w-8 ${step >= 2 ? 'bg-accent-500' : 'bg-neutral-300'} transition-colors`} />
              <div className="flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${step >= 2 ? 'bg-accent-500' : 'bg-neutral-300'} transition-colors`} />
                <span className={`text-xs font-medium ${step >= 2 ? 'text-accent-600' : 'text-neutral-500'}`}>Profile</span>
              </div>
            </div>
          </CardHeader>
        
        <CardContent>
          {errors.general && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              <div className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.general}</span>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <LegacyInput
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <LegacyInput
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <LegacyInput
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              
              <LegacyInput
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="+255 123 456 789"
                helperText="Required for network connections and notifications"
                leftIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
              
              <LegacyInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Create a strong password"
                leftIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
              
              <LegacyInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                leftIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
              
              <Button onClick={handleNext} className="w-full">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Profession
                </label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                >
                  <option value="">Select your profession</option>
                  {professions.map(profession => (
                    <option key={profession} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
                {errors.profession && (
                  <p className="mt-1 text-sm text-red-500">{errors.profession}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Business Type
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                >
                  <option value="">Select your business type</option>
                  {businessTypes.map(businessType => (
                    <option key={businessType} value={businessType}>
                      {businessType}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Clubs You&apos;re Interested In
                </label>
                <p className="mb-3 text-xs text-neutral-500">
                  Select the clubs you support or are interested in
                </p>
                {loadingClubs ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="text-sm text-neutral-500">Loading clubs...</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg p-3">
                    {clubs.map(club => (
                      <label key={String(club.id)} className="flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.clubIds.includes(club.id as number)}
                          onChange={() => handleClubSelection(club.id as number)}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <div className="flex items-center space-x-2">
                          {(club.logo as string) && (
                            <img src={club.logo as string} alt={club.name as string} className="w-6 h-6 rounded" />
                          )}
                          <span className="text-sm">{club.name as string}</span>
                          <span className="text-xs text-neutral-500">({club.sport as string})</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
                {errors.clubIds && (
                  <p className="mt-1 text-sm text-red-500">{errors.clubIds}</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                 
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}
