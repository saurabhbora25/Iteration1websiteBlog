-- Enable Row Level Security on both tables
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for contact_forms table
-- Allow anyone to insert contact form submissions (for the website contact form)
CREATE POLICY "Anyone can insert contact forms" ON contact_forms
  FOR INSERT 
  WITH CHECK (true);

-- Restrict read access to contact forms (only for admin/internal use)
-- Note: In a production app, you'd typically restrict this to admin users
CREATE POLICY "No public read access to contact forms" ON contact_forms
  FOR SELECT 
  USING (false);

-- Policies for blog_posts table  
-- Allow anyone to read blog posts (public blog)
CREATE POLICY "Anyone can read blog posts" ON blog_posts
  FOR SELECT 
  USING (true);

-- Restrict write access to blog posts (only for admin/content management)
-- Note: In a production app, you'd typically restrict this to admin users only
CREATE POLICY "No public write access to blog posts" ON blog_posts
  FOR INSERT 
  WITH CHECK (false);

CREATE POLICY "No public update access to blog posts" ON blog_posts
  FOR UPDATE 
  USING (false);

CREATE POLICY "No public delete access to blog posts" ON blog_posts
  FOR DELETE 
  USING (false);