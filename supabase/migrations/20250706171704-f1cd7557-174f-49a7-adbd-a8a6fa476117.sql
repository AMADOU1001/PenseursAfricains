-- Supprimer toutes les politiques et les recréer avec une approche plus simple
DROP POLICY IF EXISTS "Allow anyone to read thinkers" ON public.thinkers;
DROP POLICY IF EXISTS "Allow authenticated users to insert thinkers" ON public.thinkers;
DROP POLICY IF EXISTS "Allow authenticated users to update thinkers" ON public.thinkers;
DROP POLICY IF EXISTS "Allow authenticated users to delete thinkers" ON public.thinkers;

-- Désactiver temporairement RLS pour tester
ALTER TABLE public.thinkers DISABLE ROW LEVEL SECURITY;