
import React, { useState, useEffect } from 'react';
import { Menu, BookOpen, Home, User, Mail, Book, Images, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Penseurs', href: '/penseurs', icon: User },
    { name: 'Livres', href: '/livres', icon: Book },
    { name: 'Galerie', href: '/galerie', icon: Images },
    { name: 'À propos', href: '/apropos', icon: BookOpen },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const dropdownMenus = {
    ressources: [
      { name: 'Panafricanisme', href: '/panafricanisme' },
      { name: 'Actualités', href: '/actualites' },
    ],
    mission: [
      { name: 'Rejoindre le réseau', href: '/rejoindre' },
      { name: 'Partenariats', href: '/partenariats' },
      { name: 'Soutenir le projet', href: '/soutenir' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Confidentialité', href: '/confidentialite' },
      { name: 'Cookies', href: '/cookies' },
    ]
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/African-thinkers-uploads/8ba7e437-809e-432e-ab26-921aec653725.png"
                alt="African Thinkers Network Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="hidden md:block">
                <h1 className={`text-xl font-poppins font-bold ${
                  isScrolled ? 'text-atn-green' : 'text-white'
                }`}>
                  African Thinkers
                </h1>
                <p className="text-xs text-atn-gold font-medium">Network</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                   className={`font-medium text-sm relative group transition-colors duration-200 ${
                     isActive(item.href) 
                       ? 'text-atn-red' 
                       : isScrolled 
                         ? 'text-[#006B3F] hover:text-atn-red'
                         : 'text-white hover:text-atn-red'
                   }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-atn-red transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
              
              {/* Dropdown Menus */}
              <DropdownMenu>
                <DropdownMenuTrigger className={`font-medium text-sm flex items-center space-x-1 transition-colors duration-200 ${
                  isScrolled ? 'text-[#006B3F] hover:text-atn-red' : 'text-white hover:text-atn-red'
                }`}>
                  <span>Ressources</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border shadow-lg">
                  {dropdownMenus.ressources.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="text-atn-green hover:text-atn-red cursor-pointer">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className={`font-medium text-sm flex items-center space-x-1 transition-colors duration-200 ${
                  isScrolled ? 'text-[#006B3F] hover:text-atn-red' : 'text-white hover:text-atn-red'
                }`}>
                  <span>Mission</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border shadow-lg">
                  {dropdownMenus.mission.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="text-atn-green hover:text-atn-red cursor-pointer">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className={`font-medium text-sm flex items-center space-x-1 transition-colors duration-200 ${
                  isScrolled ? 'text-[#006B3F] hover:text-atn-red' : 'text-white hover:text-atn-red'
                }`}>
                  <span>Légal</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border shadow-lg">
                  {dropdownMenus.legal.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="text-atn-green hover:text-atn-red cursor-pointer">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>



          {/*
  Admin Link Desktop
  <div className="hidden md:flex items-center">
    <Link
      to="/admin"
      className={`text-xs transition-colors duration-200 ${
        isActive('/admin') 
          ? 'text-atn-red' 
          : isScrolled 
            ? 'text-[#006B3F] hover:text-atn-red'
            : 'text-white/80 hover:text-atn-red'
      }`}
    >
      Admin
    </Link>
  </div>
*/}


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`hover:text-atn-red transition-colors duration-200 p-2 ${
                isScrolled ? 'text-[#006B3F]' : 'text-white'
              }`}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-xl animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="space-y-2">
              {/* Main Navigation */}
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                     className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 font-medium ${
                       isActive(item.href)
                         ? 'text-atn-red bg-atn-red/10'
                         : 'text-atn-green hover:text-atn-red hover:bg-atn-red/5'
                     }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Ressources Section */}
              <div className="pt-2 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-atn-green/70 px-3 py-2 uppercase tracking-wide">Ressources</h4>
                {dropdownMenus.ressources.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200 font-medium text-atn-green hover:text-atn-red hover:bg-atn-red/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mission Section */}
              <div className="pt-2 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-atn-green/70 px-3 py-2 uppercase tracking-wide">Mission</h4>
                {dropdownMenus.mission.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200 font-medium text-atn-green hover:text-atn-red hover:bg-atn-red/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Legal Section */}
              <div className="pt-2 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-atn-green/70 px-3 py-2 uppercase tracking-wide">Légal</h4>
                {dropdownMenus.legal.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200 font-medium text-atn-green hover:text-atn-red hover:bg-atn-red/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Admin */}
              <div className="pt-2 border-t border-gray-200">
                <Link
                  to="/admin"
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 font-medium text-sm ${
                    isActive('/admin')
                      ? 'text-atn-red bg-atn-red/10'
                      : 'text-atn-green hover:text-atn-red hover:bg-atn-red/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Administration</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
