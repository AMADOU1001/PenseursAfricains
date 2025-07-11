-- Traduire tous les domaines et catégories en français
UPDATE public.categories SET 
  domain = 'Académie et Éducation',
  name = CASE 
    WHEN name = 'Academicians' THEN 'Académiciens'
    WHEN name = 'Teachers' THEN 'Enseignants'
    WHEN name = 'Education Administrators' THEN 'Administrateurs Éducatifs'
    WHEN name = 'Curriculum Developers' THEN 'Développeurs de Programmes'
    WHEN name = 'Cultural Anthropologists' THEN 'Anthropologues Culturels'
    WHEN name = 'Researchers' THEN 'Chercheurs'
    WHEN name = 'Policy Analysts' THEN 'Analystes Politiques'
    WHEN name = 'Linguists' THEN 'Linguistes'
    WHEN name = 'Sociologists' THEN 'Sociologues'
    ELSE name
  END
WHERE domain = 'Academia & Education';

UPDATE public.categories SET 
  domain = 'Sciences et Technologie',
  name = CASE 
    WHEN name = 'Scientists' THEN 'Scientifiques'
    WHEN name = 'Engineers' THEN 'Ingénieurs'
    WHEN name = 'Technologists' THEN 'Technologues'
    WHEN name = 'Computer Scientists' THEN 'Informaticiens'
    WHEN name = 'Mathematicians' THEN 'Mathématiciens'
    WHEN name = 'Medical Researchers' THEN 'Chercheurs Médicaux'
    WHEN name = 'Environmental Scientists' THEN 'Scientifiques Environnementaux'
    WHEN name = 'Mineralogists' THEN 'Minéralogistes'
    WHEN name = 'Agronomists' THEN 'Agronomes'
    ELSE name
  END
WHERE domain = 'Science & Technology';

UPDATE public.categories SET 
  domain = 'Arts et Médias',
  name = CASE 
    WHEN name = 'Writers' THEN 'Écrivains'
    WHEN name = 'Journalists' THEN 'Journalistes'
    WHEN name = 'Artists' THEN 'Artistes'
    WHEN name = 'Musicians' THEN 'Musiciens'
    WHEN name = 'Filmmakers' THEN 'Cinéastes'
    WHEN name = 'Dancers & Performers' THEN 'Danseurs et Artistes'
    WHEN name = 'Art Critics' THEN 'Critiques d''Art'
    WHEN name = 'Curators & Archivists' THEN 'Conservateurs et Archivistes'
    ELSE name
  END
WHERE domain = 'Arts & Media';

UPDATE public.categories SET 
  domain = 'Affaires et Finance',
  name = CASE 
    WHEN name = 'Entrepreneurs' THEN 'Entrepreneurs'
    WHEN name = 'Economists' THEN 'Économistes'
    WHEN name = 'Financiers' THEN 'Financiers'
    WHEN name = 'Industrialists' THEN 'Industriels'
    WHEN name = 'Accountants' THEN 'Comptables'
    WHEN name = 'Trade Experts' THEN 'Experts Commerciaux'
    WHEN name = 'Marketing Specialists' THEN 'Spécialistes Marketing'
    WHEN name = 'Corporate Executives' THEN 'Dirigeants d''Entreprise'
    ELSE name
  END
WHERE domain = 'Business & Finance';

UPDATE public.categories SET 
  domain = 'Politique et Gouvernance',
  name = CASE 
    WHEN name = 'Pan Africanists' THEN 'Panafricanistes'
    WHEN name = 'Governors' THEN 'Gouverneurs'
    WHEN name = 'Politicians' THEN 'Politiciens'
    WHEN name = 'Diplomats' THEN 'Diplomates'
    WHEN name = 'Civil Servants' THEN 'Fonctionnaires'
    WHEN name = 'Policy Makers' THEN 'Décideurs Politiques'
    WHEN name = 'Activists' THEN 'Activistes'
    WHEN name = 'Leaders' THEN 'Leaders'
    ELSE name
  END
WHERE domain = 'Politics & Governance';

UPDATE public.categories SET 
  domain = 'Droit et Militaire',
  name = CASE 
    WHEN name = 'Lawyers' THEN 'Avocats'
    WHEN name = 'Legal Scholars' THEN 'Juristes'
    WHEN name = 'Military Personnel' THEN 'Personnel Militaire'
    WHEN name = 'Police Officers' THEN 'Officiers de Police'
    WHEN name = 'Human Rights Advocates' THEN 'Défenseurs des Droits Humains'
    ELSE name
  END
WHERE domain = 'Law & Military';

UPDATE public.categories SET 
  domain = 'Philosophie et Histoire',
  name = CASE 
    WHEN name = 'Philosophers' THEN 'Philosophes'
    WHEN name = 'Historians' THEN 'Historiens'
    WHEN name = 'Cultural Historians' THEN 'Historiens Culturels'
    WHEN name = 'Theologians' THEN 'Théologiens'
    ELSE name
  END
WHERE domain = 'Philosophy & History';

