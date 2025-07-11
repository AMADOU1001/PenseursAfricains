/**
 * Hook personnalisé pour gérer l'inscription à la newsletter
 * 
 * Gère l'inscription des utilisateurs à la newsletter via Supabase Edge Functions
 * Inclut la validation, la gestion d'erreurs et les notifications utilisateur
 */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsletterResponse {
  success: boolean;
  message?: string;
}

/**
 * Hook pour l'inscription à la newsletter
 * @returns {Object} - Object contenant loading state et fonction subscribe
 */
export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Inscrit un utilisateur à la newsletter
   * @param email - Adresse email à inscrire
   * @returns Promise<NewsletterResponse> - Résultat de l'inscription
   */
  const subscribe = async (email: string): Promise<NewsletterResponse> => {
    // Validation de l'email
    if (!email?.trim()) {
      toast.error('Veuillez entrer une adresse email valide');
      return { success: false };
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Format d\'email invalide');
      return { success: false };
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email: email.trim().toLowerCase() }
      });

      if (error) {
        toast.error('Erreur lors de l\'inscription à la newsletter');
        return { success: false };
      }

      if (data?.error) {
        toast.error(data.error);
        return { success: false };
      }

      const message = data?.message || 'Inscription réussie ! Un email de bienvenue vous a été envoyé.';
      toast.success(message);
      
      return { success: true, message };
    } catch (error) {
      toast.error('Erreur de connexion. Veuillez réessayer.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading };
};