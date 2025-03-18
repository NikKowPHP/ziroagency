/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex('ziroagency_tags').insert([
    { id: 'branding',        name: 'Branding',        image_url: '/images/tags/branding.png' },
    { id: 'saas',            name: 'Saas',            image_url: '/images/tags/saas.png' },
    { id: 'health-tech',     name: 'Health Tech',     image_url: '/images/tags/health-tech.png' },
    { id: 'mobile-app',      name: 'Mobile App',      image_url: '/images/tags/mobile-app.png' },
    { id: 'visual-identity', name: 'Visual Identity', image_url: '/images/tags/visual-identity.png' },
    { id: 'sustainability',  name: 'Sustainability',  image_url: '/images/tags/sustainability.png' }
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex('ziroagency_tags')
    .whereIn('id', [
      'branding', 
      'saas', 
      'health-tech', 
      'mobile-app', 
      'visual-identity', 
      'sustainability'
    ])
    .del();
};
