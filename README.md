
# African Thinkers Network - Réseau des Penseurs Africains

## 📖 Description

Application web moderne dédiée à la valorisation de l'héritage intellectuel africain. Cette plateforme permet de découvrir les grands penseurs, intellectuels, écrivains et innovateurs africains à travers une interface intuitive et élégante.

## 🏗️ Architecture

### Structure du projet

```
src/
├── components/           # Composants réutilisables
│   ├── ui/              # Composants UI de base (shadcn/ui)
│   ├── forms/           # Composants de formulaires
│   └── layout/          # Composants de mise en page
├── hooks/               # Hooks React personnalisés
├── pages/               # Pages de l'application
│   └── admin/          # Pages d'administration
├── lib/                 # Utilitaires et configurations
├── integrations/        # Intégrations externes (Supabase)
└── assets/             # Ressources statiques
```

### Technologies utilisées

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Supabase (Base de données, Authentification, Storage)
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion + CSS Animations

## 🚀 Fonctionnalités

### Public
- 📚 Catalogue des penseurs africains avec biographies détaillées
- 📖 Bibliothèque de livres et publications
- 🖼️ Galerie média (images historiques, vidéos)
- 📰 Actualités et articles
- 🌍 Informations sur le panafricanisme
- ✉️ Newsletter et contact

### Administration
- 👥 Gestion des penseurs (CRUD)
- 📚 Gestion des livres (CRUD)
- 🖼️ Gestion de la galerie média (CRUD)
- 📰 Gestion des actualités (CRUD)
- 🔐 Authentification sécurisée

## 🎨 Design System

L'application utilise un design system cohérent basé sur les couleurs panafricaines :

- **Vert Panafricain** (#006B3F) - Couleur principale
- **Rouge Panafricain** (#C8102E) - Couleur d'accent
- **Or Panafricain** (#FCD116) - Couleur secondaire
- **Police**: Poppins (titres) + Inter (texte)

## 🛠️ Installation et développement

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone [url-du-repo]

# Installer les dépendances
npm install

# Configurer Supabase
# Créer un fichier .env.local avec vos clés Supabase

# Lancer en mode développement
npm run dev
```

### Variables d'environnement
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screen (1440px+)

## 🔒 Sécurité

- Authentification via Supabase Auth
- Row Level Security (RLS) sur toutes les tables
- Validation des données côté client et serveur
- Protection CSRF intégrée

## 📈 Performance

- Code splitting automatique avec Vite
- Lazy loading des images
- Optimisation des bundle avec tree-shaking
- Cache intelligent avec TanStack Query

## 🌐 Déploiement

L'application peut être déployée sur :
- Vercel (recommandé)
- Netlify
- Cloudflare Pages

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support, contactez : [contact@africanthinkers.network]

---

*Développé avec ❤️ pour valoriser l'héritage intellectuel africain*
