import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import QuoteBlock from '@/components/QuoteBlock';
import BlurText from '@/components/BlurText';
import SplashCursor from '@/components/SplashCursor';
import { Heart, Target, Users, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Une passion profonde pour l'héritage intellectuel africain et sa transmission aux générations futures."
    },
    {
      icon: Target,
      title: "Mission",
      description: "Valoriser et promouvoir la richesse de la pensée africaine à travers les siècles."
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Créer un réseau global de personnes intéressées par la pensée africaine."
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Contribuer à une meilleure compréhension de l'Afrique et de sa contribution au monde."
    }
  ];

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
              text="À Propos"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Notre mission : valoriser l'héritage intellectuel africain
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <BlurText 
                text="Notre Vision"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6"
              />
              <p className="text-lg text-atn-black/80 leading-relaxed">
                African Thinkers Network est né de la conviction que l'Afrique possède un patrimoine intellectuel 
                extraordinaire qui mérite d'être connu, célébré et transmis. Nous œuvrons pour créer des ponts 
                entre les penseurs d'hier et d'aujourd'hui, entre l'Afrique et le monde.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={300}>
              <QuoteBlock
                quote="L'Afrique n'a pas seulement une histoire, elle est l'histoire de l'humanité."
                author="Cheikh Anta Diop"
                title="Historien et anthropologue"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <BlurText 
              text="Nos Valeurs"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="fade-in"
                  delay={index * 150}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-atn-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-atn-black" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-atn-green mb-3">
                      {value.title}
                    </h3>
                    <p className="text-atn-black/80 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <BlurText 
              text="Rejoignez-nous"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6"
            />
            <p className="text-lg text-atn-black/80 max-w-3xl mx-auto leading-relaxed">
              African Thinkers Network est un projet collaboratif ouvert à tous ceux qui partagent 
              notre passion pour la pensée africaine. Ensemble, construisons ce patrimoine numérique 
              pour les générations futures.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <SplashCursor />
    </div>
  );
};

export default About;
