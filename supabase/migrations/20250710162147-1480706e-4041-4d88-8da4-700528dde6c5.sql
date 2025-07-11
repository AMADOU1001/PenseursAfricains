-- Ajouter trois nouveaux penseurs africains avec leurs données complètes
INSERT INTO public.thinkers (
    id,
    name,
    title,
    description,
    education,
    career,
    contributions_impact,
    vision,
    practical_impact,
    works_projects_media,
    country,
    birth_year,
    death_year,
    period,
    category_id,
    image_url,
    created_at,
    updated_at
) VALUES 
-- Patrice Lumumba - Leader politique/panafricaniste
(
    '298608b7-2f38-4537-a05e-55bfe6c17d7e',
    'Patrice Lumumba',
    'Premier ministre, militant indépendantiste',
    'Figure emblématique de l''indépendance congolaise, martyr du panafricanisme.',
    'École des Postes, Léopoldville',
    'Premier ministre de la République démocratique du Congo en 1960.',
    'A défendu l''unité congolaise et dénoncé l''impérialisme occidental en Afrique.',
    'Une Afrique unie, digne, libre de toute domination coloniale ou néocoloniale.',
    'Héros national du Congo et symbole de la souveraineté panafricaine.',
    '[{"title": "Discours d''indépendance (1960)", "url": "https://www.youtube.com/watch?v=8JrjX9kdGqE"}]'::jsonb,
    'République démocratique du Congo',
    1925,
    1961,
    '20th century',
    'ea213379-ee08-4f48-a913-24063bce8781', -- Panafricanistes
    'https://upload.wikimedia.org/wikipedia/commons/7/75/Patrice_Lumumba_1960.jpg',
    '2025-07-10T15:41:10Z',
    '2025-07-10T15:41:10Z'
),
-- Angélique Kidjo - Artiste/Musicienne
(
    '8f22cfc1-92f0-4747-8a22-6c9ace54e17d',
    'Angélique Kidjo',
    'Chanteuse, Activiste culturelle',
    'Artiste béninoise de renommée mondiale, militante pour les droits des femmes et l''éducation en Afrique.',
    'CIM, Paris (Jazz School)',
    'Chanteuse internationale, ambassadrice de l''UNICEF, fondatrice de Batonga Foundation.',
    'Promotrice de l''autonomisation des jeunes filles africaines à travers l''art et l''éducation.',
    'Un continent où les jeunes femmes sont des leaders culturels et sociaux.',
    'Batonga soutient l''éducation de milliers de filles en Afrique de l''Ouest.',
    '[{"title": "Official Website", "url": "https://www.angeliquekidjo.com/"}, {"title": "Batonga Foundation", "url": "https://batongafoundation.org/"}]'::jsonb,
    'Bénin',
    1960,
    null,
    '20th–21st century',
    '8208547c-775f-4936-b30f-61eca6079b98', -- Musiciens
    'https://upload.wikimedia.org/wikipedia/commons/0/00/Angélique_Kidjo_2012.jpg',
    '2025-07-10T15:41:10Z',
    '2025-07-10T15:41:10Z'
),
-- Salif Keita - Musicien/Leader communautaire
(
    'af6e0955-7fa7-44cc-89ef-9add8347dd21',
    'Salif Keita',
    'Musicien, Chanteur traditionnel',
    'Légende malienne de la musique mandingue moderne, défenseur des droits des personnes albinos.',
    'Autodidacte, formation orale traditionnelle',
    'Chanteur, fondateur du studio Moffou, ambassadeur de l''UN pour les albinos.',
    'A internationalisé la culture mandingue tout en militant pour les droits humains.',
    'Une Afrique où la musique est un vecteur de dignité et de cohésion sociale.',
    'Programme de soutien aux personnes atteintes d''albinisme au Mali et en Afrique.',
    '[{"title": "Official Site", "url": "https://salifkeita.net/"}, {"title": "UN Albinism Advocacy", "url": "https://www.un.org/en/global-issues/albinism"}]'::jsonb,
    'Mali',
    1949,
    null,
    '20th–21st century',
    '8208547c-775f-4936-b30f-61eca6079b98', -- Musiciens
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Salif_Keita.jpg',
    '2025-07-10T15:41:10Z',
    '2025-07-10T15:41:10Z'
);