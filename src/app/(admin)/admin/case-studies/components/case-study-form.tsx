'use client'

import { CaseStudy, Image as CaseStudyImage } from '@/domain/models/case-study.model'
import { Locale } from '@/i18n'
import Image  from 'next/image'
import { useState } from 'react'

interface CaseStudyFormProps {
  study?: CaseStudy
  locale: Locale
  onSubmit: (data: Partial<CaseStudy>) => Promise<void>
  onCancel: () => void
  loading: boolean
}

interface ImageInput {
  file?: File
  url: string
  alt: string
}

export function CaseStudyForm({
  study,
  locale,
  onSubmit,
  onCancel,
  loading,
}: CaseStudyFormProps) {
  const [images, setImages] = useState<ImageInput[]>(
    study?.images.map((img) => ({ url: img.url, alt: img.alt })) || [
      { url: '', alt: '' },
    ]
  )
  const [tags, setTags] = useState<readonly string[]>(study?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [title, setTitle] = useState(study?.title || '')

  const handleAddImage = () => {
    setImages([...images, { url: '', alt: '' }])
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleImageChange = (
    index: number,
    field: keyof CaseStudyImage,
    value: string
  ) => {
    setImages(
      images.map((img, i) => (i === index ? { ...img, [field]: value } : img))
    )
  }

  const handleFileChange = async (index: number, file: File) => {
    try {
      const titleInput = document.getElementById('title') as HTMLInputElement
      const title = titleInput?.value || 'untitled'
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Upload failed')
      }

      const { url } = await response.json()
      handleImageChange(index, 'url', url)
    } catch (error) {
      console.error('Error uploading file:', error)
      // TODO: Add proper error handling UI feedback
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    await onSubmit({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      tags: tags,
      images: images.filter((img) => img.url && img.alt),
      ctaText: formData.get('ctaText') as string,
      ctaTextName: 'caseStudy.ctaText.viewCaseStudy',
      ctaUrl: formData.get('ctaUrl') as string,
    })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title ({locale}) *
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div className={`space-y-8 ${!title.trim() ? 'opacity-50 pointer-events-none' : ''}`}>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            defaultValue={study?.description}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>
          {images.map((image, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileChange(index, file)
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
                {image.url && (
                  <div className="mt-2">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) =>
                    handleImageChange(index, 'alt', e.target.value)
                  }
                  placeholder="Alt text"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="text-red-600 hover:text-red-900"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddImage}
            className="text-sm text-primary hover:text-primary/90"
          >
            + Add Image
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-primary hover:text-primary/90"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddTag())
              }
              placeholder="Add a tag"
              className="flex-1 rounded-full border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-6 py-2 text-sm font-medium text-primary bg-white border border-primary rounded-full hover:bg-primary/10 transition-colors"
            >
              Add Tag
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="ctaText"
            className="block text-sm font-medium text-gray-700"
          >
            CTA Text
          </label>
          <input
            type="text"
            name="ctaText"
            id="ctaText"
            defaultValue={study?.ctaText}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        {/* <div>
          <label htmlFor="ctaTextName" className="block text-sm font-medium text-gray-700">
            CTA Text Name
          </label>
          <input
            type="text"
            name="ctaTextName"
            id="ctaTextName"
            defaultValue={study?.ctaTextName}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div> */}

        <div>
          <label
            htmlFor="ctaUrl"
            className="block text-sm font-medium text-gray-700"
          >
            CTA URL
          </label>
          <input
            type="url"
            name="ctaUrl"
            id="ctaUrl"
            defaultValue={study?.ctaUrl}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
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
          disabled={loading || !title.trim()}
        >
          {loading ? 'Saving...' : study ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
