'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { purchaseService } from '@/app/actions/providers'
import { formatCurrency, validatePhone } from '@/lib/utils'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    name: string
    price: number
    currency: string
    description: string
    validity?: string
  }
  provider: {
    id: number
    name: string
    logo?: string
  }
}

export function PurchaseModal({ isOpen, onClose, service, provider }: PurchaseModalProps) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    paymentMethod: 'M-Pesa'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation

  const paymentMethods = [
    { id: 'M-Pesa', name: 'M-Pesa', icon: '💳' },
    { id: 'Airtel Money', name: 'Airtel Money', icon: '💰' },
    { id: 'Tigo Pesa', name: 'Tigo Pesa', icon: '💵' },
    { id: 'Credit Card', name: 'Credit Card', icon: '💳' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePurchase = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      const result = await purchaseService({
        providerId: provider.id,
        serviceName: service.name,
        price: service.price,
        currency: service.currency,
        phoneNumber: formData.phoneNumber,
        paymentMethod: formData.paymentMethod
      })

      if (result.success) {
        setStep(3) // Show confirmation
      } else {
        setErrors({ general: result.error || 'Purchase failed. Please try again.' })
      }
    } catch (error) {
      console.error('Purchase error:', error)
      setErrors({ general: 'Purchase failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setFormData({ phoneNumber: '', paymentMethod: 'M-Pesa' })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {provider.logo ? (
                <img
                  src={provider.logo}
                  alt={`${provider.name} logo`}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-500 text-white font-bold text-sm">
                  {provider.name[0]}
                </div>
              )}
              <div>
                <CardTitle className="text-lg">
                  {step === 1 && 'Purchase Service'}
                  {step === 2 && 'Payment Details'}
                  {step === 3 && 'Purchase Successful'}
                </CardTitle>
                <CardDescription>{provider.name}</CardDescription>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              {/* Service Details */}
              <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {service.name}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(service.price, service.currency)}
                  </span>
                  {service.validity && (
                    <span className="text-sm text-neutral-500">
                      Valid for {service.validity}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Number Input */}
              <Input
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                error={errors.phoneNumber}
                placeholder="+255 123 456 789"
                helperText="Enter the phone number to receive the service"
                leftIcon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />

              {/* Payment Method Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      className={`flex items-center space-x-2 rounded-lg border p-3 text-left transition-colors ${
                        formData.paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span className="text-lg">{method.icon}</span>
                      <span className="text-sm font-medium">{method.name}</span>
                    </button>
                  ))}
                </div>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-500">{errors.paymentMethod}</p>
                )}
              </div>

              {errors.general && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {errors.general}
                </div>
              )}

              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setStep(2)} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Confirm Purchase
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Please review your order details
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Service:</span>
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Phone:</span>
                    <span className="text-sm font-medium">{formData.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Payment:</span>
                    <span className="text-sm font-medium">{formData.paymentMethod}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-2 dark:border-neutral-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-primary-600 dark:text-primary-400">
                        {formatCurrency(service.price, service.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handlePurchase} 
                  className="flex-1"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Purchase Now
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Purchase Successful!
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Your {service.name} has been activated on {formData.phoneNumber}
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <p className="text-sm text-green-700 dark:text-green-400">
                  You will receive a confirmation SMS shortly. The service will be active within 5 minutes.
                </p>
              </div>

              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
