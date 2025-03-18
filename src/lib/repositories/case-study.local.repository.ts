import { SqlLiteAdapter } from '@/lib/repositories/adapters/sqllite.adapter';
import { Database } from 'sqlite3';
import { getDatabaseFilePath } from '@/lib/config/database.config';
import logger from '@/lib/utils/logger';
import { CaseStudy, Image, Tag } from '@/domain/models/models';
import { ICaseStudyRepository } from '@/lib/services/caseStudy.service';
import { tagsLocalRepository } from '@/lib/repositories/tags.local.repository';

// Extended type to return case studies with full tag details
export interface CaseStudyWithTags extends Omit<CaseStudy, 'tags'> {
  tags: Tag[];
}

const dbPath = getDatabaseFilePath();
const db = new Database(dbPath);

export class CaseStudyRepositoryLocal extends SqlLiteAdapter<CaseStudy, string> implements ICaseStudyRepository {
  constructor() {
    // Default table name; for locale-specific queries we'll override this via getTableName()
    super("case_studies", db);
  }

  /**
   * Helper function to determine the table name based on the locale.
   * If a locale is provided, we assume the table follows the naming convention:
   * "case_studies_{locale}" (e.g.: "case_studies_en" or "case_studies_pl").
   */
  private getTableName(locale?: string): string {
    return locale ? `case_studies_${locale}` : this.tableName;
  }

  /**
   * Retrieves all case studies for a given locale and enriches each with full tag details.
   */
  async getCaseStudies(locale: string): Promise<CaseStudyWithTags[]> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "${tableName}" ORDER BY order_index ASC;`;
      this.db.all(query, [], async (err, rows: any[]) => {
        if (err) {
          logger.log(`Error listing case studies from table "${tableName}":`, err);
          return reject(new Error(`Database error listing entities from table "${tableName}": ${err.message || 'Unknown error'}`));
        }
        try {
          // Fetch all tags from the local tags repository once
          const allTags = await tagsLocalRepository.getTags();
          const studies: CaseStudyWithTags[] = rows.map(row => {
            // Parse images from JSON string to Image[]
            const images: Image[] = typeof row.images === 'string' ? JSON.parse(row.images) : row.images;

            // Assume the 'tags' column is stored as a JSON string array of tag IDs
            let tagIds: string[] = [];
            try {
              tagIds = typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [];
            } catch (e) {
              logger.log(`Error parsing tags for case study with id "${row.id}":`, e);
            }
            // Replace tag IDs with full tag objects from allTags
            const tagObjects = allTags.filter((tag: Tag) => tagIds.includes(tag.id));
            return { ...row, tags: tagObjects, images };
          });
          resolve(studies);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  /**
   * Retrieves a case study by its slug for a given locale and enriches it with full tag details.
   */
  async getCaseStudyBySlug(slug: string, locale: string): Promise<CaseStudyWithTags | null> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "${tableName}" WHERE slug = ? LIMIT 1;`;
      this.db.get(query, [slug], async (err, row: any) => {
        if (err) {
          logger.log(`Error retrieving case study with slug "${slug}" from table "${tableName}":`, err);
          return reject(new Error(`Database error: ${err.message || 'Unknown error'}`));
        }
        if (!row) {
          return resolve(null);
        }
        try {
          const allTags = await tagsLocalRepository.getTags();
          let tagIds: string[] = [];
          try {
            tagIds = typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [];
          } catch (e) {
            logger.log(`Error parsing tags for case study with id "${row.id}":`, e);
          }
          const tagObjects = allTags.filter((tag: Tag) => tagIds.includes(tag.id));
          const studyWithTags: CaseStudyWithTags = { ...row, tags: tagObjects };
          resolve(studyWithTags);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  /**
   * Creates a new case study.
   * Note: This implementation assumes the case study data includes an 'id' if not using auto-generated IDs.
   */
  async createCaseStudy(data: Partial<CaseStudyWithTags>, locale: string): Promise<CaseStudyWithTags> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
      const query = `INSERT INTO "${tableName}" (${columns}) VALUES (${placeholders});`;
      
      this.db.run(query, values, async function (err) {
        if (err) {
          logger.log(`Error creating case study in table "${tableName}":`, err);
          return reject(new Error(`Error creating case study: ${err.message}`));
        }
        const insertedId = (data as any).id;
        if (!insertedId) {
          return reject(new Error("Case study creation failed: no ID provided."));
        }
        try {
          const allTags = await tagsLocalRepository.getTags();
          const selectQuery = `SELECT * FROM "${tableName}" WHERE id = ?;`;
          db.get(selectQuery, [insertedId], (err2, row: any) => {
            if (err2) {
              logger.log(`Error retrieving new case study from table "${tableName}":`, err2);
              return reject(new Error(`Error retrieving inserted case study: ${err2.message}`));
            }
            const tagIds = typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [];
            const tagObjects = allTags.filter((tag: Tag) => tagIds.includes(tag.id));
            resolve({ ...row, tags: tagObjects });
          });
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  /**
   * Updates an existing case study by its ID.
   */
  async updateCaseStudy(id: string, data: Partial<CaseStudyWithTags>, locale: string): Promise<CaseStudyWithTags | null> {
    const tableName = this.getTableName(locale);
    return new Promise(async (resolve, reject) => {
      const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = Object.values(data);
      values.push(id);
      const query = `UPDATE "${tableName}" SET ${setClause} WHERE id = ?;`;
      
      this.db.run(query, values, async (err) => {
        if (err) {
          logger.log(`Error updating case study with id "${id}" in table "${tableName}":`, err);
          return reject(new Error(`Error updating case study: ${err.message}`));
        }
        try {
          const allTags = await tagsLocalRepository.getTags();
          const selectQuery = `SELECT * FROM "${tableName}" WHERE id = ? LIMIT 1;`;
          this.db.get(selectQuery, [id], (err2, row: any) => {
            if (err2) {
              logger.log(`Error retrieving updated case study with id "${id}" in table "${tableName}":`, err2);
              return reject(new Error(`Error retrieving updated case study: ${err2.message}`));
            }
            if (!row) {
              return resolve(null);
            }
            const tagIds = typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [];
            const tagObjects = allTags.filter((tag: Tag) => tagIds.includes(tag.id));
            resolve({ ...row, tags: tagObjects });
          });
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  /**
   * Deletes a case study by its ID.
   */
  async deleteCaseStudy(id: string, locale: string): Promise<boolean> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM "${tableName}" WHERE id = ?;`;
      this.db.run(query, [id], function (err) {
        if (err) {
          logger.log(`Error deleting case study with id "${id}" from table "${tableName}":`, err);
          return reject(new Error(`Error deleting case study: ${err.message}`));
        }
        resolve(true);
      });
    });
  }

  /**
   * Updates the order_index for each case study entry.
   */
  async updateCaseStudyOrder(orders: { id: string; order: number }[], locale: string): Promise<void> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const query = `UPDATE "${tableName}" SET order_index = ? WHERE id = ?;`;
      const updatePromises = orders.map(({ id, order }) => {
        return new Promise<void>((res, rej) => {
          this.db.run(query, [order, id], function (err) {
            if (err) {
              logger.log(`Error updating order for case study with id "${id}" in table "${tableName}":`, err);
              rej(new Error(`Error updating order for id ${id}: ${err.message}`));
            } else {
              res();
            }
          });
        });
      });
      Promise.all(updatePromises)
        .then(() => resolve())
        .catch(reject);
    });
  }
}

// Export a singleton instance if desired
export const caseStudyRepositoryLocal = new CaseStudyRepositoryLocal();