-- Insert Haile Selassie coronation images into media_gallery
INSERT INTO public.media_gallery (id, title, description, type, media_url, event_date, uploaded_at) VALUES
(
  '11111111-2222-3333-4444-555555555555',
  'Haile Selassie I – Couronnement avec dignitaires',
  'Haile Selassie Ier entouré de dignitaires lors de son couronnement le 2 novembre 1930 à Addis‑Abeba.',
  'image',
  'https://rastafarijams.com/coronation-day-november-2nd-1930-haile-selassie-i/',
  '1930-11-02',
  now()
),
(
  '66667777-8888-9999-aaaa-bbbbbbbbbbbb',
  'Foule célébrant le couronnement',
  'Foule en liesse lors des célébrations du couronnement d''Haile Selassie en 1930.',
  'image',
  'https://face2faceafrica.com/article/how-ethiopia-celebrated-emperor-haile-selassies-coronation-in-1930-photos',
  '1930-11-02',
  now()
),
(
  'ccccdddd-eeee-ffff-0000-111111111111',
  'Arrivée des délégations étrangères',
  'Délégations internationales arrivant pour assister au couronnement d''Haile Selassie.',
  'image',
  'https://anglo-ethiopian.org/publications/articles.php?reference=publications/articles/2005summer/coronation.php',
  '1930-11-02',
  now()
),
(
  '22223333-4444-5555-6666-777777777777',
  'Inspection militaire impériale',
  'Haile Selassie inspectant les troupes avant/après son couronnement en 1930.',
  'image',
  'https://www.alamy.com/stock-photo-haile-selassie-at-coronation-ethiopia-by-burton-holmes-1930-177228326.html',
  '1930-11-02',
  now()
);