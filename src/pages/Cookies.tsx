import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, Shield, Info } from 'lucide-react';

const Cookies = () => {
  const cookieTypes = [
    {
      icon: Shield,
      name: "Cookies Essentiels",
      description: "Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.",
      examples: ["Sécurité du site", "Fonctionnalités de base", "Préférences de langue"],
      status: "Toujours actifs"
    },
    {
      icon: Settings,
      name: "Cookies de Performance",
      description: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.",
      examples: ["Analyse du trafic", "Pages populaires", "Temps de visite"],
      status: "Optionnels"
    },
    {
      icon: Info,
      name: "Cookies de Préférences",
      description: "Ces cookies permettent au site de mémoriser vos choix et préférences.",
      examples: ["Thème sombre/clair", "Préférences linguistiques", "Paramètres personnalisés"],
      status: "Optionnels"
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
              Politique des Cookies
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprendre l'utilisation des cookies sur notre site
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Cookie className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Qu'est-ce qu'un Cookie ?
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    Un cookie est un petit fichier texte stocké sur votre ordinateur, tablette ou 
                    smartphone lorsque vous visitez un site web. Les cookies permettent au site 
                    de mémoriser vos actions et préférences sur une période donnée.
                  </p>
                  <p>
                    African Thinkers Network utilise des cookies pour améliorer votre expérience 
                    de navigation, analyser l'utilisation du site et personnaliser le contenu 
                    selon vos préférences.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-atn-green mb-6">
              Types de Cookies Utilisés
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cookieTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="slide-in-up"
                  delay={index * 200}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-atn-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-atn-black" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-atn-green mb-4 text-center">
                      {type.name}
                    </h3>
                    <p className="text-atn-black/80 leading-relaxed mb-4 text-center">
                      {type.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-atn-red text-sm mb-2">Exemples :</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-atn-black/70 flex items-center">
                            <span className="w-2 h-2 bg-atn-gold rounded-full mr-2 flex-shrink-0"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        type.status === 'Toujours actifs' 
                          ? 'bg-atn-green text-white' 
                          : 'bg-atn-gold text-atn-black'
                      }`}>
                        {type.status}
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Gestion des Cookies
                </h2>
                <div className="space-y-6 text-atn-black/80 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-atn-red mb-2">Dans votre navigateur :</h3>
                    <p>
                      Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. 
                      Vous pouvez supprimer tous les cookies déjà sur votre ordinateur et configurer 
                      la plupart des navigateurs pour qu'ils les bloquent.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-atn-red mb-2">Instructions par navigateur :</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                      <li><strong>Firefox :</strong> Préférences → Vie privée et sécurité → Cookies</li>
                      <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                      <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                    </ul>
                  </div>
                  
                  <div className="bg-atn-gold border-l-4 border-atn-red p-4">
                    <p className="text-atn-blue">
                      <strong>Attention :</strong> La désactivation de certains cookies peut affecter 
                      le fonctionnement optimal de notre site web.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={300}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Vos Choix
                </h2>
                <div className="space-y-6">
                  <div className="bg-atn-green/10 p-6 rounded-lg">
                    <h3 className="font-semibold text-atn-green mb-4">Centre de Préférences</h3>
                    <p className="text-atn-black/80 mb-4">
                      Gérez vos préférences de cookies directement depuis notre site :
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-atn-black/80">Cookies essentiels</span>
                        <span className="text-atn-green font-medium">Toujours activés</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-atn-black/80">Cookies de performance</span>
                        <button className="bg-atn-green text-white px-4 py-1 rounded text-sm">
                          Activé
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-atn-black/80">Cookies de préférences</span>
                        <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm">
                          Désactivé
                        </button>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-atn-red hover:bg-atn-red/90 text-white">
                      <Settings className="mr-2 h-4 w-4" />
                      Sauvegarder les Préférences
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={500}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Durée de Conservation
                </h2>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-atn-green mb-2">Cookies de session</h4>
                      <p className="text-sm">Supprimés automatiquement à la fermeture du navigateur</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-atn-green mb-2">Cookies persistants</h4>
                      <p className="text-sm">Conservés jusqu'à 12 mois maximum selon leur fonction</p>
                    </div>
                  </div>
                  
                  <p>
                    Nous révisons régulièrement nos cookies pour nous assurer qu'ils sont toujours 
                    nécessaires et respectent les durées de conservation appropriées.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-poppins font-bold text-atn-green mb-6">
                Questions sur les Cookies ?
              </h2>
              <p className="text-lg text-atn-black/80 mb-8 leading-relaxed">
                Si vous avez des questions concernant notre utilisation des cookies, 
                n'hésitez pas à nous contacter.
              </p>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-atn-black/80 mb-2">
                  <strong>Email :</strong> cookies@africanthinkers.org
                </p>
                <p className="text-atn-black/80">
                  <strong>Mise à jour :</strong> Juillet 2025
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cookies;