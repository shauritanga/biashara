'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import Link from 'next/link'
import { connectToEntity } from '@/app/actions/connections'
import { formatCurrency } from '@/lib/utils'

interface RecommendationCardsProps {
  recommendations: {
    providers: Array<{
      id: number
      name: string
      slug: string
      logo?: string
      services: any
      content: any
    }>
    clubs: Array<{
      id: number
      name: string
      slug: string
      sport: string
      logo?: string
      content: any
    }>
    institutions: Array<{
      id: number
      name: string
      slug: string
      type: string
      logo?: string
      content: any
    }>
    products: Array<{
      id: number
      name: string
      description: string
      price: number
      currency: string
      images: string[]
      seller: {
        id: number
        firstName?: string
        lastName?: string
        avatar?: string
      }
    }>
    users: Array<{
      id: number
      firstName?: string
      lastName?: string
      profession?: string
      skills: string[]
      avatar?: string
    }>
  }
}

export function RecommendationCards({ recommendations }: RecommendationCardsProps) {
  const [activeTab, setActiveTab] = useState('providers')
  const [connecting, setConnecting] = useState<number | null>(null)
  const [connectSuccess, setConnectSuccess] = useState<{id: number, type: string} | null>(null)

  const handleConnect = async (type: 'provider' | 'club' | 'institution', id: number) => {
    setConnecting(id)
    try {
      const result = await connectToEntity(type, id)
      if (result.success) {
        setConnectSuccess({id, type})
        setTimeout(() => setConnectSuccess(null), 3000)
      }
    } catch (error) {
      console.error('Error connecting:', error)
    } finally {
      setConnecting(null)
    }
  }

  return (
    <Tabs defaultValue="providers" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="providers">Providers</TabsTrigger>
        <TabsTrigger value="clubs">Sports Clubs</TabsTrigger>
        <TabsTrigger value="institutions">Institutions</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
      </TabsList>

      {/* Providers Tab */}
      <TabsContent value="providers">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.providers.slice(0, 3).map((provider) => (
            <Card key={provider.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
                    {provider.logo ? (
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="font-bold text-primary-600">
                        {provider.name[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <CardDescription>
                      {provider.content?.description?.substring(0, 60)}...
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Featured Services */}
                {provider.services && provider.services.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Featured Services
                    </h4>
                    <div className="space-y-2">
                      {provider.services.slice(0, 1).map((service: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {service.name}
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                              {service.validity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
                              {formatCurrency(service.price, service.currency || 'TZS')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/providers/${provider.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleConnect('provider', provider.id)}
                    disabled={connecting === provider.id}
                  >
                    {connecting === provider.id ? 'Connecting...' : 
                     connectSuccess?.id === provider.id ? 'Connected!' : 'Connect'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Clubs Tab */}
      <TabsContent value="clubs">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.clubs.slice(0, 3).map((club) => (
            <Card key={club.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
                    {club.logo ? (
                      <img
                        src={club.logo}
                        alt={club.name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="font-bold text-accent-600">
                        {club.name[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{club.name}</CardTitle>
                    <CardDescription>
                      {club.sport}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Club Info */}
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {club.content?.description?.substring(0, 100)}...
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/clubs/${club.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleConnect('club', club.id)}
                    disabled={connecting === club.id}
                  >
                    {connecting === club.id ? 'Connecting...' : 
                     connectSuccess?.id === club.id ? 'Connected!' : 'Join Club'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Institutions Tab */}
      <TabsContent value="institutions">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.institutions.slice(0, 3).map((institution) => (
            <Card key={institution.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
                    {institution.logo ? (
                      <img
                        src={institution.logo}
                        alt={institution.name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <span className="font-bold text-purple-600">
                        {institution.name[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{institution.name}</CardTitle>
                    <CardDescription>
                      {institution.type}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Institution Info */}
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {institution.content?.description?.substring(0, 100)}...
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/institutions/${institution.slug}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleConnect('institution', institution.id)}
                    disabled={connecting === institution.id}
                  >
                    {connecting === institution.id ? 'Connecting...' : 
                     connectSuccess?.id === institution.id ? 'Connected!' : 'Connect'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Products Tab */}
      <TabsContent value="products">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.products.slice(0, 3).map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video bg-neutral-100 dark:bg-neutral-800">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-neutral-400">No image</span>
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>
                  {product.description.substring(0, 60)}...
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Price and Seller */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(product.price, product.currency)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700">
                      {product.seller.avatar ? (
                        <img
                          src={product.seller.avatar}
                          alt={`${product.seller.firstName} ${product.seller.lastName}`}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-xs font-medium text-white">
                          {product.seller.firstName?.[0] || 'S'}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {product.seller.firstName} {product.seller.lastName}
                    </span>
                  </div>
                </div>
                
                {/* Action Button */}
                <Button className="w-full" asChild>
                  <Link href={`/marketplace/products/${product.id}`}>
                    View Product
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
