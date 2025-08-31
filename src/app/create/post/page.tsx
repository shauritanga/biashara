import { CreatePostForm } from '@/components/create/CreatePostForm'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CreatePostPage() {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-primary-600 py-8">
        <div className="container-mobile">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold text-white">
              Create a Post
            </h1>
            <p className="mt-2 text-white">
              Share your thoughts and updates with your network
            </p>
          </div>
        </div>
      </div>

      <div className="container-mobile py-8">
        <div className="mx-auto max-w-2xl">
          <CreatePostForm />
        </div>
      </div>
    </div>
  )
}
