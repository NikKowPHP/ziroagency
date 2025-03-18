import { Tag } from "@/domain/models/models";
import { tagsRepository } from "../repositories/tags.repository";
import { getTagsLocalRepository  } from "../repositories/tags.local.repository";
import logger from "../utils/logger";
export interface ITagRepository {
  getTags: () => Promise<Tag[]>;
  getTagById: (id: string) => Promise<Tag | null>;
  createTag: (tag: Omit<Tag, "id">) => Promise<Tag>;
  updateTag: (id: string, update: Partial<Tag>) => Promise<Tag | null>;
  deleteTag: (id: string) => Promise<boolean>;
};


export class TagsService {
  private repository: ITagRepository;


  constructor() {
    // Replace this logic if you have a proper mock repository.
    if (process.env.MOCK_REPOSITORIES === "true") {
      logger.log('Using local tags repository')
      this.repository = getTagsLocalRepository();
    } else {
      this.repository = tagsRepository;
    }
  }

  /**
   * Retrieve all tags.
   */
  getTags = async (): Promise<Tag[]> => {
    return this.repository.getTags();
  };

  /**
   * Retrieve a tag by its ID.
   * @param id The tag's ID.
   */
  getTagById = async (id: string): Promise<Tag | null> => {
    return this.repository.getTagById(id);
  };

  /**
   * Create a new tag.
   * @param tag The tag data (without the ID) to create.
   */
  createTag = async (tag: Omit<Tag, "id">): Promise<Tag> => {
    return this.repository.createTag(tag);
  };

  /**
   * Update an existing tag.
   * @param id The tag's ID.
   * @param update The fields to update.
   */
  updateTag = async (id: string, update: Partial<Tag>): Promise<Tag | null> => {
    return this.repository.updateTag(id, update);
  };

  /**
   * Delete a tag by its ID.
   * @param id The tag's ID.
   */
  deleteTag = async (id: string): Promise<boolean> => {
    return this.repository.deleteTag(id);
  };
}

// Export a singleton instance if desired.
export const tagsService = new TagsService();