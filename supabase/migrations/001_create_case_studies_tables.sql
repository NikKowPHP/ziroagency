-- Create English case studies table
CREATE TABLE case_studies_en (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  tags text[] NOT NULL,
  images jsonb NOT NULL,
  cta_text text NOT NULL,
  cta_text_name text NOT NULL,
  cta_url text NOT NULL,
  order_index integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Polish case studies table
CREATE TABLE case_studies_pl (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  tags text[] NOT NULL,
  images jsonb NOT NULL,
  cta_text text NOT NULL,
  cta_text_name text NOT NULL,
  cta_url text NOT NULL,
  order_index integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create ziroagency_tags table