import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Heart, CreditCard, Users, BookOpen, Star, Gift } from 'lucide-react';

const Support = () => {
  const supportOptions = [
    {
      icon: CreditCard,
      title: "Don Financier",
      description: "Contribuez directement au financement de nos projets de recherche et de numérisation.",
      amounts: ["5k CFA", "10k CFA€", "15k CFA", "Autre"]
    },
    {
      icon: BookOpen,
      title: "Don de Ressources",
      description: "Partagez vos livres, documents ou archives pour enrichir notre collection.",
      action: "Contacter notre équipe"
    },
    {
      icon: Users,
      title: "Bénévolat",
      description: "Rejoignez notre équipe de bénévoles pour l'organisation d'événements et la recherche.",
      action: "Devenir bénévole"
    }
  ];

  const impactStats = [
    { number: "50+", label: "Penseurs documentés" },
    { number: "200+", label: "Textes numérisés" },
    { number: "1000+", label: "Membres actifs" },
    { number: "15", label: "Pays représentés" }
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
              Soutenir le Projet
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Aidez-nous à préserver et promouvoir l'héritage intellectuel africain
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Impact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
                Votre Impact
              </h2>
              <p className="text-lg text-atn-black/80 leading-relaxed mb-12">
                Chaque contribution, qu'elle soit financière, matérielle ou en temps, participe directement 
                à la préservation et à la transmission de la richesse intellectuelle africaine. 
                Ensemble, nous construisons un patrimoine numérique durable pour les générations futures.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <AnimatedSection
                  key={index}
                  animation="scale-in"
                  delay={index * 100}
                >
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-poppins font-bold text-atn-red mb-2">
                      {stat.number}
                    </div>
                    <div className="text-atn-black/70 text-sm">
                      {stat.label}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
              Comment Nous Soutenir
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
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
                      {option.title}
                    </h3>
                    <p className="text-atn-black/80 leading-relaxed mb-6 text-center">
                      {option.description}
                    </p>
                    {option.amounts && (
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {option.amounts.map((amount, idx) => (
                          <button
                            key={idx}
                            className="py-2 px-4 text-sm border border-atn-green text-atn-green rounded-lg hover:bg-atn-green hover:text-white transition-colors"
                          >
                            {amount}
                          </button>
                        ))}
                      </div>
                    )}
                    <Button className="w-full bg-atn-red hover:bg-atn-red/90 text-white">
                      <Heart className="mr-2 h-4 w-4" />
                      {option.action || "Faire un don"}
                    </Button>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
                Faire un Don
              </h2>
              <p className="text-lg text-atn-black/80 leading-relaxed">
                Votre générosité nous permet de continuer notre mission. Chaque contribution compte !
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={300}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-4">
                      Montant du don
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {["5k CFA", "15k CFA", "20k CFA", "25k CFA"].map(amount => (
                        <button
                          key={amount}
                          type="button"
                          className="py-3 px-4 border border-atn-green text-atn-green rounded-lg hover:bg-atn-green hover:text-white transition-colors"
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="Autre montant"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Type de don
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="donation-type" value="one-time" className="mr-2" />
                        <span className="text-atn-black/80">Don ponctuel</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="donation-type" value="monthly" className="mr-2" />
                        <span className="text-atn-black/80">Don mensuel</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Nom
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
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-atn-green mb-2">
                      Message (optionnel)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-atn-gold focus:border-transparent"
                      placeholder="Un message d'encouragement ou des suggestions..."
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="rounded border-gray-300 text-atn-green focus:ring-atn-gold"
                    />
                    <label htmlFor="anonymous" className="text-sm text-atn-black/80">
                      Faire ce don de manière anonyme
                    </label>
                  </div>

                  <Button className="w-full bg-atn-red hover:bg-atn-red/90 text-white py-3 text-lg">
                    <Gift className="mr-2 h-5 w-5" />
                    Confirmer le Don
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
              Nos Généreux Donateurs
            </h2>
            <p className="text-lg text-atn-black/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Nous remercions chaleureusement tous ceux qui contribuent à notre mission. 
              Votre soutien rend possible la préservation de ce patrimoine intellectuel unique.
            </p>
            <div className="flex justify-center">
              <div className="bg-atn-gold/20 rounded-full p-4">
                <Star className="h-12 w-12 text-atn-gold" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;