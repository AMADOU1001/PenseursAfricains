import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Handshake, Globe, BookOpen, Users, Mail } from 'lucide-react';

const Partnerships = () => {
  const partnerTypes = [
    {
      icon: BookOpen,
      title: "Institutions Académiques",
      description: "Universités, centres de recherche, bibliothèques spécialisées en études africaines.",
      benefits: ["Échange de ressources", "Recherches collaboratives", "Programmes d'échange"]
    },
    {
      icon: Globe,
      title: "Organisations Internationales",
      description: "ONG, institutions culturelles, organisations panafricaines.",
      benefits: ["Projets conjoints", "Financement de programmes", "Réseautage global"]
    },
    {
      icon: Users,
      title: "Communautés Locales",
      description: "Associations culturelles, centres communautaires, groupes de la diaspora.",
      benefits: ["Ancrage local", "Événements communautaires", "Transmission culturelle"]
    }
  ];

  const currentPartners = [
    {
      name: "Université Cheikh Anta Diop (Dakar)",
      type: "Institution Académique",
      collaboration: "Numérisation d'archives historiques"
    },
    {
      name: "African Studies Association",
      type: "Organisation Internationale",
      collaboration: "Conférences annuelles"
    },
    {
      name: "Centre Culturel Marcus Garvey",
      type: "Centre Culturel",
      collaboration: "Programmes éducatifs communautaires"
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
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white">
              Partenariats
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Collaborer pour amplifier l'impact de la pensée africaine
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
                Ensemble, Plus Forts
              </h2>
              <p className="text-lg text-atn-black/80 leading-relaxed mb-8">
                African Thinkers Network croit fermement en la force des partenariats stratégiques. 
                En unissant nos efforts avec des institutions, organisations et communautés partageant 
                notre vision, nous maximisons notre impact dans la préservation et la promotion de 
                l'héritage intellectuel africain.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
              Types de Partenariats
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="slide-in-up"
                  delay={index * 200}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-16 h-16 bg-atn-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-atn-black" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-atn-green mb-4 text-center">
                      {type.title}
                    </h3>
                    <p className="text-atn-black/80 leading-relaxed mb-6 text-center">
                      {type.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-atn-red text-sm">Avantages :</h4>
                      <ul className="space-y-1">
                        {type.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-atn-black/70 flex items-center">
                            <span className="w-2 h-2 bg-atn-gold rounded-full mr-2 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
              Nos Partenaires Actuels
            </h2>
            <p className="text-lg text-atn-black/80 max-w-3xl mx-auto leading-relaxed">
              Nous sommes fiers de collaborer avec des institutions de renom qui partagent notre engagement 
              pour la valorisation de la pensée africaine.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPartners.map((partner, index) => (
              <AnimatedSection
                key={index}
                animation="fade-in"
                delay={index * 150}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-atn-red rounded-full flex items-center justify-center mb-4">
                    <Handshake className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-poppins font-bold text-atn-green mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-atn-gold font-medium mb-2">
                    {partner.type}
                  </p>
                  <p className="text-atn-black/80 text-sm">
                    {partner.collaboration}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
                Proposer un Partenariat
              </h2>
              <p className="text-lg text-atn-black/80 leading-relaxed">
                Vous représentez une organisation qui souhaite collaborer avec nous ? 
                Contactez-nous pour explorer les possibilités de partenariat.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={300}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Nom de l'organisation *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="Nom de votre organisation"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Nom du contact *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                        placeholder="contact@organisation.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Type d'organisation
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent">
                      <option value="">Sélectionnez une catégorie</option>
                      <option value="academic">Institution Académique</option>
                      <option value="international">Organisation Internationale</option>
                      <option value="cultural">Centre Culturel</option>
                      <option value="ngo">ONG</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Proposition de collaboration *
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="Décrivez votre proposition de partenariat, vos objectifs et les bénéfices mutuels envisagés..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-atn-red hover:bg-atn-red/90 text-white py-3 text-lg">
                    <Mail className="mr-2 h-5 w-5" />
                    Envoyer la Proposition
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnerships;