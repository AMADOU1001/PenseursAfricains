import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';  
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import { Calendar, User, Tag } from 'lucide-react';
import { useArticles, useAnnouncements } from '@/hooks/useSupabaseData';

const News = () => {
  const { articles, loading: articlesLoading } = useArticles();
  const { announcements, loading: announcementsLoading } = useAnnouncements();

  return (
    <div className="min-h-screen bg-atn-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-atn-green text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/African-thinkers-uploads/6132d720-fe84-4222-87bb-841706f9acc4.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-atn-green/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center">
            <BlurText 
              text="Actualités"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
              animateBy="words"
              direction="top"
            />
            <BlurText 
              text="Les dernières nouvelles de la pensée africaine contemporaine"
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
              animateBy="words"
              direction="bottom"
              delay={300}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-poppins font-bold text-atn-green mb-8">À la Une</h2>
              {articlesLoading ? (
                <div className="text-center py-12">
                  <div className="text-atn-green">Chargement des articles...</div>
                </div>
              ) : articles.slice(0, 1).map(article => (
                <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="h-64 bg-gradient-to-br from-atn-green to-atn-gold">
                    {article.featured_image_url && (
                      <img 
                        src={article.featured_image_url} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-atn-red text-white text-xs px-3 py-1 rounded-full">
                        {article.article_categories?.name || 'Article'}
                      </span>
                      <div className="flex items-center text-atn-black/60 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-atn-green mb-4">
                      {article.title}
                    </h3>
                    <p className="text-atn-black/80 leading-relaxed">
                      {article.excerpt || article.content.substring(0, 200) + '...'}
                    </p>
                    <button 
                      onClick={() => window.location.href = `/actualites/${article.slug}`}
                      className="mt-4 text-atn-red hover:text-atn-red/80 font-medium transition-colors"
                    >
                      Lire la suite →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-poppins font-bold text-atn-green mb-8 text-center">
            Autres Actualités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article, index) => (
              <AnimatedSection
                key={article.id}
                animation="slide-in-up"
                delay={index * 150}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                  <div className="h-48 bg-gradient-to-br from-atn-gold to-atn-red">
                    {article.featured_image_url && (
                      <img 
                        src={article.featured_image_url} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-atn-green text-white text-xs px-2 py-1 rounded-full">
                        {article.article_categories?.name || 'Article'}
                      </span>
                      <div className="flex items-center text-atn-black/60 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <h3 className="text-lg font-poppins font-bold text-atn-green mb-2">
                      {article.title}
                    </h3>
                    <p className="text-atn-black/80 text-sm leading-relaxed mb-4">
                      {article.excerpt || article.content.substring(0, 120) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => window.location.href = `/actualites/${article.slug}`}
                        className="text-atn-red hover:text-atn-red/80 font-medium text-sm transition-colors"
                      >
                        Lire →
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;