
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, User } from 'lucide-react';
import { useNewsletter } from '@/hooks/useNewsletter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const { subscribe, loading } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email);
    if (result.success) {
      setEmail('');
    }
  };

  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Accueil', href: '/' },
        { name: 'Penseurs', href: '/penseurs' },
        { name: 'Livres', href: '/livres' },
        { name: 'À propos', href: '/apropos' },
      ]
    },
    {
      title: 'Ressources',
      links: [
        { name: 'Galerie', href: '/galerie' },
        { name: 'Panafricanisme', href: '/panafricanisme' },
        { name: 'Actualités', href: '/actualites' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Mission',
      links: [
        { name: 'Notre vision', href: '/apropos#vision' },
        { name: 'Rejoindre le réseau', href: '/rejoindre' },
        { name: 'Partenariats', href: '/partenariats' },
        { name: 'Soutenir le projet', href: '/soutenir' },
      ]
    }
  ];

  return (
    <footer className="bg-atn-green text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src="/African-thinkers-uploads/8ba7e437-809e-432e-ab26-921aec653725.png"
              alt="African Thinkers Network Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-poppins font-bold">African Thinkers Network</h3>
              <p className="text-atn-gold font-medium">Réseau des Penseurs Africains</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
            Valoriser et promouvoir l'héritage intellectuel africain à travers les âges. 
            Connecter les penseurs d'hier et d'aujourd'hui pour construire l'Afrique de demain.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-poppins font-semibold mb-4 text-atn-gold">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4 text-atn-gold">
              Newsletter
            </h4>
            <p className="text-gray-300 mb-4 text-sm">
              Recevez nos dernières actualités et découvertes
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                required
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-atn-gold hover:bg-atn-gold-dark text-atn-black px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="h-4 w-4" />
                <span>{loading ? 'Inscription...' : 'S\'inscrire'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} African Thinkers Network. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <Link to="/mentions-legales" className="hover:text-white transition-colors duration-200">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors duration-200">
                Confidentialité
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
