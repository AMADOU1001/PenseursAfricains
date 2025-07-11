-- Create table for African thinkers
CREATE TABLE public.thinkers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  period TEXT,
  category TEXT,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for quotes
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  author_title TEXT,
  thinker_id UUID REFERENCES public.thinkers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for site statistics
CREATE TABLE public.site_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT NOT NULL UNIQUE,
  number_value TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.thinkers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required for viewing)
CREATE POLICY "Allow public read access to thinkers" 
ON public.thinkers 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to quotes" 
ON public.quotes 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to site stats" 
ON public.site_stats 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_thinkers_updated_at
  BEFORE UPDATE ON public.thinkers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.thinkers (name, title, period, category, description, image_url) VALUES
('Cheikh Anta Diop', 'Historien et Anthropologue', '1923 - 1986', 'Histoire', 'Historien, anthropologue et physicien sénégalais, pionnier de l''historiographie africaine.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'),
('Wole Soyinka', 'Écrivain et Prix Nobel', '1934 - présent', 'Littérature', 'Premier écrivain africain à recevoir le prix Nobel de littérature en 1986.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop'),
('Chinua Achebe', 'Romancier et Poète', '1930 - 2013', 'Littérature', 'Auteur nigérian célèbre pour "Things Fall Apart", l''un des romans africains les plus lus.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f75?w=400&h=300&fit=crop');

INSERT INTO public.quotes (quote, author, author_title) VALUES
('L''Afrique n''a pas d''histoire, elle n''est qu''un continent de ténèbres. Cette phrase, nous devons la combattre par la science.', 'Cheikh Anta Diop', 'Historien sénégalais'),
('Un tigre ne proclame pas sa tigritude, il bondit sur sa proie et la dévore.', 'Wole Soyinka', 'Prix Nobel de littérature');

INSERT INTO public.site_stats (stat_key, number_value, label, description) VALUES
('thinkers_count', '250+', 'Penseurs', 'Profils documentés'),
('works_count', '500+', 'Œuvres', 'Livres et textes'),
('countries_count', '50+', 'Pays', 'Représentés'),
('centuries_count', '15', 'Siècles', 'D''histoire');