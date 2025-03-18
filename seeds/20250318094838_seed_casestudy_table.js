/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  const mockCaseStudies = [
    {
      id: '1',
      slug: 'case-study-1',
      title: 'Case Study One',
      description: 'Description for case study one.',
      tags: JSON.stringify(['branding', 'saas']), // Store tags as a JSON array
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
      tags: JSON.stringify(['health-tech', 'mobile-app']), // Store tags as a JSON array
      images: JSON.stringify([{ url: '/images/case-studies/gsense/gsense.avif', alt: 'Image 2' }]), // Store images as a JSON array
      cta_text: 'Learn More',
      cta_text_name: 'learnMore',
      cta_url: '/case-study-2',
      order_index: 2,
      created_at: '2024-01-05T10:00:00.000Z',
      updated_at: '2024-01-06T10:00:00.000Z',
    },
  ];

  const tablesExist = await Promise.all([
    knex.schema.hasTable('case_studies_en'),
    knex.schema.hasTable('case_studies_pl'),
  ]);

  if (tablesExist[0]) await knex('case_studies_en').del();
  if (tablesExist[1]) await knex('case_studies_pl').del();

  // Insert mock data into both English and Polish tables
  return Promise.all([
    knex('case_studies_en').insert(mockCaseStudies),
    knex('case_studies_pl').insert(mockCaseStudies),
  ]);
};
