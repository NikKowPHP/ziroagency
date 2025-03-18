-- Create tags table
CREATE TABLE ziroagency_tags (
  id text PRIMARY KEY,
  name text NOT NULL UNIQUE,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


INSERT INTO ziroagency_tags (id, name, image_url) VALUES ('branding', 'Branding', '/images/tags/branding.png');
INSERT INTO ziroagency_tags (id, name, image_url) VALUES ('saas', 'Saas', '/images/tags/saas.png');
INSERT INTO ziroagency_tags (id, name, image_url) VALUES ('health-tech', 'Health Tech', '/images/tags/health-tech.png');
INSERT INTO ziroagency_tags (id, name, image_url) VALUES ('mobile-app', 'Mobile App', '/images/tags/mobile-app.png');
INSERT INTO ziroagency_tags (id, name, image_url) VALUES ('visual-identity', 'Visual Identity', '/images/tags/visual-identity.png');
INSERT INTO ziroagency_tags (id, name, image_url) VALUES ('sustainability', 'Sustainability', '/images/tags/sustainability.png');