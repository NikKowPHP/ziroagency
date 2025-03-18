'use server'
import { tagsService } from '@/lib/services/tags.service'
import { Tag } from '@/domain/models/models'


export async function getTagsAction(): Promise<Tag[]> {
  return await tagsService.getTags()
}


export async function getTagByIdAction(id: string): Promise<Tag | null> {
  if (!id) {
    throw new Error('Tag id is required')
  }
  return await tagsService.getTagById(id)
}

export async function createTagAction(tag: Omit<Tag, 'id'>): Promise<Tag> {
  if (!tag.name) {
    throw new Error('Tag name is required')
  }
  if (!tag.image_url) {
    throw new Error('Tag image URL is required')
  }
  return await tagsService.createTag(tag)
}

export async function updateTagAction(data: Partial<Tag>): Promise<Tag | null> {
  if (!data.id) {
    throw new Error('Tag id is required for update')
  }
  if (!data.name) {
    throw new Error('Tag name is required')
  }
  return await tagsService.updateTag(data.id, data)
}


export async function deleteTagAction(id: string): Promise<boolean> {
  if (!id) {
    throw new Error('Tag id is required for deletion')
  }
  return await tagsService.deleteTag(id)
}