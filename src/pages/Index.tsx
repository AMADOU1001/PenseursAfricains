import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteBlock from '@/components/QuoteBlock';
import StatsPanel from '@/components/StatsPanel';
import CircularGallery from '@/components/CircularGallery';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import SplashCursor from '@/components/SplashCursor';
import ScrollVelocity from '@/components/ScrollVelocity';

import { Button } from '@/components/ui/button';
import { BookOpen, User, Book, Images } from 'lucide-react';
import { useThinkers, useQuotes, useStats } from '@/hooks/useSupabaseData';

const Index = () => {
  const navigate = useNavigate();
  const { thinkers, loading: thinkersLoading } = useThinkers();
  const { quotes, loading: quotesLoading } = useQuotes();
  const { stats, loading: statsLoading } = useStats();
  return (
    <div className="min-h-screen bg-atn-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#006B3F]">
        {/* Background with your provided image */}
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
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-atn-green/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 right-16 w-32 h-32 bg-atn-red/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-12 max-w-6xl mx-auto">
            {/* Text Content - Left Side */}
            <div className="flex-1 text-left">
              <AnimatedSection>
                <BlurText
                  text="African Thinkers"
                  delay={300}
                  animateBy="words"
                  direction="top"
                  className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-2 leading-tight text-white"
                />
                <BlurText
                  text="Network"
                  delay={600}
                  animateBy="words"
                  direction="top"
                  className="block text-atn-gold text-4xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6 leading-tight"
                />
                
                <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl leading-relaxed font-light text-white">
                  Découvrez l'héritage intellectuel africain à travers les siècles. 
                  Connectez-vous aux grands penseurs qui ont façonné notre continent et le monde.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="btn-accent text-lg px-8 py-4"
                    onClick={() => navigate('/penseurs')}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explorer les penseurs
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-atn-gold hover:bg-atn-gold-dark text-atn-black text-lg px-8 py-4"
                    onClick={() => navigate('/rejoindre')}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Rejoindre le réseau
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Logo - Right Side */}
            <div className="flex-shrink-0">
              <AnimatedSection animation="fade-in" delay={800}>
                <div className="relative group">
                  {/* Animated ring around logo */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-atn-gold to-atn-red opacity-20 blur-xl scale-150 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-atn-gold/30 animate-spin" style={{animationDuration: '8s'}}></div>
                  <div className="absolute inset-0 rounded-full border-2 border-atn-red/30 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
                  
                  {/* Logo container */}
                  <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm bg-white/10 hover:scale-110 transition-all duration-500 group-hover:border-atn-gold/50">
                    <img 
                      src="/African-thinkers-uploads/8ba7e437-809e-432e-ab26-921aec653725.png"
                      alt="African Thinkers Network Logo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-atn-green/10 group-hover:to-atn-gold/20 transition-all duration-500"></div>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-atn-gold rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-atn-red rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 -left-5 w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
                  <div className="absolute top-1/4 -right-5 w-3 h-3 bg-atn-gold/70 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <BlurText
              text="L'Afrique intellectuelle en chiffres"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-4"
            />
            <p className="text-lg text-atn-black/70 max-w-2xl mx-auto">
              Un patrimoine riche et diversifié qui s'étend sur des millénaires
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-in-right" delay={300}>
            <StatsPanel stats={stats} />
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Thinkers */}
      <section id="penseurs" className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <BlurText
              text="Penseurs emblématiques"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-4"
            />
            <p className="text-lg text-atn-black/70 max-w-2xl mx-auto">
              Découvrez les intellectuels qui ont marqué l'histoire africaine et mondiale
            </p>
          </AnimatedSection>

          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery 
              items={thinkers.map(thinker => ({
                image: thinker.image_url || 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
                text: thinker.name
              }))}
              bend={3} 
              textColor="#006B3F" 
              borderRadius={0.05} 
              scrollEase={0.02}
            />
          </div>

          <AnimatedSection className="text-center mt-12">
            <Button 
              className="btn-atn-green text-lg px-8 py-4"
              onClick={() => navigate('/penseurs')}
            >
              <User className="mr-2 h-5 w-5" />
              Voir tous les penseurs
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <BlurText
                text="Paroles de sagesse"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-4"
              />
              <p className="text-lg text-atn-black/70">
                Les citations qui ont inspiré des générations
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {quotes.map((quote, index) => (
                <AnimatedSection
                  key={index}
                  animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
                  delay={index * 300}
                >
                  <QuoteBlock
                    quote={quote.quote}
                    author={quote.author}
                    title={quote.author_title}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Velocity Animation */}
        <div className="mt-16">
          <ScrollVelocity
            texts={['Pensée Africaine', 'Héritage Intellectuel', 'Sagesse Ancestrale']}
            velocity={50}
            className="text-atn-green font-bold text-4xl md:text-6xl"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-atn-green to-atn-red text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/African-thinkers-uploads/e68ed5a9-d4e4-42e0-a507-aa8a9deb761f.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-atn-green/80 to-atn-red/80"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <BlurText
                text="Rejoignez le mouvement panafricain intellectuel"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl font-poppins font-bold mb-6 text-white"
              />
              <p className="text-xl mb-8 leading-relaxed">
                Participez à la valorisation et à la transmission de l'héritage intellectuel africain. 
                Ensemble, construisons un réseau global de la pensée africaine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-atn-gold hover:bg-atn-gold-dark text-atn-black text-lg px-8 py-4"
                  onClick={() => navigate('/soutenir')}
                >
                  <Book className="mr-2 h-5 w-5" />
                  Contribuer au projet
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-atn-gold hover:bg-atn-gold-dark text-atn-black text-lg px-8 py-4"
                  onClick={() => navigate('/galerie')}
                >
                  <Images className="mr-2 h-5 w-5" />
                  Explorer la galerie
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
      <SplashCursor />
    </div>
  );
};

export default Index;
