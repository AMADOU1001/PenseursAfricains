import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import SplashCursor from '@/components/SplashCursor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Book, Download, ExternalLink, Search, Filter, X } from 'lucide-react';
import { useBooks } from '@/hooks/useSupabaseData';

const Books = () => {
  const { books, loading } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  // Extract unique authors for filter
  const authors = useMemo(() => {
    const authorSet = new Set(books.map(book => book.author));
    return Array.from(authorSet).sort();
  }, [books]);
  
  // Filter books based on search term and selected author
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = !searchTerm || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAuthor = !selectedAuthor || book.author === selectedAuthor;
      
      return matchesSearch && matchesAuthor;
    });
  }, [books, searchTerm, selectedAuthor]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedAuthor]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAuthor('');
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
              text="Bibliothèque Africaine"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Explorez les œuvres fondamentales de la pensée africaine
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gradient-to-br from-atn-green/5 to-atn-green/10">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6 text-center">
                Rechercher dans notre collection
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-atn-green/60" />
                  <Input
                    type="text"
                    placeholder="Rechercher par titre, auteur ou description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-atn-green/20 focus:border-atn-green focus:ring-atn-green/20"
                  />
                </div>
                
                {/* Author Filter */}
                <div className="md:w-64">
                  <div className="relative">
                    <Filter className="absolute left-3 top-3 h-4 w-4 text-atn-green/60" />
                    <select
                      value={selectedAuthor}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="w-full h-12 pl-10 pr-3 rounded-md border border-atn-green/20 bg-white text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atn-green/20 focus-visible:border-atn-green appearance-none"
                    >
                      <option value="">Tous les auteurs</option>
                      {authors.map(author => (
                        <option key={author} value={author}>{author}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Clear Filters Button */}
                {(searchTerm || selectedAuthor) && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters} 
                    className="h-12 px-4 border-atn-green text-atn-green hover:bg-atn-green hover:text-white"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Effacer
                  </Button>
                )}
              </div>
              
              {/* Results Counter */}
              <div className="text-center text-sm text-atn-green/80 mb-4 font-medium">
                {filteredBooks.length} livre{filteredBooks.length !== 1 ? 's' : ''} trouvé{filteredBooks.length !== 1 ? 's' : ''}
                {searchTerm && ` pour "${searchTerm}"`}
                {selectedAuthor && ` par ${selectedAuthor}`}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-atn-green">Chargement des livres...</div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Aucun livre trouvé</h3>
              <p className="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <Button onClick={clearFilters} variant="outline">
                Afficher tous les livres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBooks.map((book, index) => (
              <AnimatedSection
                key={book.id}
                animation="slide-in-up"
                delay={index * 150}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-atn-green to-atn-gold flex items-center justify-center overflow-hidden">
                    {book.cover_url ? (
                      <img 
                        src={book.cover_url} 
                        alt={`Couverture de ${book.title}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Book className="h-16 w-16 text-white" />
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs bg-atn-gold text-atn-black px-2 py-1 rounded-full">
                        Livre
                      </span>
                      {book.available && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Disponible
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-poppins font-bold text-atn-green mb-2">
                      {book.title}
                    </h3>
                    <p className="text-atn-gold font-medium text-sm mb-1">
                      {book.author}
                    </p>
                    
                    <p className="text-atn-black/80 text-sm leading-relaxed mb-4">
                      {book.description}
                    </p>
                    
                    <div className="flex gap-2">
                      {book.pdf_preview_url && (
                        <Button className="btn-primary flex-1 text-sm" asChild>
                          <a href={book.pdf_preview_url} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Aperçu PDF
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredBooks.length > itemsPerPage && (
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
      <SplashCursor />
    </div>
  );
};

export default Books;
