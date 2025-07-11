-- Vérifier et corriger complètement les politiques RLS pour thinkers
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.thinkers;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.thinkers;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.thinkers;
DROP POLICY IF EXISTS "Allow public read access to thinkers" ON public.thinkers;

-- Créer les bonnes politiques avec auth.uid()
CREATE POLICY "Allow anyone to read thinkers" ON public.thinkers
FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert thinkers" ON public.thinkers
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update thinkers" ON public.thinkers
FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete thinkers" ON public.thinkers
FOR DELETE USING (auth.uid() IS NOT NULL);