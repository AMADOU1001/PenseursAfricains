import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import QuoteBlock from '@/components/QuoteBlock';
import BlurText from '@/components/BlurText';
import { Globe, Heart, Users, Star } from 'lucide-react';

const Panafricanism = () => {
  const principles = [
    {
      icon: Globe,
      title: "Unité Africaine",
      description: "Promouvoir l'unité politique, économique et culturelle du continent africain."
    },
    {
      icon: Heart,
      title: "Solidarité",
      description: "Renforcer les liens de solidarité entre tous les peuples d'origine africaine."
    },
    {
      icon: Users,
      title: "Coopération",
      description: "Développer la coopération Sud-Sud et les échanges interculturels."
    },
    {
      icon: Star,
      title: "Renaissance",
      description: "Contribuer à la renaissance africaine et à l'émancipation du continent."
    }
  ];

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
              text="Panafricanisme"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              L'idéologie qui prône l'unité et la solidarité africaines
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <BlurText 
                text="Qu'est-ce que le Panafricanisme ?"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6"
              />
              <p className="text-lg text-atn-black/80 leading-relaxed mb-8">
                Le panafricanisme est un mouvement politique et culturel qui vise à encourager et à renforcer 
                les liens de solidarité entre tous les peuples d'origine africaine. Né au début du XXe siècle, 
                ce mouvement a joué un rôle crucial dans les luttes de décolonisation et continue d'inspirer 
                l'unité africaine aujourd'hui.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={300}>
              <QuoteBlock
                quote="L'Afrique doit s'unir ou périr. Je ne vois pas d'autre alternative."
                author="Kwame Nkrumah"
                title="Premier Président du Ghana"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <BlurText 
              text="Principes Fondamentaux"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => {
              const IconComponent = principle.icon;
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
                      {principle.title}
                    </h3>
                    <p className="text-atn-black/80 text-sm leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
                Histoire du Mouvement
              </h2>
              <div className="text-left space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-poppins font-bold text-atn-red mb-3">1900-1945: Les Origines</h3>
                  <p className="text-atn-black/80 leading-relaxed">
                    Le mouvement panafricain naît au début du XXe siècle avec les premiers congrès 
                    panafricains organisés par W.E.B. Du Bois et d'autres intellectuels de la diaspora africaine.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-poppins font-bold text-atn-red mb-3">1945-1970: L'Indépendance</h3>
                  <p className="text-atn-black/80 leading-relaxed">
                    La période de décolonisation voit émerger des leaders comme Kwame Nkrumah, Patrice Lumumba, 
                    et Julius Nyerere qui incarnent les idéaux panafricains.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-poppins font-bold text-atn-red mb-3">1970-Aujourd'hui: L'Union Africaine</h3>
                  <p className="text-atn-black/80 leading-relaxed">
                    La création de l'OUA puis de l'Union Africaine traduit la volonté continue d'unité, 
                    malgré les défis politiques et économiques.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Panafricanism;