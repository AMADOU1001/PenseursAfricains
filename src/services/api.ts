
// African Thinkers Network - API Service
// Préparation pour l'intégration future des APIs

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.africanthinkersnetwork.com';

// Configuration générale pour les requêtes
const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Utilitaire pour gérer les erreurs d'API
class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Fonction générique pour les requêtes API
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...apiConfig,
      ...options,
      headers: {
        ...apiConfig.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `API Error: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or server unavailable', 500);
  }
}

// === SERVICES API PRÉPARÉS ===

// 🧑‍🎓 Service Penseurs
export const thinkersApi = {
  // Récupérer tous les penseurs
  getAll: async () => {
    return apiRequest('/thinkers');
  },

  // Récupérer un penseur par ID
  getById: async (id: string) => {
    return apiRequest(`/thinkers/${id}`);
  },

  // Rechercher des penseurs
  search: async (query: string, filters?: any) => {
    const params = new URLSearchParams({ q: query, ...filters });
    return apiRequest(`/thinkers/search?${params}`);
  },

  // Récupérer par catégorie
  getByCategory: async (category: string) => {
    return apiRequest(`/thinkers/category/${category}`);
  },
};

// 📚 Service Livres
export const booksApi = {
  getAll: async () => {
    return apiRequest('/books');
  },

  getById: async (id: string) => {
    return apiRequest(`/books/${id}`);
  },

  getFeatured: async () => {
    return apiRequest('/books/featured');
  },

  getByAuthor: async (authorId: string) => {
    return apiRequest(`/books/author/${authorId}`);
  },

  search: async (query: string) => {
    return apiRequest(`/books/search?q=${query}`);
  },
};

// 📰 Service Articles/Blog
export const articlesApi = {
  getAll: async (page = 1, limit = 10) => {
    return apiRequest(`/articles?page=${page}&limit=${limit}`);
  },

  getById: async (id: string) => {
    return apiRequest(`/articles/${id}`);
  },

  getFeatured: async () => {
    return apiRequest('/articles/featured');
  },

  getByCategory: async (category: string) => {
    return apiRequest(`/articles/category/${category}`);
  },
};

// 🖼️ Service Galerie
export const galleryApi = {
  getAll: async () => {
    return apiRequest('/gallery');
  },

  getByTheme: async (theme: string) => {
    return apiRequest(`/gallery/theme/${theme}`);
  },

  upload: async (file: File, metadata: any) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('metadata', JSON.stringify(metadata));

    return apiRequest('/gallery/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  },
};

// 📧 Service Contact
export const contactApi = {
  sendMessage: async (contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  subscribe: async (email: string) => {
    return apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// 📊 Service Statistiques
export const statsApi = {
  getGeneral: async () => {
    return apiRequest('/stats/general');
  },

  getThinkerStats: async () => {
    return apiRequest('/stats/thinkers');
  },

  getBookStats: async () => {
    return apiRequest('/stats/books');
  },
};

// === HOOKS POUR REACT QUERY (à utiliser plus tard) ===

// Exemple de hooks préparés pour React Query
export const useApiHooks = {
  // Usage: const { data, isLoading, error } = useApiHooks.useThinkers();
  useThinkers: () => ({
    queryKey: ['thinkers'],
    queryFn: thinkersApi.getAll,
  }),

  useThinker: (id: string) => ({
    queryKey: ['thinker', id],
    queryFn: () => thinkersApi.getById(id),
    enabled: !!id,
  }),

  useBooks: () => ({
    queryKey: ['books'],
    queryFn: booksApi.getAll,
  }),

  useArticles: (page = 1) => ({
    queryKey: ['articles', page],
    queryFn: () => articlesApi.getAll(page),
  }),
};

// Export par défaut de la fonction générique
export default apiRequest;

// === DONNÉES MOCK TEMPORAIRES ===
// À supprimer une fois l'API réelle connectée

export const mockData = {
  thinkers: [
    {
      id: '1',
      name: 'Cheikh Anta Diop',
      title: 'Historien et Anthropologue',
      period: '1923 - 1986',
      category: 'Histoire',
      description: 'Historien, anthropologue et physicien sénégalais, pionnier de l\'historiographie africaine.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'Wole Soyinka',
      title: 'Écrivain et Prix Nobel',
      period: '1934 - présent',
      category: 'Littérature',
      description: 'Premier écrivain africain à recevoir le prix Nobel de littérature en 1986.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      name: 'Chinua Achebe',
      title: 'Romancier et Poète',
      period: '1930 - 2013',
      category: 'Littérature',
      description: 'Auteur nigérian célèbre pour "Things Fall Apart", l\'un des romans africains les plus lus.',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f75?w=400&h=300&fit=crop',
    },
  ],

  stats: [
    { number: '250+', label: 'Penseurs', description: 'Profils documentés' },
    { number: '500+', label: 'Œuvres', description: 'Livres et textes' },
    { number: '50+', label: 'Pays', description: 'Représentés' },
    { number: '15', label: 'Siècles', description: 'D\'histoire' },
  ],

  quotes: [
    {
      quote: "L'Afrique n'a pas d'histoire, elle n'est qu'un continent de ténèbres. Cette phrase, nous devons la combattre par la science.",
      author: "Cheikh Anta Diop",
      title: "Historien sénégalais"
    },
    {
      quote: "Un tigre ne proclame pas sa tigritude, il bondit sur sa proie et la dévore.",
      author: "Wole Soyinka",
      title: "Prix Nobel de littérature"
    },
  ],
};
