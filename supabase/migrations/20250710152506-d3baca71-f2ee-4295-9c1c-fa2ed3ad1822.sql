-- Insertion des 5 penseurs africains avec les bons category_id
INSERT INTO public.thinkers (
  name, title, description, education, career, contributions_impact, 
  vision, practical_impact, works_projects_media, country, birth_year, 
  death_year, period, category_id, image_url
) VALUES 
(
  'Cheikh Anta Diop',
  'Historien, Anthropologue, Physicien',
  'Penseur sénégalais révolutionnaire qui a réécrit l''histoire africaine en démontrant les racines noires des civilisations égyptiennes, pionnier d''une histoire africaine écrite par les Africains.',
  'Université de Paris (Sorbonne), Doctorat en Histoire',
  'Fondateur du laboratoire de radiocarbone IFAN. Auteur, conférencier et intellectuel panafricain engagé.',
  'Réhabilita scientifiquement la place de l''Afrique dans l''histoire universelle. Défenseur de la renaissance culturelle et scientifique africaine.',
  'Un continent africain souverain et réconcilié avec ses racines historiques et scientifiques.',
  'Ses recherches ont réorienté les programmes universitaires africains et inspiré des générations de penseurs décoloniaux.',
  '[{"title": "Nations nègres et culture (1954)", "url": "https://fr.wikipedia.org/wiki/Nations_n%C3%A8gres_et_culture"}, {"title": "Civilisation ou barbarie (1981)", "url": "https://fr.wikipedia.org/wiki/Civilisation_ou_barbarie"}]'::jsonb,
  'Sénégal',
  1923,
  1986,
  '20th century',
  '435e2c9a-426f-4f87-a7a4-2c4395cc969f', -- Historiens
  'https://upload.wikimedia.org/wikipedia/commons/9/93/Cheikh_Anta_Diop.jpg'
),
(
  'Dr. Thomas Mensah',
  'Inventeur et Ingénieur',
  'Pionnier ghanéen de la fibre optique et des nanotechnologies, détenteur de plusieurs brevets majeurs dans les télécommunications.',
  'Kwame Nkrumah University of Science and Technology; PhD, Montpellier University',
  'Ancien chercheur chez Corning Glass Works et AT&T Bell Labs; fondateur de Georgia Aerospace Systems.',
  'A contribué à l''accélération de la production de fibre optique dans le monde. Promoteur de l''industrialisation technologique de l''Afrique.',
  'Une Afrique à la pointe de l''innovation technologique autonome.',
  'Ses brevets sont à la base de la téléphonie Internet moderne; mentor de jeunes ingénieurs africains.',
  '[{"title": "The Right Stuff Comes in Black Too (2013)", "url": "https://www.amazon.com/dp/0615869277"}]'::jsonb,
  'Ghana',
  1950,
  NULL,
  '20th–21st century',
  '220c3138-f41b-4499-98fa-9de0877a30c7', -- Ingénieurs
  'https://upload.wikimedia.org/wikipedia/commons/4/4c/Thomas_Mensah.jpg'
),
(
  'Thomas Sankara',
  'Président du Burkina Faso, Révolutionnaire',
  'Leader visionnaire du Burkina Faso, incarna l''intégrité politique, l''émancipation populaire et la souveraineté panafricaine.',
  'Académie militaire d''Antsirabe (Madagascar)',
  'Capitaine de l''armée; Président du Burkina Faso de 1983 à 1987.',
  'Luttes contre la corruption, autonomisation des femmes, réforme agraire, santé publique gratuite.',
  'Un continent africain libéré de la dépendance économique et politique étrangère.',
  'Inspirateur de mouvements panafricains, figure centrale de la jeunesse militante en Afrique.',
  '[{"title": "Discours à l''ONU (1984)", "url": "https://www.youtube.com/watch?v=GKeM2fjG0Zg"}, {"title": "Biographie Sankara par Ludo Martens", "url": "https://www.editions-proletariennes.fr/Dochml/Bios/Sankara.htm"}]'::jsonb,
  'Burkina Faso',
  1949,
  1987,
  '20th century',
  '6b9b4280-234d-4a14-876b-ed0c7fddc706', -- Leaders
  'https://upload.wikimedia.org/wikipedia/commons/b/bd/Thomas_Sankara_1986.jpg'
),
(
  'Tsitsi Dangarembga',
  'Romancière, Réalisatrice',
  'Intellectuelle et artiste zimbabwéenne reconnue pour ses œuvres dénonçant les structures postcoloniales et patriarcales.',
  'University of Cambridge; University of Zimbabwe; German Film and Television Academy, Berlin',
  'Auteure du roman acclamé Nervous Conditions; réalisatrice de films engagés.',
  'Première romancière noire du Zimbabwe traduite mondialement. Porteuse d''une voix littéraire féministe panafricaine.',
  'Libérer les consciences africaines à travers les récits authentiques des femmes africaines.',
  'Ses œuvres sont étudiées dans de nombreuses universités africaines et internationales.',
  '[{"title": "Nervous Conditions (1988)", "url": "https://en.wikipedia.org/wiki/Nervous_Conditions"}, {"title": "This Mournable Body (2018)", "url": "https://www.graywolfpress.org/books/mournable-body"}]'::jsonb,
  'Zimbabwe',
  1959,
  NULL,
  '20th–21st century',
  '21dbaeba-d2be-427a-a078-c0024e0032dd', -- Écrivains
  'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tsitsi_Dangarembga.jpg'
),
(
  'Wangari Maathai',
  'Professeure, Écologiste',
  'Première femme africaine à recevoir le prix Nobel de la paix pour son engagement en faveur de l''environnement, des droits des femmes et de la démocratie.',
  'Mount St. Scholastica College; University of Pittsburgh; PhD, University of Nairobi',
  'Fondatrice du mouvement Green Belt; professeure d''anatomie vétérinaire.',
  'A planté plus de 50 millions d''arbres, inspirant les mouvements écologiques en Afrique.',
  'Construire une Afrique verte, résiliente et féministe, libérée de la prédation environnementale.',
  'Le Kenya et d''autres pays africains ont adopté des politiques inspirées de son modèle.',
  '[{"title": "Unbowed (2006)", "url": "https://www.penguinrandomhouse.com/books/110881/unbowed-by-wangari-maathai/"}, {"title": "The Green Belt Movement", "url": "http://www.greenbeltmovement.org/"}]'::jsonb,
  'Kenya',
  1940,
  2011,
  '20th–21st century',
  'a7b09dbe-bc99-4fbf-b00a-47f2c9b2eed6', -- Scientifiques Environnementaux
  'https://upload.wikimedia.org/wikipedia/commons/0/0f/Wangari_Maathai_in_Washington_D.C._(2006).jpg'
);