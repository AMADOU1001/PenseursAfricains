/**
 * Types TypeScript pour l'application African Thinkers Network
 * 
 * Définit tous les types utilisés dans l'application pour assurer
 * la cohérence et la sécurité des types
 */

// Types de base pour l'API
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Types pour les penseurs
export interface Thinker extends BaseEntity {
  name: string;
  title: string;
  description: string;
  birth_year?: number;
  death_year?: number;
  period?: string;
  country?: string;
  image_url?: string;
  category?: string;
  category_id?: string;
  category_name?: string;
  category_domain?: string;
  education?: string;
  career?: string;
  contributions_impact?: string;
  practical_impact?: string;
  vision?: string;
  works_projects_media?: any;
}

// Types pour les catégories
export interface Category extends BaseEntity {
  name: string;
  domain: string;
  description?: string;
}

// Types pour les livres
export interface Book extends BaseEntity {
  title: string;
  author: string;
  description?: string;
  cover_url?: string;
  pdf_preview_url?: string;
  available: boolean;
}

// Types pour les articles
export interface Article extends BaseEntity {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
  published_at?: string;
  featured_image_url?: string;
  category_id?: string;
}

// Types pour la galerie média
export interface MediaItem extends BaseEntity {
  title: string;
  description?: string;
  media_url: string;
  type: 'image' | 'video' | 'event';
  event_date?: string;
  uploaded_at: string;
}

// Types pour les citations
export interface Quote extends BaseEntity {
  quote: string;
  author: string;
  author_title?: string;
  thinker_id?: string;
}

// Types pour les statistiques
export interface SiteStat extends BaseEntity {
  stat_key: string;
  label: string;
  number_value: string;
  description?: string;
}

// Types pour les commentaires
export interface Comment extends BaseEntity {
  content: string;
  user_name: string;
  email: string;
  approved?: boolean;
  posted_at: string;
  article_id?: string;
  thinker_id?: string;
}

// Types pour les messages de contact
export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
  sent_at: string;
}

// Types pour la newsletter
export interface NewsletterSubscription extends BaseEntity {
  email: string;
  active: boolean;
  subscribed_at: string;
}

// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// Types pour les formulaires
export interface FormData {
  [key: string]: any;
}

export interface FormError {
  field: string;
  message: string;
}

// Types pour les réponses API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Types pour les hooks
export interface UseApiState<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Types pour l'UI
export interface FilterOptions {
  searchTerm: string;
  selectedCategory?: string;
  selectedDomain?: string;
  currentPage: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Types pour les animations
export type AnimationType = 
  | 'fade-in'
  | 'slide-in-left'
  | 'slide-in-right'
  | 'slide-in-up'
  | 'scale-in';

export interface AnimationConfig {
  animation: AnimationType;
  delay?: number;
  duration?: number;
}

// Types pour les événements
export type EventHandler<T = any> = (data: T) => void;

// Types pour le routing
export type RouteParams = {
  [key: string]: string | undefined;
};

// Types pour les uploads
export interface UploadConfig {
  allowedTypes: string[];
  maxSize: number;
  bucket: string;
  folder?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}