-- Create books table for selling books
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  pdf_preview_url TEXT,
  cover_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media gallery table
CREATE TYPE public.media_type AS ENUM ('image', 'video', 'event');

CREATE TABLE public.media_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type media_type NOT NULL,
  media_url TEXT NOT NULL,
  description TEXT,
  event_date DATE,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create article categories table
CREATE TABLE public.article_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  category_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create thinker ideas table (complementary to existing thinkers)
CREATE TABLE public.thinker_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thinker_id UUID REFERENCES public.thinkers(id) ON DELETE CASCADE,
  idea TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  thinker_id UUID REFERENCES public.thinkers(id) ON DELETE CASCADE,
  CONSTRAINT check_comment_target CHECK (
    (article_id IS NOT NULL AND thinker_id IS NULL) OR
    (article_id IS NULL AND thinker_id IS NOT NULL)
  )
);

-- Enable Row Level Security on all new tables
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thinker_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create public read policies for public content
CREATE POLICY "Allow public read access to books" 
ON public.books FOR SELECT USING (available = true);

CREATE POLICY "Allow public read access to media gallery" 
ON public.media_gallery FOR SELECT USING (true);

CREATE POLICY "Allow public read access to article categories" 
ON public.article_categories FOR SELECT USING (true);

CREATE POLICY "Allow public read access to published articles" 
ON public.articles FOR SELECT USING (published = true);

CREATE POLICY "Allow public read access to published announcements" 
ON public.announcements FOR SELECT USING (published = true);

CREATE POLICY "Allow public read access to thinker ideas" 
ON public.thinker_ideas FOR SELECT USING (true);

CREATE POLICY "Allow public read access to approved comments" 
ON public.comments FOR SELECT USING (approved = true);

-- Allow anyone to insert contact messages
CREATE POLICY "Allow anyone to insert contact messages" 
ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial data
INSERT INTO public.article_categories (name) VALUES
('Histoire'),
('Philosophie'),
('Littérature'),
('Politique'),
('Culture'),
('Actualités');

INSERT INTO public.books (title, author, price, description, available) VALUES
('Antériorité des civilisations nègres', 'Cheikh Anta Diop', 25.99, 'Ouvrage fondamental sur l''histoire africaine', true),
('Nations nègres et culture', 'Cheikh Anta Diop', 29.99, 'Étude historique et anthropologique', true),
('Things Fall Apart', 'Chinua Achebe', 19.99, 'Roman classique de la littérature africaine', true);

INSERT INTO public.announcements (title, content) VALUES
('Bienvenue sur African Thinkers Network', 'Découvrez l''héritage intellectuel africain à travers notre plateforme dédiée aux grands penseurs du continent.'),
('Nouvelle section Livres', 'Explorez notre collection de livres d''auteurs africains disponibles en ligne.');