/**
 * Fonctions utilitaires générales pour l'application
 * 
 * Ensemble de fonctions helper réutilisables pour diverses tâches
 * communes dans l'application
 */

/**
 * Attend un délai spécifié
 * @param ms - Délai en millisecondes
 * @returns Promise qui se résout après le délai
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Génère un ID unique basé sur timestamp et random
 * @param prefix - Préfixe optionnel
 * @returns ID unique
 */
export const generateId = (prefix = ''): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
};

/**
 * Debounce une fonction pour éviter les appels répétés
 * @param func - Fonction à debouncer
 * @param wait - Délai d'attente en ms
 * @returns Fonction debouncée
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle une fonction pour limiter la fréquence d'exécution
 * @param func - Fonction à throttler
 * @param limit - Limite en ms
 * @returns Fonction throttlée
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Copie du texte dans le presse-papier
 * @param text - Texte à copier
 * @returns Promise boolean indiquant le succès
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback pour les navigateurs non-HTTPS ou anciens
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch {
    return false;
  }
};

/**
 * Mélange un tableau de façon aléatoire (algorithme Fisher-Yates)
 * @param array - Tableau à mélanger
 * @returns Nouveau tableau mélangé
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Supprime les doublons d'un tableau basé sur une propriété
 * @param array - Tableau d'objets
 * @param key - Clé pour identifier les doublons
 * @returns Tableau sans doublons
 */
export const removeDuplicates = <T, K extends keyof T>(array: T[], key: K): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

/**
 * Groupe un tableau d'objets par une propriété
 * @param array - Tableau à grouper
 * @param key - Propriété de groupement
 * @returns Objet avec les groupes
 */
export const groupBy = <T, K extends keyof T>(
  array: T[], 
  key: K
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Vérifie si une valeur est vide (null, undefined, string vide, tableau vide)
 * @param value - Valeur à vérifier
 * @returns true si la valeur est vide
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Deep clone d'un objet
 * @param obj - Objet à cloner
 * @returns Clone profond de l'objet
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

/**
 * Filtre un tableau d'objets basé sur une recherche textuelle
 * @param items - Tableau d'objets à filtrer
 * @param searchTerm - Terme de recherche
 * @param searchFields - Champs dans lesquels chercher
 * @returns Tableau filtré
 */
export const searchFilter = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerSearchTerm);
      }
      if (typeof value === 'number') {
        return value.toString().includes(lowerSearchTerm);
      }
      return false;
    })
  );
};

/**
 * Calcule la pagination
 * @param totalItems - Nombre total d'éléments
 * @param itemsPerPage - Éléments par page
 * @param currentPage - Page actuelle
 * @returns Informations de pagination
 */
export const calculatePagination = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

/**
 * Formate les paramètres d'URL pour une requête GET
 * @param params - Objet des paramètres
 * @returns String de paramètres formatée
 */
export const formatUrlParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
};

/**
 * Détecte si l'utilisateur est sur mobile
 * @returns true si mobile
 */
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

/**
 * Détecte si l'utilisateur préfère le mode sombre
 * @returns true si mode sombre préféré
 */
export const prefersDarkMode = (): boolean => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Scroll fluide vers un élément
 * @param elementId - ID de l'élément cible
 * @param offset - Offset depuis le top (défaut: 0)
 */
export const scrollToElement = (elementId: string, offset = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};