-- Add detailed fields to thinkers table for comprehensive profiles
ALTER TABLE public.thinkers 
ADD COLUMN education TEXT,
ADD COLUMN career TEXT,
ADD COLUMN contributions_impact TEXT,
ADD COLUMN vision TEXT,
ADD COLUMN practical_impact TEXT,
ADD COLUMN works_projects_media JSONB,
ADD COLUMN country TEXT,
ADD COLUMN birth_year INTEGER,
ADD COLUMN death_year INTEGER;