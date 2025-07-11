
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CardThinker from '@/components/CardThinker';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import SplashCursor from '@/components/SplashCursor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { User, Search, Filter, X, ChevronDown, ChevronUp, Menu } from 'lucide-react';
import { useThinkers, useCategories } from '@/hooks/useSupabaseData';

const Thinkers = () => {
  const { thinkers, loading } = useThinkers();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 9;

  // Organiser les catégories par domaines
  const categoriesByDomain = useMemo(() => {
    const domains: Record<string, any[]> = {};
    categories.forEach(category => {
      if (!domains[category.domain]) {
        domains[category.domain] = [];
      }
      domains[category.domain].push(category);
    });
    return domains;
  }, [categories]);

  // Calculer les compteurs pour les domaines et catégories
  const domainStats = useMemo(() => {
    const stats: Record<string, { total: number; categories: Record<string, number> }> = {};
    
    Object.keys(categoriesByDomain).forEach(domain => {
      stats[domain] = { total: 0, categories: {} };
      categoriesByDomain[domain].forEach(category => {
        const count = thinkers.filter(t => t.category_name === category.name).length;
        stats[domain].categories[category.name] = count;
        stats[domain].total += count;
      });
    });
    
    return stats;
  }, [categoriesByDomain, thinkers]);

  // Filtrer les penseurs
  const filteredThinkers = useMemo(() => {
    return thinkers.filter(thinker => {
      const matchesSearch = searchTerm === '' || 
        thinker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thinker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thinker.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDomain = selectedDomain === null || thinker.category_domain === selectedDomain;
      const matchesCategory = selectedCategory === null || thinker.category_name === selectedCategory;
      
      return matchesSearch && matchesDomain && matchesCategory;
    });
  }, [thinkers, searchTerm, selectedDomain, selectedCategory]);

  // Calculer la pagination
  const totalPages = Math.ceil(filteredThinkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentThinkers = filteredThinkers.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDomain(null);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  // Toggle domain expansion
  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  // Handle filter changes
  const handleDomainSelect = (domain: string | null) => {
    setSelectedDomain(domain);
    setSelectedCategory(null);
    setCurrentPage(1);
    if (domain && !expandedDomains.includes(domain)) {
      setExpandedDomains(prev => [...prev, domain]);
    }
  };

  const handleCategorySelect = (category: string | null, domain?: string) => {
    setSelectedCategory(category);
    if (category && domain) {
      setSelectedDomain(domain);
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Handle page change with scroll to top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-atn-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#006B3F] text-white relative overflow-hidden">
        {/* Background with uploaded image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/African-thinkers-uploads/6132d720-fe84-4222-87bb-841706f9acc4.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-[#006B3F]/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center">
            <BlurText 
              text="Grands Penseurs Africains"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Découvrez les intellectuels qui ont façonné la pensée africaine et mondiale
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="flex min-h-screen">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:shadow-none lg:border-r-2 lg:border-atn-green/20`}>
          <div className="flex flex-col h-full pt-20 lg:pt-8">
            {/* Sidebar Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-atn-green">Filtres</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Search Bar in Sidebar */}
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atn-green/50"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || selectedDomain) && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="w-full mt-3 text-atn-red border-atn-red hover:bg-atn-red hover:text-white"
                  size="sm"
                >
                  <X className="mr-2 h-4 w-4" />
                  Effacer filtres
                </Button>
              )}
            </div>

            {/* Filters Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* All Categories Button */}
              <div className="mb-6">
                <Button
                  variant={selectedDomain === null && selectedCategory === null ? "default" : "outline"}
                  onClick={() => { setSelectedDomain(null); setSelectedCategory(null); setCurrentPage(1); }}
                  className={`w-full ${selectedDomain === null && selectedCategory === null ? "bg-atn-green text-white" : ""}`}
                >
                  Tous les domaines ({thinkers.length})
                </Button>
              </div>

              {/* Domain Categories */}
              <div className="space-y-3">
                {Object.entries(categoriesByDomain).map(([domain, domainCategories]) => (
                  <div key={domain} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                        selectedDomain === domain 
                          ? 'bg-atn-green text-white' 
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => toggleDomain(domain)}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{domain}</span>
                        <Badge 
                          variant="secondary" 
                          className={`${
                            selectedDomain === domain 
                              ? 'bg-white/20 text-white border-0' 
                              : 'bg-atn-green/10 text-atn-green'
                          }`}
                        >
                          {domainStats[domain]?.total || 0}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedDomain === domain && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20 p-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDomainSelect(null);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        {expandedDomains.includes(domain) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                    
                    {expandedDomains.includes(domain) && (
                      <div className="bg-white border-t border-gray-200 max-h-60 overflow-y-auto">
                        {domainCategories.map(category => (
                          <button
                            key={category.id}
                            onClick={() => handleCategorySelect(
                              selectedCategory === category.name ? null : category.name, 
                              domain
                            )}
                            disabled={domainStats[domain]?.categories[category.name] === 0}
                            className={`w-full px-6 py-2 text-left text-sm flex items-center justify-between transition-colors ${
                              selectedCategory === category.name 
                                ? "bg-atn-gold text-atn-black" 
                                : "hover:bg-gray-50 text-gray-600"
                            } ${domainStats[domain]?.categories[category.name] === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <span>{category.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                selectedCategory === category.name 
                                  ? "border-atn-black text-atn-black" 
                                  : "border-gray-300 text-gray-500"
                              }`}
                            >
                              {domainStats[domain]?.categories[category.name] || 0}
                            </Badge>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Badge variant="outline" className="w-full justify-center text-atn-green border-atn-green py-2">
                <Search className="mr-2 h-4 w-4" />
                {filteredThinkers.length} résultat{filteredThinkers.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Mobile Header with Toggle */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-16 z-20">
            <Button
              variant="outline"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center"
            >
              <Menu className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Badge variant="outline" className="text-atn-green border-atn-green">
              {filteredThinkers.length} résultat{filteredThinkers.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block bg-white/80 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-atn-green h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher un penseur..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atn-red w-96"
                />
              </div>
              {(searchTerm || selectedCategory || selectedDomain) && (
                <Badge variant="outline" className="text-atn-green border-atn-green px-3 py-2">
                  {filteredThinkers.length} résultat{filteredThinkers.length !== 1 ? 's' : ''}
                  {selectedDomain && ` dans ${selectedDomain}`}
                  {selectedCategory && ` - ${selectedCategory}`}
                </Badge>
              )}
            </div>
          </div>

          {/* Thinkers Grid */}
          <section className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-atn-green">Chargement des penseurs...</div>
                </div>
              ) : filteredThinkers.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-atn-green mb-4">Aucun penseur trouvé</div>
                  <Button onClick={clearFilters} variant="outline">
                    Afficher tous les penseurs
                  </Button>
                </div>
              ) : currentThinkers.map((thinker, index) => (
                <AnimatedSection
                  key={thinker.id}
                  animation="scale-in"
                  delay={index * 100}
                >
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <CardThinker
                      id={thinker.id}
                      name={thinker.name}
                      title={thinker.title}
                      period={thinker.period}
                      description={thinker.description}
                      imageUrl={thinker.image_url}
                      category={thinker.category_name}
                      onClick={() => {/* Navigation handled by Link in CardThinker */}}
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Pagination */}
            {filteredThinkers.length > itemsPerPage && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />
      <SplashCursor />
    </div>
  );
};

export default Thinkers;
