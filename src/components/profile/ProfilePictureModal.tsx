'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfilePictureUpload } from './ProfilePictureUpload'
import { updateUserProfile } from '@/app/actions/profile'

interface ProfilePictureModalProps {
  isOpen: boolean
  onClose: () => void
  currentAvatar?: string
  userName: string
  userId: number
  onAvatarUpdated: (newAvatar: string) => void
}

export function ProfilePictureModal({
  isOpen,
  onClose,
  currentAvatar,
  userName,
  userId,
  onAvatarUpdated
}: ProfilePictureModalProps) {
  const [newAvatar, setNewAvatar] = useState(currentAvatar || '')
  const [isUpdating, setIsUpdating] = useState(false)

  if (!isOpen) return null

  const handleSave = async () => {
    setIsUpdating(true)
    try {
      const result = await updateUserProfile({
        avatar: newAvatar || undefined
      })

      if (result.success) {
        onAvatarUpdated(newAvatar)
        onClose()
        // Refresh the page to update the header avatar
        window.location.reload()
      } else {
        console.error('Failed to update profile picture')
      }
    } catch (error) {
      console.error('Error updating profile picture:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    setNewAvatar(currentAvatar || '')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProfilePictureUpload
              currentAvatar={newAvatar}
              onAvatarChange={setNewAvatar}
              userName={userName}
            />
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isUpdating}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className="flex-1"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
