import { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import { Tag } from '@/domain/models/models'

import { ITagRepository } from '@/lib/services/tags.service';
import logger from '../utils/logger';

export class TagsRepository implements ITagRepository {
  private supabaseClient: SupabaseClient
  private tableName: string

  constructor(tableName: string) {
      this.supabaseClient = supabase
      this.tableName = tableName
  }

  getTags = async (): Promise<Tag[]> => {
      const { data, error } = await this.supabaseClient
        .from(this.tableName)
        .select('*')
      if (error) {
        logger.error('Error fetching case studies:', error)
        return []
      }

    return data;
    }

  getTagById = async (id: string): Promise<Tag | null> => {
    const { data, error } = await this.supabaseClient
          .from(this.tableName)
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          logger.error('Error fetching case study:', error)
          return null
        }

    return data;
  }

  createTag = async (tagData: Omit<Tag, 'id' | 'created_at' | 'updated_at'>): Promise<Tag> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .insert(tagData)
      .select()
      .single();

    if (error) {
      logger.error('Error creating tag:', error);
      throw error;
    }
    return data;
  };

  updateTag = async (id: string, updates: Partial<Tag>): Promise<Tag | null> => {
    const { data, error } = await this.supabaseClient
      .from(this.tableName)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating tag:', error);
      return null;
    }
    return data;
  };

  deleteTag = async (id: string): Promise<boolean> => {
    const { error } = await this.supabaseClient
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Error deleting tag:', error);
      return false;
    }
    return true;
  };
}

// export singleton
export const tagsRepository = new TagsRepository('ziroagency_tags');