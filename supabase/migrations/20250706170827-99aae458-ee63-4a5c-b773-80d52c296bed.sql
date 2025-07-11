-- Supprimer toutes les politiques existantes sur storage.objects pour le bucket media
DROP POLICY IF EXISTS "Public read access to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update to media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete to media" ON storage.objects;

-- Créer des politiques très permissives pour le bucket media
CREATE POLICY "Anyone can view media files" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update media files" ON storage.objects
FOR UPDATE USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete media files" ON storage.objects
FOR DELETE USING (bucket_id = 'media');