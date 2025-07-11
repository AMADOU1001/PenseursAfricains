-- Vérifier que le bucket media existe et créer les bonnes politiques pour les images des penseurs
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;

-- Supprimer les anciennes politiques s'il y en a
DROP POLICY IF EXISTS "Public read access to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete to media" ON storage.objects;

-- Créer les politiques pour permettre l'accès public en lecture et l'upload/modification pour les utilisateurs authentifiés
CREATE POLICY "Public read access to media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

CREATE POLICY "Authenticated upload to media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated update to media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete to media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media' AND auth.role() = 'authenticated');