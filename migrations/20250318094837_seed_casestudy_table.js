/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex('case_studies').insert([
    {
      id: '1',
      slug: 'case-study-1',
      title: 'Case Study One',
      description: 'Description for case study one.',
      tags: JSON.stringify(['tag1', 'tag2']), // Store tags as a JSON array
      images: JSON.stringify([{ url: '/images/case-studies/gsense/gsense.avif', alt: 'Image 1' }]), // Store images as a JSON array
      cta_text: 'View Case Study',
      cta_text_name: 'viewCaseStudy',
      cta_url: '/case-study-1',
      order_index: 1,
      created_at: '2024-01-01T10:00:00.000Z',
      updated_at: '2024-01-02T10:00:00.000Z',
    },
    {
      id: '2',
      slug: 'case-study-2',
      title: 'Case Study Two',
      description: 'Description for case study two.',
      tags: JSON.stringify(['tag3', 'tag4']), // Store tags as a JSON array
      images: JSON.stringify([{ url: '/images/case-studies/gsense/gsense.avif', alt: 'Image 2' }]), // Store images as a JSON array
      cta_text: 'Learn More',
      cta_text_name: 'learnMore',
      cta_url: '/case-study-2',
      order_index: 2,
      created_at: '2024-01-05T10:00:00.000Z',
      updated_at: '2024-01-06T10:00:00.000Z',
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex('case_studies').whereIn('id', ['1', '2']).delete();
};
