-- Corriger les politiques RLS pour les articles
DROP POLICY IF EXISTS "Allow authenticated users to insert articles" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated users to update articles" ON public.articles;
DROP POLICY IF EXISTS "Allow authenticated users to delete articles" ON public.articles;

-- Recréer les politiques avec les bonnes conditions
CREATE POLICY "Allow authenticated users to insert articles" 
ON public.articles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update articles" 
ON public.articles 
FOR UPDATE 
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete articles" 
ON public.articles 
FOR DELETE 
TO authenticated
USING (auth.uid() IS NOT NULL);