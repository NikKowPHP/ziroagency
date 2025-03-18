'use client'

import { CaseStudyWithTags, Tag } from '@/domain/models/models'
import { Locale } from '@/i18n'
import { useState, useEffect } from 'react'
import { getTagsAction } from '@/components/server-actions/tags-actions'

interface CaseStudyFormProps {
  study?: CaseStudyWithTags
  locale: Locale
  onSubmit: (data: Partial<CaseStudyWithTags>) => Promise<void>
  onCancel: () => void
  loading: boolean
}

interface ImageInput {
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
    study?.images.map((img: { url: string; alt: string }) => ({
      url: img.url,
      alt: img.alt,
    })) || [{ url: '', alt: '' }]
  )
  const [tags, setTags] = useState<Tag[]>(study?.tags || [])
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [tagInput, setTagInput] = useState('')
  const [title, setTitle] = useState(study?.title || '')
  const [slug, setSlug] = useState(study?.slug || '')
  const [imageErrors, setImageErrors] = useState<Record<number, string | null>>(
    {}
  )

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTagsAction()
      setAvailableTags(tags)
    }
    fetchTags()
  }, [])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value)
  }

  const handleAddImage = () => {
    setImages([...images, { url: '', alt: '' }])
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    setImageErrors((prev) => ({ ...prev, [index]: null }))
  }

  const handleImageChange = (
    index: number,
    field: keyof ImageInput,
    value: string
  ) => {
    if (field === 'url') {
      setImageErrors((prev) => ({ ...prev, [index]: null }))

      setImages(
        images.map((img, i) => (i === index ? { ...img, url: value } : img))
      )
    } else {
      setImages(
        images.map((img, i) => (i === index ? { ...img, [field]: value } : img))
      )
    }
  }

  const handleAddTag = (tag: Tag) => {
    if (!tags.some((t) => t.id === tag.id)) {
      setTags([...tags, tag])
    }
  }

  const handleRemoveTag = (tagToRemove: Tag) => {
    setTags(tags.filter((tag) => tag.id !== tagToRemove.id))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    await onSubmit({
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      tags: tags,
      images: images.filter((img) => img.url && img.alt),
      ctaText: formData.get('ctaText') as string,
      ctaTextName: 'caseStudy.ctaText.viewCaseStudy',
      ctaUrl: formData.get('ctaUrl') as string,
    })
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]:
        'Failed to load image. Please check the URL or try a different link format.',
    }))
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

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          URL Slug *
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            {`/${locale}/case-studies/`}
          </span>
          <input
            type="text"
            name="slug"
            id="slug"
            value={slug}
            onChange={handleSlugChange}
            required
            pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
            title="Only lowercase letters, numbers, and hyphens are allowed"
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          This will be the URL of your case study. Use only lowercase letters,
          numbers, and hyphens.
        </p>
      </div>

      <div
        className={`space-y-8 ${
          !title.trim() ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
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
                  type="url"
                  value={image.url}
                  onChange={(e) =>
                    handleImageChange(index, 'url', e.target.value)
                  }
                  placeholder="Image URL (direct link recommended)"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
                {image.url && !imageErrors[index] && (
                  <ImagePreview
                    url={image.url}
                    alt={image.alt}
                    onError={() => handleImageError(index)}
                  />
                )}
                {imageErrors[index] && (
                  <div className="mt-2 text-sm text-red-600">
                    <p>{imageErrors[index]}</p>
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
                  required={!!image.url}
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
                key={tag.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag.name}
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
          <div className="relative">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Search and add tags"
              className="w-full rounded-full border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            {tagInput && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {availableTags
                  .filter(
                    (tag) =>
                      tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
                      !tags.some((t) => t.id === tag.id)
                  )
                  .map((tag) => (
                    <div
                      key={tag.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleAddTag(tag)
                        setTagInput('')
                      }}
                    >
                      {tag.name}
                    </div>
                  ))}
              </div>
            )}
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

interface ImagePreviewProps {
  url: string
  alt: string
  onError: () => void
}

const ImagePreview = ({ url, alt, onError }: ImagePreviewProps) => {
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const img = document.createElement('img')
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt || 'Preview'}
        className="object-cover rounded-md h-full w-full"
        onError={onError}
      />
    </div>
  )
}
