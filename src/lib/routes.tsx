/**
 * Configuration du routage de l'application
 * 
 * Centralise toutes les routes publiques et d'administration
 * pour faciliter la maintenance et la lisibilité
 */

import { Routes, Route } from "react-router-dom";

// Pages publiques
import Index from "@/pages/Index";
import Thinkers from "@/pages/Thinkers";
import ThinkerDetail from "@/pages/ThinkerDetail";
import Books from "@/pages/Books";
import Gallery from "@/pages/Gallery";
import MediaDetail from "@/pages/MediaDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Panafricanism from "@/pages/Panafricanism";
import News from "@/pages/News";
import ArticleDetail from "@/pages/ArticleDetail";
import Join from "@/pages/Join";
import Partnerships from "@/pages/Partnerships";
import Support from "@/pages/Support";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

// Pages d'administration
import Dashboard from "@/pages/admin/Dashboard";
import ThinkersAdmin from "@/pages/admin/ThinkersAdmin";
import BooksAdmin from "@/pages/admin/BooksAdmin";
import GalleryAdmin from "@/pages/admin/GalleryAdmin";
import NewsAdmin from "@/pages/admin/NewsAdmin";

// Composants de protection
import ProtectedRoute from "@/components/ProtectedRoute";

/**
 * Configuration des routes de l'application
 * 
 * Organisées en sections :
 * 1. Routes publiques principales
 * 2. Routes de contenu
 * 3. Routes légales
 * 4. Routes d'administration (protégées)
 * 5. Route catch-all pour 404
 */
const AppRoutes = () => (
  <Routes>
    {/* Routes publiques principales */}
    <Route path="/" element={<Index />} />
    <Route path="/penseurs" element={<Thinkers />} />
    <Route path="/penseurs/:id" element={<ThinkerDetail />} />
    <Route path="/livres" element={<Books />} />
    <Route path="/galerie" element={<Gallery />} />
    <Route path="/galerie/:id" element={<MediaDetail />} />
    
    {/* Routes de contenu */}
    <Route path="/apropos" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/panafricanisme" element={<Panafricanism />} />
    <Route path="/actualites" element={<News />} />
    <Route path="/actualites/:slug" element={<ArticleDetail />} />
    <Route path="/rejoindre" element={<Join />} />
    <Route path="/partenariats" element={<Partnerships />} />
    <Route path="/soutenir" element={<Support />} />
    
    {/* Routes légales */}
    <Route path="/mentions-legales" element={<Legal />} />
    <Route path="/confidentialite" element={<Privacy />} />
    <Route path="/cookies" element={<Cookies />} />
    
    {/* Authentification */}
    <Route path="/login" element={<Login />} />
    
    {/* Routes d'administration (protégées) */}
    <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/admin/thinkers" element={<ProtectedRoute><ThinkersAdmin /></ProtectedRoute>} />
    <Route path="/admin/books" element={<ProtectedRoute><BooksAdmin /></ProtectedRoute>} />
    <Route path="/admin/gallery" element={<ProtectedRoute><GalleryAdmin /></ProtectedRoute>} />
    <Route path="/admin/news" element={<ProtectedRoute><NewsAdmin /></ProtectedRoute>} />
    
    {/* Route catch-all pour 404 - DOIT ÊTRE EN DERNIER */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;