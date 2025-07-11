-- Supprimer toutes les données existantes de la galerie
DELETE FROM public.media_gallery;

-- Insérer les nouvelles données
INSERT INTO public.media_gallery (id, title, description, type, media_url, event_date, uploaded_at) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Thomas Sankara – Discours à l''ONU', 'Discours historique de Thomas Sankara à l''ONU, prononcé le 4 octobre 1984.', 'video', 'https://www.youtube.com/watch?v=6ihzVYMHfaQ', '1984-10-04', now()),
('0987fedc-ba65-4321-0fed-cba987654321', 'Nelson Mandela – I Am Prepared To Die (Rivonia Trial)', 'Extrait du discours de Nelson Mandela lors du procès de Rivonia, 20 avril 1964.', 'video', 'https://www.youtube.com/watch?v=0KhVzjcb5fI', '1964-04-20', now());