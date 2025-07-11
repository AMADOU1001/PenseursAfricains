-- Ajouter les politiques RLS pour permettre aux utilisateurs authentifiés de gérer les articles
CREATE POLICY "Allow authenticated users to insert articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update articles" 
ON public.articles 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete articles" 
ON public.articles 
FOR DELETE 
USING (auth.uid() IS NOT NULL);