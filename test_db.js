// test_db.js
const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig.development)

async function testQueries() {
  try {
    // Case Studies
    const enResults = await knex('case_studies_en').select('*')
    console.log('case_studies_en:', enResults)

    const plResults = await knex('case_studies_pl').select('*')
    console.log('case_studies_pl:', plResults)

    const tagsResults = await knex('ziroagency_tags').select('*')
    console.log('ziroagency_tags:', tagsResults)



  } finally {
    knex.destroy()
  }
}

testQueries()
