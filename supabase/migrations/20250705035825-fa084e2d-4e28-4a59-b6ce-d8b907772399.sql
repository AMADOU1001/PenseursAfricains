-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Create storage policies for media bucket
CREATE POLICY "Public Access for media bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Allow authenticated users to upload to media bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update media bucket" ON storage.objects
FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete from media bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Update thinkers table to include category field if not exists
ALTER TABLE thinkers ADD COLUMN IF NOT EXISTS category TEXT;