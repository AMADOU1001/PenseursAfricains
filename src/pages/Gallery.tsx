import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';

// Import historical images
import ghanaFlagGirl from '@/assets/ghana-flag-girl-1957.jpg';
import ghanaCrowd from '@/assets/ghana-independence-crowd-1957.jpg';
import mandelaRivonia from '@/assets/mandela-rivonia-trial-1964.jpg';
import mandelaLeaving from '@/assets/mandela-leaving-court-1964.jpg';
import haileSelassieCoronation from '@/assets/haile-selassie-coronation-1930.jpg';
import haileSelassieCrowd from '@/assets/haile-selassie-crowd-1930.jpg';
import haileSelassieDelegations from '@/assets/haile-selassie-delegations-1930.jpg';
import haileSelassieMilitary from '@/assets/haile-selassie-military-1930.jpg';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Images, Play, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaGallery } from '@/hooks/useSupabaseData';

const Gallery = () => {
  const navigate = useNavigate();
  const { media, loading } = useMediaGallery();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'event'>('all');
  const itemsPerPage = 12;

  // Map local image paths to imported assets
  const getImageSrc = (mediaUrl: string) => {
    const imageMap: { [key: string]: string } = {
      '/src/assets/ghana-flag-girl-1957.jpg': ghanaFlagGirl,
      '/src/assets/ghana-independence-crowd-1957.jpg': ghanaCrowd,
      '/src/assets/mandela-rivonia-trial-1964.jpg': mandelaRivonia,
      '/src/assets/mandela-leaving-court-1964.jpg': mandelaLeaving,
      '/src/assets/haile-selassie-coronation-1930.jpg': haileSelassieCoronation,
      '/src/assets/haile-selassie-crowd-1930.jpg': haileSelassieCrowd,
      '/src/assets/haile-selassie-delegations-1930.jpg': haileSelassieDelegations,
      '/src/assets/haile-selassie-military-1930.jpg': haileSelassieMilitary,
    };
    
    return imageMap[mediaUrl] || mediaUrl;
  };

  // Filter media based on selected type
  const filteredMedia = useMemo(() => {
    if (filterType === 'all') return media;
    return media.filter(item => item.type === filterType);
  }, [media, filterType]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedia = filteredMedia.slice(startIndex, endIndex);

  // Reset page when filter changes
  const handleFilterChange = (type: 'all' | 'image' | 'video' | 'event') => {
    setFilterType(type);
    setCurrentPage(1);
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
              text="Galerie Historique"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Images et vidéos qui racontent l'histoire africaine
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 text-atn-green font-medium">
              <Filter className="h-5 w-5" />
              <span>Filtrer par type :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('all')}
                className={`transition-all duration-200 ${
                  filterType === 'all' 
                    ? 'bg-atn-green hover:bg-atn-green-dark text-white' 
                    : 'border-atn-green text-atn-green hover:bg-atn-green hover:text-white'
                }`}
              >
                Tout ({media.length})
              </Button>
              <Button
                variant={filterType === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('video')}
                className={`transition-all duration-200 ${
                  filterType === 'video' 
                    ? 'bg-atn-green hover:bg-atn-green-dark text-white' 
                    : 'border-atn-green text-atn-green hover:bg-atn-green hover:text-white'
                }`}
              >
                <Play className="h-4 w-4 mr-1" />
                Vidéos ({media.filter(item => item.type === 'video').length})
              </Button>
              <Button
                variant={filterType === 'image' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('image')}
                className={`transition-all duration-200 ${
                  filterType === 'image' 
                    ? 'bg-atn-green hover:bg-atn-green-dark text-white' 
                    : 'border-atn-green text-atn-green hover:bg-atn-green hover:text-white'
                }`}
              >
                <Images className="h-4 w-4 mr-1" />
                Images ({media.filter(item => item.type === 'image').length})
              </Button>
              <Button
                variant={filterType === 'event' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('event')}
                className={`transition-all duration-200 ${
                  filterType === 'event' 
                    ? 'bg-atn-green hover:bg-atn-green-dark text-white' 
                    : 'border-atn-green text-atn-green hover:bg-atn-green hover:text-white'
                }`}
              >
                <Eye className="h-4 w-4 mr-1" />
                Événements ({media.filter(item => item.type === 'event').length})
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-atn-green">Chargement de la galerie...</div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-atn-black/70">Aucun média disponible pour le moment.</div>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-atn-black/70">
                Aucun média de type "{filterType}" trouvé. 
                <button 
                  onClick={() => handleFilterChange('all')}
                  className="text-atn-red hover:text-atn-red-dark font-medium ml-2 underline"
                >
                  Voir tous les médias
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentMedia.map((item, index) => (
                <AnimatedSection
                  key={item.id}
                  animation="scale-in"
                  delay={index * 200}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2 group">
                    <div className="h-64 bg-gradient-to-br from-atn-red to-atn-gold flex items-center justify-center relative overflow-hidden">
                      {item.media_url ? (
                        item.type === 'video' ? (
                          <div 
                            className="w-full h-full relative cursor-pointer"
                            onClick={() => {
                              const videoId = item.media_url.split('v=')[1]?.split('&')[0] || 
                                             item.media_url.split('/').pop();
                              if (videoId) {
                                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                              }
                            }}
                          >
                            <img 
                              src={`https://img.youtube.com/vi/${item.media_url.split('v=')[1]?.split('&')[0] || item.media_url.split('/').pop()}/maxresdefault.jpg`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://img.youtube.com/vi/${item.media_url.split('v=')[1]?.split('&')[0] || item.media_url.split('/').pop()}/hqdefault.jpg`;
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-red-600 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Play className="h-8 w-8 text-white fill-white" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={getImageSrc(item.media_url)} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to original URL if local image fails
                              e.currentTarget.src = item.media_url;
                            }}
                          />
                        )
                      ) : (
                        item.type === 'video' ? (
                          <Play className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                          <Images className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                        )
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute top-3 right-3 bg-white/90 text-atn-green text-xs font-medium px-2 py-1 rounded-full capitalize flex items-center space-x-1">
                        {item.type === 'video' ? <Play className="h-3 w-3" /> : <Images className="h-3 w-3" />}
                        <span>{item.type}</span>
                      </div>
                      {item.event_date && (
                        <div className="absolute top-3 left-3 bg-atn-red text-white text-xs font-medium px-2 py-1 rounded-full">
                          {new Date(item.event_date).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-poppins font-bold text-atn-green mb-2">
                        {item.title}
                      </h3>
                      <p className="text-atn-black/70 text-sm mb-4">
                        {item.description}
                      </p>
                      
                      <button 
                        className="flex items-center text-atn-red hover:text-atn-red-dark font-medium text-sm transition-colors duration-200"
                        onClick={() => navigate(`/galerie/${item.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir en détail
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredMedia.length > itemsPerPage && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo(0, 0);
                          }
                        }}
                      className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                              window.scrollTo(0, 0);
                            }}
                            isActive={page === currentPage}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo(0, 0);
                          }
                        }}
                      className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
