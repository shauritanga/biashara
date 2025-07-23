import { CreateProductForm } from '@/components/create/CreateProductForm'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CreateProductPage() {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-6">
        <div className="container-mobile">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold md:text-3xl">
              List Product or Service
            </h1>
            <p className="mt-2 text-green-100">
              Reach customers through your network connections
            </p>
          </div>
        </div>
      </div>

      <div className="container-mobile py-8">
        <CreateProductForm />
      </div>
    </div>
  )
}
