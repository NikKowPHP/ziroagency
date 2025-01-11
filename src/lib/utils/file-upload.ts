import fs from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function uploadImage(file: File, title: string): Promise<string> {
  try {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.')
    }

    if (file.size > MAX_SIZE) {
      throw new Error('File size too large. Maximum size is 5MB.')
    }

    const folderName = title.toLowerCase().replace(/\s+/g, '-')
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'case-studies', folderName)

    await fs.mkdir(uploadDir, { recursive: true })

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const filename = `${uniqueSuffix}-${file.name}`
    const filepath = path.join(uploadDir, filename)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await fs.writeFile(filepath, buffer)

    return `/images/case-studies/${folderName}/${filename}`
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
} 