UPDATE public.categories SET 
  domain = 'Architecture et Design',
  name = CASE 
    WHEN name = 'Architects' THEN 'Architectes'
    WHEN name = 'Urban Planners' THEN 'Urbanistes'
    WHEN name = 'Interior Designers' THEN 'Architectes d''Intérieur'
    WHEN name = 'Landscape Architects' THEN 'Architectes Paysagistes'
    ELSE name
  END
WHERE domain = 'Architecture & Design';

UPDATE public.categories SET 
  domain = 'Invention et Innovation',
  name = CASE 
    WHEN name = 'Inventors' THEN 'Inventeurs'
    WHEN name = 'Patent Holders' THEN 'Détenteurs de Brevets'
    WHEN name = 'Product Designers' THEN 'Designers de Produits'
    WHEN name = 'Innovation Strategists' THEN 'Stratèges en Innovation'
    ELSE name
  END
WHERE domain = 'Invention & Innovation';

UPDATE public.categories SET 
  domain = 'Athlétisme et Sports',
  name = CASE 
    WHEN name = 'Athletes' THEN 'Athlètes'
    WHEN name = 'Coaches & Trainers' THEN 'Entraîneurs'
    WHEN name = 'Sports Commentators' THEN 'Commentateurs Sportifs'
    WHEN name = 'Sports Federation Officials' THEN 'Officiels de Fédérations Sportives'
    ELSE name
  END
WHERE domain = 'Athletics & Sports';

UPDATE public.categories SET 
  domain = 'Infrastructure et Services Publics',
  name = CASE 
    WHEN name = 'Urban Developers' THEN 'Développeurs Urbains'
    WHEN name = 'Infrastructure Planners' THEN 'Planificateurs d''Infrastructure'
    WHEN name = 'Health Workers' THEN 'Travailleurs de la Santé'
    WHEN name = 'Transportation Engineers' THEN 'Ingénieurs de Transport'
    WHEN name = 'Emergency Responders' THEN 'Intervenants d''Urgence'
    ELSE name
  END
WHERE domain = 'Public Infrastructure & Services';

UPDATE public.categories SET 
  domain = 'Culture et Société',
  name = CASE 
    WHEN name = 'Chefs & Culinary Artists' THEN 'Chefs et Artistes Culinaires'
    WHEN name = 'Fashion Designers' THEN 'Stylistes'
    WHEN name = 'Festival Organizers' THEN 'Organisateurs de Festivals'
    WHEN name = 'Tradition Bearers' THEN 'Gardiens des Traditions'
    WHEN name = 'Community Leaders' THEN 'Leaders Communautaires'
    ELSE name
  END
WHERE domain = 'Culture & Society';

UPDATE public.categories SET 
  domain = 'Tourisme et Patrimoine',
  name = CASE 
    WHEN name = 'Tour Operators' THEN 'Tour-opérateurs'
    WHEN name = 'Cultural Heritage Managers' THEN 'Gestionnaires du Patrimoine Culturel'
    WHEN name = 'Hospitality Professionals' THEN 'Professionnels de l''Hôtellerie'
    WHEN name = 'Travel Writers' THEN 'Rédacteurs de Voyage'
    WHEN name = 'Local Guides' THEN 'Guides Locaux'
    WHEN name = 'Destination Planners' THEN 'Planificateurs de Destinations'
    ELSE name
  END
WHERE domain = 'Tourism & Heritage';

UPDATE public.categories SET 
  domain = 'Immobilier et Développement Urbain',
  name = CASE 
    WHEN name = 'Real Estate Developers' THEN 'Promoteurs Immobiliers'
    WHEN name = 'Property Managers' THEN 'Gestionnaires Immobiliers'
    WHEN name = 'Housing Policy Experts' THEN 'Experts en Politique du Logement'
    WHEN name = 'Construction Professionals' THEN 'Professionnels de la Construction'
    ELSE name
  END
WHERE domain = 'Real Estate & Urban Development';

UPDATE public.categories SET 
  domain = 'Santé',
  name = CASE 
    WHEN name = 'Medical Doctors' THEN 'Médecins'
    WHEN name = 'Nurses & Midwives' THEN 'Infirmiers et Sages-femmes'
    WHEN name = 'Public Health Officials' THEN 'Responsables de Santé Publique'
    WHEN name = 'Pharmacists' THEN 'Pharmaciens'
    WHEN name = 'Medical Technologists' THEN 'Technologues Médicaux'
    WHEN name = 'Community Health Workers' THEN 'Agents de Santé Communautaire'
    WHEN name = 'Mental Health Professionals' THEN 'Professionnels de Santé Mentale'
    WHEN name = 'Health Policy Experts' THEN 'Experts en Politique de Santé'
    WHEN name = 'Epidemiologists' THEN 'Épidémiologistes'
    WHEN name = 'Biomedical Researchers' THEN 'Chercheurs Biomédicaux'
    WHEN name = 'Hospital Administrators' THEN 'Administrateurs Hospitaliers'
    WHEN name = 'Traditional Healers' THEN 'Guérisseurs Traditionnels'
    WHEN name = 'Healthcare Access Advocates' THEN 'Défenseurs de l''Accès aux Soins'
    ELSE name
  END
WHERE domain = 'Healthcare';