-- Update image URLs to use local generated images
UPDATE public.media_gallery 
SET media_url = '/src/assets/ghana-flag-girl-1957.jpg'
WHERE id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

UPDATE public.media_gallery 
SET media_url = '/src/assets/ghana-independence-crowd-1957.jpg'
WHERE id = 'cccccccc-cccc-cccc-cccc-cccccccccccc';

UPDATE public.media_gallery 
SET media_url = '/src/assets/mandela-rivonia-trial-1964.jpg'
WHERE id = 'dddddddd-dddd-dddd-dddd-dddddddddddd';

UPDATE public.media_gallery 
SET media_url = '/src/assets/mandela-leaving-court-1964.jpg'
WHERE id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';

UPDATE public.media_gallery 
SET media_url = '/src/assets/haile-selassie-coronation-1930.jpg'
WHERE id = '11111111-2222-3333-4444-555555555555';

UPDATE public.media_gallery 
SET media_url = '/src/assets/haile-selassie-crowd-1930.jpg'
WHERE id = '66667777-8888-9999-aaaa-bbbbbbbbbbbb';