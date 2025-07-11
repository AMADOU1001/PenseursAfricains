import { useEffect, useCallback, useRef, useState } from 'react';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const WARNING_TIMEOUT = 5 * 1000; // 5 seconds warning

export const useAutoLogout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showWarning, setShowWarning] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastRef = useRef<any>(null);

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (toastRef.current?.dismiss) {
      toastRef.current.dismiss();
      toastRef.current = null;
    }
    setShowWarning(false);
  }, []);

  const performLogout = useCallback(async () => {
    clearTimeouts();
    try {
      await signOut();
      toast({
        title: "Session expirée",
        description: "Vous avez été déconnecté pour inactivité",
        variant: "destructive"
      });
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion automatique:', error);
    }
  }, [signOut, navigate, toast, clearTimeouts]);

  const showLogoutWarning = useCallback(() => {
    setShowWarning(true);
    const { dismiss } = toast({
      title: "Session sur le point d'expirer",
      description: "Vous serez déconnecté dans 5 secondes pour inactivité",
      variant: "destructive",
      duration: WARNING_TIMEOUT
    });

    toastRef.current = { dismiss };

    // Auto logout after warning period
    warningTimeoutRef.current = setTimeout(performLogout, WARNING_TIMEOUT);
  }, [toast, performLogout]);

  const resetTimer = useCallback(() => {
    if (!user) return;
    
    clearTimeouts();
    
    // Set main timeout (5 minutes - 5 seconds for warning)
    timeoutRef.current = setTimeout(() => {
      showLogoutWarning();
    }, INACTIVITY_TIMEOUT - WARNING_TIMEOUT);
  }, [user, clearTimeouts, showLogoutWarning]);

  const handleStayConnected = useCallback(() => {
    clearTimeouts();
    resetTimer();
    toast({
      title: "Session prolongée",
      description: "Vous restez connecté"
    });
  }, [clearTimeouts, resetTimer, toast]);

  const handleActivity = useCallback(() => {
    if (user && !showWarning) {
      resetTimer();
    }
  }, [user, showWarning, resetTimer]);

  useEffect(() => {
    if (!user) {
      clearTimeouts();
      return;
    }

    // Start the timer
    resetTimer();

    // Activity events to track
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      clearTimeouts();
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [user, handleActivity, resetTimer, clearTimeouts]);

  return {
    showWarning,
    resetTimer,
    clearTimeouts,
    handleStayConnected
  };
};