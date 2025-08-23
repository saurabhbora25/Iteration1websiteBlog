-- Create contact_forms table for storing form submissions
CREATE TABLE contact_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  custom_country TEXT,
  education_level TEXT NOT NULL,
  preferred_service TEXT NOT NULL,
  custom_service TEXT,
  additional_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create blog_posts table for dynamic blog content
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  read_time TEXT DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, category, image_url, read_time) VALUES
(
  'Complete Guide to Studying in Germany',
  'Germany offers world-class education with minimal tuition fees and excellent career prospects. This comprehensive guide covers everything you need to know about studying in Germany, from application requirements to living costs and post-graduation opportunities.\n\nGermany is home to some of the world''s most prestigious universities and research institutions. With over 400 universities offering more than 17,000 study programs, Germany provides excellent opportunities for international students across various fields.\n\nThe application process typically requires:\n- APS Certificate for most programs\n- IELTS 6.5+ or equivalent German/English proficiency\n- Relevant academic qualifications\n- Proof of financial resources (€11,208 per year)\n\nLiving costs in Germany are relatively moderate compared to other Western European countries. Students can expect to spend around €850-1,200 per month depending on the city and lifestyle choices.',
  'Everything you need to know about pursuing higher education in Germany, from application requirements to living costs and career opportunities.',
  'Country Guides',
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop',
  '8 min read'
),
(
  'IELTS vs TOEFL: Which Should You Choose?',
  'Choosing between IELTS and TOEFL can be confusing for international students. Both tests evaluate English proficiency but have different formats, scoring systems, and acceptance rates across universities.\n\nIELTS (International English Language Testing System) is jointly managed by the British Council, IDP Education, and Cambridge Assessment English. It''s widely accepted in the UK, Australia, and increasingly in the US.\n\nTOEFL (Test of English as a Foreign Language) is administered by ETS and is particularly popular for US university applications.\n\nKey differences:\n- Format: IELTS includes face-to-face speaking, while TOEFL is entirely computer-based\n- Scoring: IELTS uses band scores 0-9, TOEFL uses 0-120 points\n- Duration: IELTS takes 2 hours 45 minutes, TOEFL takes about 3 hours\n- Accent: IELTS features various English accents, TOEFL primarily uses American English',
  'A comprehensive comparison of the two major English proficiency tests, helping you decide which one aligns better with your study abroad goals.',
  'Study Abroad Tips',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
  '6 min read'
),
(
  'Student Visa Requirements: EU Countries',
  'Navigating EU student visa requirements can be complex, as each country has its own specific requirements and processes. This guide breaks down the essential requirements for major European destinations.\n\nFor most EU countries, you''ll need:\n- Valid passport\n- University acceptance letter\n- Proof of financial resources\n- Health insurance coverage\n- Clean criminal record certificate\n- Academic transcripts and certificates\n\nGermany requires approximately €11,208 in blocked account funds, while France requires around €615 per month proof of income. Nordic countries like Denmark and Sweden have higher financial requirements but offer excellent social benefits.\n\nProcessing times vary significantly:\n- Germany: 4-12 weeks\n- France: 3-8 weeks\n- Netherlands: 2-4 weeks\n- Spain: 2-6 weeks\n\nSome countries offer fast-track processing for certain universities or programs.',
  'Navigate the complex world of EU student visa applications with our detailed breakdown of requirements for major European destinations.',
  'Visa Information',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
  '10 min read'
),
(
  'Frequently Asked Questions About Studying Abroad',
  'Here are answers to the most common questions international students have about studying abroad:\n\nQ: How much does it cost to study abroad?\nA: Costs vary significantly by country. Germany offers free tuition for most programs, while countries like the UK can cost £20,000+ per year. Living expenses typically range from €800-2,000 per month.\n\nQ: Can I work while studying?\nA: Most countries allow part-time work for international students. EU countries typically allow 20 hours per week during studies and full-time during holidays.\n\nQ: Do I need to learn the local language?\nA: Many programs are offered in English, but learning the local language can greatly enhance your experience and job prospects.\n\nQ: How do I choose the right university?\nA: Consider factors like program ranking, location, cost, language of instruction, and career services. Research university partnerships with industries in your field.\n\nQ: What about after graduation?\nA: Most countries offer post-study work visas ranging from 6 months to 3 years, allowing you to gain work experience and potentially transition to permanent residency.',
  'Get answers to the most common questions international students have about studying abroad, from applications to graduation.',
  'FAQs',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
  '5 min read'
);