-- Corriger les politiques RLS pour la table thinkers
DROP POLICY IF EXISTS "Allow authenticated users to insert thinkers" ON public.thinkers;
DROP POLICY IF EXISTS "Allow authenticated users to update thinkers" ON public.thinkers;
DROP POLICY IF EXISTS "Allow authenticated users to delete thinkers" ON public.thinkers;

-- Créer des politiques plus permissives
CREATE POLICY "Enable insert for authenticated users" ON public.thinkers
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON public.thinkers
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON public.thinkers
FOR DELETE USING (auth.role() = 'authenticated');