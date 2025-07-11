/**
 * African Thinkers Network - Point d'entrée principal
 * 
 * Initialise l'application React dans le DOM
 * Charge les styles globaux et le design system
 */

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import './index.css';

// Récupération de l'élément root avec vérification de sécurité
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Please check your index.html file.');
}

// Initialisation de l'application avec StrictMode pour un meilleur debugging
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
