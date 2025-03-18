import { SqlLiteAdapter } from '@/lib/repositories/adapters/sqllite.adapter';
import { Database } from 'sqlite3';
import { getDatabaseFilePath } from '@/lib/config/database.config';
import logger from '@/lib/utils/logger';
import { CaseStudy } from '@/domain/models/models';
import { ICaseStudyRepository } from '@/lib/services/caseStudy.service';

const dbPath = getDatabaseFilePath();
const db = new Database(dbPath);

export class CaseStudyRepositoryLocal extends SqlLiteAdapter<CaseStudy, string> implements ICaseStudyRepository {
  constructor() {
    // Default table name; for locale-specific queries we’ll override this via getTableName()
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
   * Retrieves all case studies for a given locale.
   */
  async getCaseStudies(locale: string): Promise<CaseStudy[]> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "${tableName}" ORDER BY order_index ASC;`;
      this.db.all(query, [], (err, rows: CaseStudy[]) => {
        if (err) {
          logger.log(`Error listing case studies from table "${tableName}":`, err);
          return reject(new Error(`Database error listing entities from table "${tableName}": ${err.message || 'Unknown error'}`));
        }
        resolve(rows || []);
      });
    });
  }

  /**
   * Retrieves a case study by its slug for a given locale.
   */
  async getCaseStudyBySlug(slug: string, locale: string): Promise<CaseStudy | null> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "${tableName}" WHERE slug = ? LIMIT 1;`;
      this.db.get(query, [slug], (err, row: CaseStudy) => {
        if (err) {
          logger.log(`Error retrieving case study with slug "${slug}" from table "${tableName}":`, err);
          return reject(new Error(`Database error: ${err.message || 'Unknown error'}`));
        }
        resolve(row || null);
      });
    });
  }

  /**
   * Creates a new case study.
   * Note: This implementation assumes the case study data includes an 'id' if not using auto-generated IDs.
   */
  async createCaseStudy(data: Partial<CaseStudy>, locale: string): Promise<CaseStudy> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
      const query = `INSERT INTO "${tableName}" (${columns}) VALUES (${placeholders});`;
      
      this.db.run(query, values, function (err) {
        if (err) {
          logger.log(`Error creating case study in table "${tableName}":`, err);
          return reject(new Error(`Error creating case study: ${err.message}`));
        }
        // Retrieve the newly inserted row.
        // Here we assume that the 'id' field is provided in 'data'.
        const insertedId = (data as any).id;
        if (!insertedId) {
          return reject(new Error("Case study creation failed: no ID provided."));
        }
        const selectQuery = `SELECT * FROM "${tableName}" WHERE id = ?;`;
        db.get(selectQuery, [insertedId], (err2, row: CaseStudy) => {
          if (err2) {
            logger.log(`Error retrieving new case study from table "${tableName}":`, err2);
            return reject(new Error(`Error retrieving inserted case study: ${err2.message}`));
          }
          resolve(row);
        });
      });
    });
  }

  /**
   * Updates an existing case study by its ID.
   */
  async updateCaseStudy(id: string, data: Partial<CaseStudy>, locale: string): Promise<CaseStudy | null> {
    const tableName = this.getTableName(locale);
    return new Promise((resolve, reject) => {
      const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = Object.values(data);
      values.push(id);
      const query = `UPDATE "${tableName}" SET ${setClause} WHERE id = ?;`;
      this.db.run(query, values, (err) => {
        if (err) {
          logger.log(`Error updating case study with id "${id}" in table "${tableName}":`, err);
          return reject(new Error(`Error updating case study: ${err.message}`));
        }
        const selectQuery = `SELECT * FROM "${tableName}" WHERE id = ? LIMIT 1;`;
        this.db.get(selectQuery, [id], (err2, row: CaseStudy) => {
          if (err2) {
            logger.log(`Error retrieving updated case study with id "${id}" in table "${tableName}":`, err2);
            return reject(new Error(`Error retrieving updated case study: ${err2.message}`));
          }
          resolve(row || null);
        });
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