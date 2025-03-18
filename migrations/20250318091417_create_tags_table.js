/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('ziroagency_tags', function(table) {
    table.text('id').primary();
    table.text('name').notNullable().unique();
    table.text('image_url');
    // SQLite doesn't support time zones, so we use knex.fn.now()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ziroagency_tags');
};
