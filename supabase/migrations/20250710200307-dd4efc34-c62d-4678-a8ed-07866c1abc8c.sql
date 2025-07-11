-- Update remaining image URLs to use local generated images
UPDATE public.media_gallery 
SET media_url = '/src/assets/haile-selassie-delegations-1930.jpg'
WHERE id = 'ccccdddd-eeee-ffff-0000-111111111111';

UPDATE public.media_gallery 
SET media_url = '/src/assets/haile-selassie-military-1930.jpg'
WHERE id = '22223333-4444-5555-6666-777777777777';