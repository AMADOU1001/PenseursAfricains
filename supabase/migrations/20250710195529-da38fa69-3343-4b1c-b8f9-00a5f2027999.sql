-- Insert gallery images into media_gallery
INSERT INTO public.media_gallery (id, title, description, type, media_url, event_date, uploaded_at) VALUES
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'Jeune fille brandissant le drapeau du Ghana',
  'Scène d''une jeune Palestinienne brandissant le drapeau du Ghana lors des célébrations de l''indépendance en 1957.',
  'image',
  'https://samepassage.org/ghana-independence-1957/',
  '1957-03-06',
  now()
),
(
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'Foule lors de l''indépendance du Ghana',
  'Masse de citoyens réunis autour de la célébration de l''indépendance, 6 mars 1957.',
  'image',
  'https://thoughtco.com/brief-history-of-ghana-3996070',
  '1957-03-06',
  now()
),
(
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'Nelson Mandela – Discours ''I Am Prepared To Die''',
  'Photo de Nelson Mandela prononçant son discours historique lors du procès de Rivonia, 20 avril 1964.',
  'image',
  'https://www.aljazeera.com/features/2024/4/20/i-am-prepared-to-die-when-mandela-shook-apartheid-changed-south-africa',
  '1964-04-20',
  now()
),
(
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  'Mandela et co-accusés quittant la cour',
  'Photo des prisonniers quittant le Palais de Justice après leur condamnation à la prison à vie, 16 juin 1964.',
  'image',
  'https://www.theguardian.com/artanddesign/picture/2013/dec/06/nelsonmandela-photography',
  '1964-06-16',
  now()
);