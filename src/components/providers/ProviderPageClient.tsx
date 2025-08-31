'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PurchaseModal } from './PurchaseModal'
import { formatCurrency } from '@/lib/utils'

interface Service {
  name: string
  price: number
  currency: string
  description: string
  validity?: string
}

interface Provider {
  id: number
  name: string
  logo?: string
  services: Service[]
}

interface ProviderPageClientProps {
  provider: Provider
}

export function ProviderPageClient({ provider }: ProviderPageClientProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)

  const handlePurchaseClick = (service: Service) => {
    setSelectedService(service)
    setIsPurchaseModalOpen(true)
  }

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
    setSelectedService(null)
  }

  return (
    <>
      {/* Services Grid */}
      {provider.services && provider.services.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {provider.services.map((service, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold">{service.name}</CardTitle>
                    <CardDescription className="mt-1">{service.description}</CardDescription>
                  </div>
                  {(service as any).popular && (
                    <div className="rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-900/20 dark:text-accent-400">
                      Popular
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                {/* Pricing */}
                <div className="text-center py-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(service.price, service.currency || 'TZS')}
                  </p>
                  {service.validity && (
                    <p className="text-sm text-neutral-500 mt-1">
                      Valid for {service.validity}
                    </p>
                  )}
                </div>

                {/* Features */}
                {(service as any).features && (service as any).features.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {(service as any).features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  className="w-full py-3 font-semibold"
                  onClick={() => handlePurchaseClick(service)}
                >
                  Purchase Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <svg className="h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  No services available
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Check back later for new service offerings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase Modal */}
      {selectedService && (
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={handleClosePurchaseModal}
          service={selectedService}
          provider={{
            id: provider.id,
            name: provider.name,
            logo: provider.logo
          }}
        />
      )}
    </>
  )
}
