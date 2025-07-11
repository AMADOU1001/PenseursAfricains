import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Erreur de déconnexion:', error);
        return { error };
      }
      // Clear local session state
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (error) {
      console.error('Erreur inattendue lors de la déconnexion:', error);
      return { error: error as any };
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
  };
};