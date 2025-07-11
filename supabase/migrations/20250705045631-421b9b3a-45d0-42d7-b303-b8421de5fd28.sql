-- Add RLS policies for authenticated users to manage books
CREATE POLICY "Allow authenticated users to insert books" 
ON public.books 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update books" 
ON public.books 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated users to delete books" 
ON public.books 
FOR DELETE 
TO authenticated 
USING (true);

-- Also add policies for media gallery management
CREATE POLICY "Allow authenticated users to insert media" 
ON public.media_gallery 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update media" 
ON public.media_gallery 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated users to delete media" 
ON public.media_gallery 
FOR DELETE 
TO authenticated 
USING (true);