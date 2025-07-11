-- Corriger les politiques RLS pour l'upload d'images
DROP POLICY IF EXISTS "Authenticated upload to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete to media" ON storage.objects;

-- Créer les bonnes politiques avec auth.uid() au lieu de auth.role()
CREATE POLICY "Authenticated upload to media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated update to media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated delete to media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media' AND auth.uid() IS NOT NULL);