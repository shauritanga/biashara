import { CreatePostForm } from '@/components/create/CreatePostForm'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CreatePostPage() {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-6">
        <div className="container-mobile">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold md:text-3xl">
              Create a Post
            </h1>
            <p className="mt-2 text-primary-100">
              Share your thoughts with your network
            </p>
          </div>
        </div>
      </div>

      <div className="container-mobile py-8">
        <CreatePostForm />
      </div>
    </div>
  )
}
