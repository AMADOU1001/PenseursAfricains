/**
 * Utilitaires de validation pour les formulaires et données
 * 
 * Fonctions réutilisables pour valider les données d'entrée
 * de manière cohérente dans toute l'application
 */

import { NEWSLETTER_CONFIG, UI_MESSAGES } from '../constants';

/**
 * Valide une adresse email
 * @param email - L'adresse email à valider
 * @returns true si l'email est valide, false sinon
 */
export const isValidEmail = (email: string): boolean => {
  if (!email?.trim()) return false;
  return NEWSLETTER_CONFIG.emailRegex.test(email.trim());
};

/**
 * Valide un mot de passe
 * @param password - Le mot de passe à valider
 * @param minLength - Longueur minimale requise (défaut: 8)
 * @returns true si le mot de passe est valide, false sinon
 */
export const isValidPassword = (password: string, minLength = 8): boolean => {
  return password && password.length >= minLength;
};

/**
 * Valide qu'un champ requis n'est pas vide
 * @param value - La valeur à valider
 * @returns true si la valeur n'est pas vide, false sinon
 */
export const isRequired = (value: string | number | null | undefined): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value != null;
};

/**
 * Valide une URL
 * @param url - L'URL à valider
 * @returns true si l'URL est valide, false sinon
 */
export const isValidUrl = (url: string): boolean => {
  if (!url?.trim()) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valide qu'une chaîne a une longueur minimale et maximale
 * @param value - La valeur à valider
 * @param minLength - Longueur minimale
 * @param maxLength - Longueur maximale
 * @returns true si la longueur est valide, false sinon
 */
export const isValidLength = (
  value: string, 
  minLength: number, 
  maxLength: number
): boolean => {
  if (!value) return false;
  const length = value.trim().length;
  return length >= minLength && length <= maxLength;
};

/**
 * Valide un slug URL (format kebab-case)
 * @param slug - Le slug à valider
 * @returns true si le slug est valide, false sinon
 */
export const isValidSlug = (slug: string): boolean => {
  if (!slug?.trim()) return false;
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug.trim());
};

/**
 * Valide qu'un fichier a une extension autorisée
 * @param filename - Le nom du fichier
 * @param allowedExtensions - Liste des extensions autorisées
 * @returns true si l'extension est autorisée, false sinon
 */
export const isValidFileExtension = (
  filename: string, 
  allowedExtensions: string[]
): boolean => {
  if (!filename) return false;
  const extension = filename.toLowerCase().split('.').pop();
  return extension ? allowedExtensions.includes(extension) : false;
};

/**
 * Valide la taille d'un fichier
 * @param file - Le fichier à valider
 * @param maxSize - Taille maximale en octets
 * @returns true si la taille est acceptable, false sinon
 */
export const isValidFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

/**
 * Interface pour les erreurs de validation
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Classe pour gérer les validations de formulaires
 */
export class FormValidator {
  private errors: ValidationError[] = [];

  /**
   * Ajoute une erreur de validation
   */
  addError(field: string, message: string): this {
    this.errors.push({ field, message });
    return this;
  }

  /**
   * Valide un champ requis
   */
  required(field: string, value: any, customMessage?: string): this {
    if (!isRequired(value)) {
      this.addError(field, customMessage || UI_MESSAGES.required);
    }
    return this;
  }

  /**
   * Valide un email
   */
  email(field: string, value: string, customMessage?: string): this {
    if (value && !isValidEmail(value)) {
      this.addError(field, customMessage || UI_MESSAGES.invalidEmail);
    }
    return this;
  }

  /**
   * Valide un mot de passe
   */
  password(field: string, value: string, minLength = 8, customMessage?: string): this {
    if (value && !isValidPassword(value, minLength)) {
      this.addError(field, customMessage || UI_MESSAGES.passwordMinLength);
    }
    return this;
  }

  /**
   * Valide la longueur d'une chaîne
   */
  length(
    field: string, 
    value: string, 
    minLength: number, 
    maxLength: number, 
    customMessage?: string
  ): this {
    if (value && !isValidLength(value, minLength, maxLength)) {
      this.addError(
        field, 
        customMessage || `Doit contenir entre ${minLength} et ${maxLength} caractères`
      );
    }
    return this;
  }

  /**
   * Valide une URL
   */
  url(field: string, value: string, customMessage?: string): this {
    if (value && !isValidUrl(value)) {
      this.addError(field, customMessage || 'URL invalide');
    }
    return this;
  }

  /**
   * Valide un slug
   */
  slug(field: string, value: string, customMessage?: string): this {
    if (value && !isValidSlug(value)) {
      this.addError(
        field, 
        customMessage || 'Le slug doit être en format kebab-case (ex: mon-article)'
      );
    }
    return this;
  }

  /**
   * Retourne toutes les erreurs
   */
  getErrors(): ValidationError[] {
    return this.errors;
  }

  /**
   * Vérifie s'il y a des erreurs
   */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Remet à zéro les erreurs
   */
  reset(): this {
    this.errors = [];
    return this;
  }

  /**
   * Retourne la première erreur pour un champ donné
   */
  getFieldError(field: string): string | undefined {
    const error = this.errors.find(err => err.field === field);
    return error?.message;
  }
}