-- Add RLS policies for authenticated users to manage thinkers
CREATE POLICY "Allow authenticated users to insert thinkers" 
ON public.thinkers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update thinkers" 
ON public.thinkers 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to delete thinkers" 
ON public.thinkers 
FOR DELETE 
TO authenticated
USING (true);