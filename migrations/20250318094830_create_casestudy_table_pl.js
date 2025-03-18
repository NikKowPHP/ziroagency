
exports.up = function (knex) {
  return knex.schema.createTable('case_studies_pl', (table) => {
    table.string('id').primary() // Unique ID for the case study
    table.string('slug').notNullable().unique() // Unique slug for the case study
    table.string('title').notNullable() // Title of the case study
    table.text('description').notNullable() // Description of the case study
    table.json('tags').notNullable() // JSON array of tag IDs
    table.json('images').notNullable() // JSON array of image objects
    table.string('cta_text').notNullable() // Call-to-action text
    table.string('cta_text_name').notNullable() // Call-to-action text name
    table.string('cta_url').notNullable() // Call-to-action URL
    table.integer('order_index').notNullable() // Order index for sorting
    table.timestamp('created_at').defaultTo(knex.fn.now()) // Timestamp for creation
    table.timestamp('updated_at').defaultTo(knex.fn.now()) // Timestamp for last update
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('case_studies_pl')
}
