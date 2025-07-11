/**
 * Constantes de l'application African Thinkers Network
 * 
 * Centralise toutes les constantes utilisées dans l'application
 * pour faciliter la maintenance et éviter la duplication
 */

// Configuration de l'application
export const APP_CONFIG = {
  name: 'African Thinkers Network',
  shortName: 'ATN',
  description: 'Réseau des Penseurs Africains - Valorisation de l\'héritage intellectuel africain',
  url: 'https://africanthinkers.network',
  email: 'contact@africanthinkers.network',
} as const;

// Configuration de la pagination
export const PAGINATION = {
  itemsPerPage: 9,
  maxVisiblePages: 5,
} as const;

// Configuration des images
export const IMAGES = {
  logo: '/African-thinkers-uploads/8ba7e437-809e-432e-ab26-921aec653725.png',
  defaultThinker: '/African-thinkers-uploads/cac2f267-5795-48f3-983e-0efbcea45d23.png',
  heroBackground: '/African-thinkers-uploads/6132d720-fe84-4222-87bb-841706f9acc4.png',
  heroSecondary: '/African-thinkers-uploads/e68ed5a9-d4e4-42e0-a507-aa8a9deb761f.png',
} as const;

// Messages de l'interface utilisateur
export const UI_MESSAGES = {
  loading: 'Chargement...',
  noResults: 'Aucun résultat trouvé',
  error: 'Une erreur est survenue',
  success: 'Opération réussie',
  confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  required: 'Ce champ est requis',
  invalidEmail: 'Adresse email invalide',
  passwordMinLength: 'Le mot de passe doit contenir au moins 8 caractères',
} as const;

// Routes de l'application
export const ROUTES = {
  home: '/',
  thinkers: '/penseurs',
  thinkerDetail: (id: string) => `/penseurs/${id}`,
  books: '/livres',
  gallery: '/galerie',
  mediaDetail: (id: string) => `/galerie/${id}`,
  about: '/apropos',
  contact: '/contact',
  panafricanism: '/panafricanisme',
  news: '/actualites',
  articleDetail: (slug: string) => `/actualites/${slug}`,
  join: '/rejoindre',
  partnerships: '/partenariats',
  support: '/soutenir',
  legal: '/mentions-legales',
  privacy: '/confidentialite',
  cookies: '/cookies',
  login: '/login',
  admin: {
    dashboard: '/admin/dashboard',
    thinkers: '/admin/thinkers',
    books: '/admin/books',
    gallery: '/admin/gallery',
    news: '/admin/news',
  },
} as const;

// Types de média
export const MEDIA_TYPES = {
  image: 'image',
  video: 'video',
  event: 'event',
} as const;

// Formats de fichiers acceptés
export const ACCEPTED_FILE_TYPES = {
  images: 'image/*',
  documents: '.pdf,.doc,.docx',
  all: '*/*',
} as const;

// Tailles de fichiers (en octets)
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
} as const;

// Configuration des animations
export const ANIMATION_CONFIG = {
  duration: 300,
  delay: 100,
  ease: 'ease-out',
} as const;

// Configuration de React Query
export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
  retry: 3,
} as const;

// Configuration de la newsletter
export const NEWSLETTER_CONFIG = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  maxRetries: 3,
} as const;