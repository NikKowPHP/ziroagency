import { SqlLiteAdapter } from '@/lib/repositories/adapters/sqllite.adapter';
import { Database } from 'sqlite3';
import { getDatabaseFilePath } from '@/lib/config/database.config';
import logger from '@/lib/utils/logger'
import { Tag } from '@/domain/models/models';
import { ITagRepository } from '@/lib/services/tags.service';
const dbPath = getDatabaseFilePath();
const db = new Database(dbPath);

export class TagsLocalRepository extends SqlLiteAdapter<Tag, string> implements ITagRepository {
  constructor() {
    super("ziroagency_tags", db);
  }

  /**
   * Retrieves the list of all tags.
   */
  async getTags(): Promise<Tag[]> {
    try {
      const tags = await this.list();
      return tags;
    } catch (error) {
      logger.log(`Error fetching tags:`, error);
      throw error;
    }
  }

  /**
   * Retrieves a tag by its ID.
   */
  async getTagById(id: string): Promise<Tag | null> {
    try {
      const tag = await this.read(id);
      return tag;
    } catch (error) {
      logger.log(`Error fetching tag with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Creates a new tag.
   * @param tag - The tag data (without the id) to create.
   */
  async createTag(tag: Omit<Tag, 'id'>): Promise<Tag> {
    try {
      const newTag = await this.create(tag);
      return newTag;
    } catch (error) {
      logger.log(`Error creating tag:`, error);
      throw error;
    }
  }

  /**
   * Updates an existing tag by its ID.
   */
  async updateTag(id: string, tag: Partial<Tag>): Promise<Tag | null> {
    try {
      const updatedTag = await this.update(id, tag);
      return updatedTag;
    } catch (error) {
      logger.log(`Error updating tag with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a tag by its ID.
   */
  async deleteTag(id: string): Promise<boolean> {
    try {
      const result = await this.delete(id);
      return result === true;
    } catch (error) {
      logger.log(`Error deleting tag with id ${id}:`, error);
      throw error;
    }
  }
}

// Export a singleton instance if desired

export const tagsLocalRepository = new TagsLocalRepository();