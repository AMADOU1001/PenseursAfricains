/**
 * Utilitaires de formatage pour l'affichage des données
 * 
 * Fonctions pour formater les dates, nombres, textes et URLs
 * de manière cohérente dans toute l'application
 */

/**
 * Formate une date en français
 * @param date - Date à formater (string ou Date)
 * @param options - Options de formatage
 * @returns Date formatée en français
 */
export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
  } catch {
    return 'Date invalide';
  }
};

/**
 * Formate une date relative (il y a X jours/mois/années)
 * @param date - Date à formater
 * @returns Date relative en français
 */
export const formatRelativeDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return 'À l\'instant';
    if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} heures`;
    if (diffInSeconds < 2592000) return `Il y a ${Math.floor(diffInSeconds / 86400)} jours`;
    if (diffInSeconds < 31536000) return `Il y a ${Math.floor(diffInSeconds / 2592000)} mois`;
    
    return `Il y a ${Math.floor(diffInSeconds / 31536000)} années`;
  } catch {
    return 'Date invalide';
  }
};

/**
 * Formate un nombre avec des séparateurs de milliers
 * @param number - Nombre à formater
 * @returns Nombre formaté avec espaces comme séparateurs
 */
export const formatNumber = (number: number | string): string => {
  try {
    const num = typeof number === 'string' ? parseFloat(number) : number;
    return new Intl.NumberFormat('fr-FR').format(num);
  } catch {
    return '0';
  }
};

/**
 * Tronque un texte à une longueur donnée
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale
 * @param suffix - Suffixe à ajouter (défaut: '...')
 * @returns Texte tronqué
 */
export const truncateText = (
  text: string, 
  maxLength: number, 
  suffix = '...'
): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Convertit un texte en slug URL
 * @param text - Texte à convertir
 * @returns Slug formaté
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-') // Supprime les tirets multiples
    .trim()
    .replace(/^-+|-+$/g, ''); // Supprime les tirets en début/fin
};

/**
 * Capitalise la première lettre de chaque mot
 * @param text - Texte à capitaliser
 * @returns Texte avec première lettre de chaque mot en majuscule
 */
export const capitalizeWords = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Capitalise seulement la première lettre du texte
 * @param text - Texte à capitaliser
 * @returns Texte avec première lettre en majuscule
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formate une période (ex: "1920-1980" ou "1920-présent")
 * @param birthYear - Année de naissance
 * @param deathYear - Année de décès (optionnel)
 * @returns Période formatée
 */
export const formatPeriod = (
  birthYear?: number | null, 
  deathYear?: number | null
): string => {
  if (!birthYear) return 'Période inconnue';
  
  const birth = birthYear.toString();
  const death = deathYear ? deathYear.toString() : 'présent';
  
  return `${birth} - ${death}`;
};

/**
 * Formate la taille d'un fichier en unités lisibles
 * @param bytes - Taille en octets
 * @returns Taille formatée (ex: "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Extrait l'ID d'une vidéo YouTube depuis une URL
 * @param url - URL YouTube
 * @returns ID de la vidéo ou null si invalide
 */
export const extractYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

/**
 * Nettoie et formate un texte pour l'affichage
 * @param text - Texte à nettoyer
 * @returns Texte nettoyé
 */
export const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Remplace les espaces multiples par un seul
    .replace(/\n{3,}/g, '\n\n'); // Limite les sauts de ligne multiples
};

/**
 * Formate un nom d'auteur (Prénom NOM)
 * @param name - Nom complet
 * @returns Nom formaté
 */
export const formatAuthorName = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length < 2) return capitalizeWords(name);
  
  // Dernière partie en majuscules (nom de famille)
  const lastName = parts[parts.length - 1].toUpperCase();
  // Autres parties avec première lettre majuscule (prénoms)
  const firstNames = parts.slice(0, -1).map(part => capitalizeFirst(part));
  
  return `${firstNames.join(' ')} ${lastName}`;
};

/**
 * Valide et formate une URL
 * @param url - URL à valider et formater
 * @returns URL formatée ou null si invalide
 */
export const validateAndFormatUrl = (url: string): string | null => {
  try {
    // Ajoute https:// si aucun protocole n'est spécifié
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    // Valide l'URL
    new URL(formattedUrl);
    
    return formattedUrl;
  } catch {
    return null;
  }
};