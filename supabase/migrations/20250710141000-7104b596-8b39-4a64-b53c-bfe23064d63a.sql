-- Create categories table with domains
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  domain TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(domain, name)
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to categories" 
ON public.categories 
FOR SELECT 
USING (true);

-- Insert all categories organized by domain
INSERT INTO public.categories (domain, name) VALUES 
-- Academia & Education
('Academia & Education', 'Academicians'),
('Academia & Education', 'Teachers'),
('Academia & Education', 'Education Administrators'),
('Academia & Education', 'Curriculum Developers'),
('Academia & Education', 'Cultural Anthropologists'),
('Academia & Education', 'Researchers'),
('Academia & Education', 'Policy Analysts'),
('Academia & Education', 'Linguists'),
('Academia & Education', 'Sociologists'),

-- Science & Technology
('Science & Technology', 'Scientists'),
('Science & Technology', 'Engineers'),
('Science & Technology', 'Technologists'),
('Science & Technology', 'Computer Scientists'),
('Science & Technology', 'Mathematicians'),
('Science & Technology', 'Medical Researchers'),
('Science & Technology', 'Environmental Scientists'),
('Science & Technology', 'Mineralogists'),
('Science & Technology', 'Agronomists'),

-- Arts & Media
('Arts & Media', 'Writers'),
('Arts & Media', 'Journalists'),
('Arts & Media', 'Artists'),
('Arts & Media', 'Musicians'),
('Arts & Media', 'Filmmakers'),
('Arts & Media', 'Dancers & Performers'),
('Arts & Media', 'Art Critics'),
('Arts & Media', 'Curators & Archivists'),

-- Business & Finance
('Business & Finance', 'Entrepreneurs'),
('Business & Finance', 'Economists'),
('Business & Finance', 'Financiers'),
('Business & Finance', 'Industrialists'),
('Business & Finance', 'Accountants'),
('Business & Finance', 'Trade Experts'),
('Business & Finance', 'Marketing Specialists'),
('Business & Finance', 'Corporate Executives'),

-- Politics & Governance
('Politics & Governance', 'Pan Africanists'),
('Politics & Governance', 'Governors'),
('Politics & Governance', 'Politicians'),
('Politics & Governance', 'Diplomats'),
('Politics & Governance', 'Civil Servants'),
('Politics & Governance', 'Policy Makers'),
('Politics & Governance', 'Activists'),
('Politics & Governance', 'Leaders'),

-- Law & Military
('Law & Military', 'Lawyers'),
('Law & Military', 'Legal Scholars'),
('Law & Military', 'Military Personnel'),
('Law & Military', 'Police Officers'),
('Law & Military', 'Human Rights Advocates'),

-- Philosophy & History
('Philosophy & History', 'Philosophers'),
('Philosophy & History', 'Historians'),
('Philosophy & History', 'Cultural Historians'),
('Philosophy & History', 'Theologians'),

-- Architecture & Design
('Architecture & Design', 'Architects'),
('Architecture & Design', 'Urban Planners'),
('Architecture & Design', 'Interior Designers'),
('Architecture & Design', 'Landscape Architects'),

-- Invention & Innovation
('Invention & Innovation', 'Inventors'),
('Invention & Innovation', 'Patent Holders'),
('Invention & Innovation', 'Product Designers'),
('Invention & Innovation', 'Innovation Strategists'),

-- Athletics & Sports
('Athletics & Sports', 'Athletes'),
('Athletics & Sports', 'Coaches & Trainers'),
('Athletics & Sports', 'Sports Commentators'),
('Athletics & Sports', 'Sports Federation Officials'),

-- Public Infrastructure & Services
('Public Infrastructure & Services', 'Urban Developers'),
('Public Infrastructure & Services', 'Infrastructure Planners'),
('Public Infrastructure & Services', 'Health Workers'),
('Public Infrastructure & Services', 'Transportation Engineers'),
('Public Infrastructure & Services', 'Emergency Responders'),

-- Culture & Society
('Culture & Society', 'Chefs & Culinary Artists'),
('Culture & Society', 'Fashion Designers'),
('Culture & Society', 'Festival Organizers'),
('Culture & Society', 'Tradition Bearers'),
('Culture & Society', 'Community Leaders'),

-- Tourism & Heritage
('Tourism & Heritage', 'Tour Operators'),
('Tourism & Heritage', 'Cultural Heritage Managers'),
('Tourism & Heritage', 'Hospitality Professionals'),
('Tourism & Heritage', 'Travel Writers'),
('Tourism & Heritage', 'Local Guides'),
('Tourism & Heritage', 'Destination Planners'),

-- Real Estate & Urban Development
('Real Estate & Urban Development', 'Real Estate Developers'),
('Real Estate & Urban Development', 'Property Managers'),
('Real Estate & Urban Development', 'Housing Policy Experts'),
('Real Estate & Urban Development', 'Construction Professionals'),

-- Healthcare
('Healthcare', 'Medical Doctors'),
('Healthcare', 'Nurses & Midwives'),
('Healthcare', 'Public Health Officials'),
('Healthcare', 'Pharmacists'),
('Healthcare', 'Medical Technologists'),
('Healthcare', 'Community Health Workers'),
('Healthcare', 'Mental Health Professionals'),
('Healthcare', 'Health Policy Experts'),
('Healthcare', 'Epidemiologists'),
('Healthcare', 'Biomedical Researchers'),
('Healthcare', 'Hospital Administrators'),
('Healthcare', 'Traditional Healers'),
('Healthcare', 'Healthcare Access Advocates');

-- Add category_id reference to thinkers table
ALTER TABLE public.thinkers 
ADD COLUMN category_id UUID REFERENCES public.categories(id);

-- Create index for better performance
CREATE INDEX idx_thinkers_category_id ON public.thinkers(category_id);
CREATE INDEX idx_categories_domain ON public.categories(domain);