
/**
 * African Thinkers Network - Application principale
 * 
 * Point d'entrée de l'application qui configure :
 * - Le routage avec React Router
 * - Les providers globaux (Query Client, Tooltips, Toasts)
 * - La gestion de l'état global
 * 
 * @author African Thinkers Network Team
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Composants de routage
import AppRoutes from "./lib/routes";
import ScrollToTop from "./components/ScrollToTop";

/**
 * Configuration du client React Query
 * - Retry: 3 tentatives en cas d'échec
 * - StaleTime: 5 minutes avant considérer les données comme obsolètes
 * - CacheTime: 10 minutes de cache
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

/**
 * Composant racine de l'application
 * Encapsule tous les providers nécessaires et le routage
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
