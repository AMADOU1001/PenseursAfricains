import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import { Calendar, ArrowLeft, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArticles } from '@/hooks/useSupabaseData';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { articles, loading } = useArticles();

  const article = articles.find(a => a.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-atn-white">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-atn-green">Chargement de l'article...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-atn-white">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-poppins font-bold text-atn-green mb-4">
              Article non trouvé
            </h1>
            <Button onClick={() => navigate('/actualites')} className="btn-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux actualités
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atn-white">
      <Navbar />
      
      {/* Hero Section with Featured Image */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Button 
              onClick={() => navigate('/actualites')}
              variant="outline" 
              className="mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux actualités
            </Button>
            
            {article.featured_image_url && (
              <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                <img 
                  src={article.featured_image_url} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                {article.article_categories?.name && (
                  <span className="bg-atn-red text-white text-sm px-3 py-1 rounded-full">
                    <Tag className="h-3 w-3 mr-1 inline" />
                    {article.article_categories.name}
                  </span>
                )}
                <div className="flex items-center text-atn-black/60 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <BlurText 
                text={article.title}
                className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6"
                animateBy="words"
                direction="left"
              />
              
              {article.excerpt && (
                <p className="text-xl text-atn-black/80 leading-relaxed mb-8 font-medium">
                  {article.excerpt}
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-atn-black/90 leading-relaxed whitespace-pre-wrap"
                  style={{ lineHeight: '1.8' }}
                >
                  {article.content}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Articles or Call to Action */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                Vous avez aimé cet article ?
              </h2>
              <p className="text-atn-black/70 mb-8">
                Découvrez plus d'actualités sur la pensée africaine contemporaine
              </p>
              <Button 
                onClick={() => navigate('/actualites')}
                className="btn-primary"
              >
                Voir plus d'articles
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetail;