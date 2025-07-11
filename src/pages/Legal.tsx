import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Scale, FileText, Mail } from 'lucide-react';

const Legal = () => {
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
              Mentions Légales
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Informations légales et conditions d'utilisation
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Scale className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Éditeur du Site
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80">
                  <p><strong>Nom :</strong> African Thinkers Network</p>
                  <p><strong>Statut :</strong> Association à but non lucratif</p>
                  <p><strong>Siège social :</strong> [Adresse à compléter plutard]</p>
                  <p><strong>Email :</strong> contact@africanthinkers.org</p>
                  <p><strong>Directeur de la publication :</strong> [Nom à compléter plutard]</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={200}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <FileText className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Hébergement
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80">
                  <p><strong>Hébergeur :</strong> [Hébergeur à compléter plutard]</p>
                  <p><strong>Adresse :</strong> [Adresse de l'hébergeur à compléter plutard]</p>
                  <p><strong>Site web :</strong> [Site web à compléter plutard]</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={400}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Propriété Intellectuelle
                </h2>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    Le contenu de ce site web (textes, images, graphismes, logo, icônes, sons, logiciels) 
                    est la propriété exclusive d'African Thinkers Network, à l'exception des contenus 
                    soumis à des droits de tiers.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou 
                    partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
                    interdite, sauf autorisation écrite préalable d'African Thinkers Network.
                  </p>
                  <p>
                    Les textes et œuvres des penseurs africains présentés sur ce site peuvent être 
                    soumis à des droits d'auteur. Leur utilisation doit respecter la législation 
                    en vigueur sur la propriété intellectuelle.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={600}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Limitation de Responsabilité
                </h2>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    African Thinkers Network s'efforce de fournir des informations aussi précises que 
                    possible sur ce site. Toutefois, nous ne pourrons être tenus responsables des 
                    omissions, inexactitudes et carences dans la mise à jour, qu'elles soient de 
                    notre fait ou du fait des tiers partenaires qui nous fournissent ces informations.
                  </p>
                  <p>
                    Tous les informations proposées sur ce site sont données à titre indicatif, et 
                    sont susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur ce 
                    site ne sont pas exhaustifs.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={800}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Droit Applicable
                </h2>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    Les présentes mentions légales sont régies par le droit français. En cas de litige, 
                    les tribunaux français seront seuls compétents.
                  </p>
                  <p>
                    Pour toute question relative aux présentes mentions légales, vous pouvez nous 
                    contacter à l'adresse email suivante : legal@africanthinkers.org
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={1000}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Mail className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Contact
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80">
                  <p>
                    Pour toute question concernant ces mentions légales ou l'utilisation du site, 
                    vous pouvez nous contacter :
                  </p>
                  <p><strong>Email :</strong> legal@africanthinkers.org</p>
                  <p><strong>Téléphone :</strong> [Numéro à compléter]</p>
                  <p><strong>Courrier :</strong> African Thinkers Network - [Adresse complète]</p>
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

export default Legal;