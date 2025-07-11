import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, MessageCircle, Award, Mail, User, GraduationCap } from 'lucide-react';

const Join = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: "Accès aux Ressources",
      description: "Bibliothèque numérique exclusive avec des textes rares et des analyses approfondies."
    },
    {
      icon: MessageCircle,
      title: "Communauté Active",
      description: "Échanges avec des chercheurs, étudiants et passionnés de la pensée africaine."
    },
    {
      icon: Award,
      title: "Événements Privilégiés",
      description: "Invitations à nos conférences, webinaires et ateliers de recherche."
    },
    {
      icon: GraduationCap,
      title: "Formation Continue",
      description: "Programmes de formation et certification en études africaines."
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
              text="Rejoindre le Réseau"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Devenez membre de la plus grande communauté de penseurs africains
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <BlurText 
              text="Pourquoi Nous Rejoindre ?"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6"
            />
            <p className="text-lg text-atn-black/80 max-w-3xl mx-auto leading-relaxed">
              En rejoignant African Thinkers Network, vous intégrez une communauté dynamique 
              dédiée à la promotion et à la préservation de l'héritage intellectuel africain.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
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
                      {benefit.title}
                    </h3>
                    <p className="text-atn-black/80 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
                Candidature d'Adhésion
              </h2>
              <p className="text-lg text-atn-black/80 leading-relaxed">
                Remplissez ce formulaire pour rejoindre notre réseau de penseurs africains.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={300}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Profession/Domaine d'expertise
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="Ex: Historien, Enseignant, Chercheur..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Institution/Organisation
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="Université, Centre de recherche, ONG..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Motivation *
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="Pourquoi souhaitez-vous rejoindre African Thinkers Network ? Quels sont vos centres d'intérêt ?"
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded border-gray-300 text-atn-green focus:ring-atn-gold"
                    />
                    <label htmlFor="terms" className="text-sm text-atn-black/80">
                      J'accepte les conditions d'utilisation et la politique de confidentialité *
                    </label>
                  </div>

                  <Button className="w-full bg-atn-red hover:bg-atn-red/90 text-white py-3 text-lg">
                    <Users className="mr-2 h-5 w-5" />
                    Envoyer ma Candidature
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

export default Join;