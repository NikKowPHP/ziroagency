'use client'

import { useState, useEffect } from 'react'
import { Tag } from '@/domain/models/models'

export interface TagFormProps {
  tag?: Tag
  onSubmit: (data: Partial<Tag>) => Promise<void> 
  onCancel: () => void
  loading: boolean
}

interface ImagePreviewProps {
  url: string
  alt: string
  onError: () => void
}



export function TagForm({ tag, onSubmit, onCancel, loading }: TagFormProps) {
  const [name, setName] = useState(tag?.name || '')
  const [imageUrl, setImageUrl] = useState(tag?.image_url || '')
  const [imageError, setImageError] = useState<string | null>(null)

  const handleImageError = () => {
    setImageError('Failed to load image. Please check the URL or try a different link.')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim()) {
      alert('Tag name is required')
      return
    }

    await onSubmit({
      name: name.trim(),
      image_url: imageUrl.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Tag Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value)
            setImageError(null)
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {imageUrl && !imageError && (
          <ImagePreview url={imageUrl} alt={name} onError={handleImageError} />
        )}
        {imageError && (
          <div className="mt-2 text-sm text-red-600">
            {imageError}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
          disabled={loading || !name.trim()}
        >
          {loading ? 'Saving...' : tag ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}



const ImagePreview = ({ url, alt, onError }: ImagePreviewProps) => {
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setShowImage(true)
    img.onerror = onError
    img.src = url

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [url, onError])

  if (!showImage) {
    return (
      <div className="relative mt-2 h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center">
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    )
  }

  return (
    <div className="relative mt-2 h-20 w-20">
      <img
        src={url}
        alt={alt || 'Preview'}
        className="object-cover rounded-md h-full w-full"
        onError={onError}
      />
    </div>
  )
}