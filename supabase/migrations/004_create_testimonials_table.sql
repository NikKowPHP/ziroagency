-- Create English testimonials table
CREATE TABLE testimonials_en (
  id text PRIMARY KEY,
  author text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  quote text NOT NULL,
  image text NOT NULL,
  image_alt text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Polish testimonials table
CREATE TABLE testimonials_pl (
  id text PRIMARY KEY,
  author text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  quote text NOT NULL,
  image text NOT NULL,
  image_alt text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for both tables
ALTER TABLE testimonials_en ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials_pl ENABLE ROW LEVEL SECURITY;

-- Allow public read access for both tables
CREATE POLICY "Allow public read access on English testimonials"
  ON testimonials_en FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on Polish testimonials"
  ON testimonials_pl FOR SELECT
  USING (true);

-- Insert initial data into testimonials_en
INSERT INTO testimonials_en (id, author, role, company, quote, image, image_alt) VALUES
('testimonial1', 'John Doe', 'CEO', 'Tech Company Inc.', 'Ziro helped us to revolutionize our workflow. Their solutions are innovative and effective.', 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif', 'John Doe - CEO of Tech Company Inc.'),
('testimonial2', 'Alice Smith', 'Marketing Director', 'Global Corp', 'Incredible service! Ziro team is highly professional and delivered exceptional results.', 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif', 'Alice Smith - Marketing Director at Global Corp');

-- Insert initial data into testimonials_pl
INSERT INTO testimonials_pl (id, author, role, company, quote, image, image_alt) VALUES
('testimonial1', 'Jan Kowalski', 'Dyrektor Generalny', 'Firma Technologiczna S.A.', 'Ziro pomogło nam zrewolucjonizować nasz przepływ pracy. Ich rozwiązania są innowacyjne i skuteczne.', 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif', 'Jan Kowalski - Dyrektor Generalny Firmy Technologicznej S.A.'),
('testimonial2', 'Anna Nowak', 'Dyrektor Marketingu', 'Korporacja Globalna', 'Niesamowita obsługa! Zespół Ziro jest wysoce profesjonalny i dostarczył wyjątkowe rezultaty.', 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif', 'Anna Nowak - Dyrektor Marketingu w Korporacji Globalnej');