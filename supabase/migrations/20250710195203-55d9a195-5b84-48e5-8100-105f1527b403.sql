-- Insert additional gallery videos into media_gallery
INSERT INTO public.media_gallery (id, title, description, type, media_url, event_date, uploaded_at) VALUES
(
  '55555555-5555-5555-5555-555555555555',
  'Amílcar Cabral – The Cancer of Betrayal',
  'Discours poignant d''Amílcar Cabral après la mort de Kwame Nkrumah.',
  'video',
  'https://www.youtube.com/watch?v=rLo3Y2IG-iY',
  null,
  now()
),
(
  '66666666-6666-6666-6666-666666666666',
  'Amílcar Cabral – National Liberation and Culture (Cuba, 1970)',
  'Analyse de la culture et de la libération nationale, prononcée à Cuba en 1970.',
  'video',
  'https://www.youtube.com/watch?v=w1w3nYuASKA',
  '1970-02-01',
  now()
),
(
  '77777777-7777-7777-7777-777777777777',
  'Amílcar Cabral – Press Conference (1972)',
  'Conférence de presse du 19 octobre 1972 en tant que leader du PAIGC.',
  'video',
  'https://www.youtube.com/watch?v=Zivnqmj3MAY',
  '1972-10-19',
  now()
),
(
  '88888888-8888-8888-8888-888888888888',
  'Léopold Sédar Senghor – ONU (31 octobre 1961)',
  'Discours de Senghor à la 16e session de l''Assemblée générale de l''ONU.',
  'video',
  'https://www.youtube.com/watch?v=n-oDPlN-tDk',
  '1961-10-31',
  now()
),
(
  '99999999-9999-9999-9999-999999999999',
  'Senghor – Pensée pour la démocratie',
  'Réflexion de Senghor sur la démocratie africaine lors d''un colloque en 1963.',
  'video',
  'https://www.youtube.com/watch?v=rYM19TdnGvs',
  '1963-01-02',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Oba Ewuare & Senghor – Culture en Afrique',
  'Vidéo culturelle explorant l''histoire du Bénin et de Senghor.',
  'video',
  'https://www.youtube.com/watch?v=O-sYs32_K4k',
  null,
  now()
);