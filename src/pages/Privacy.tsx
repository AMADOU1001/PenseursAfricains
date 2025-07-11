import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const Privacy = () => {
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
              Politique de Confidentialité
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Protection et respect de vos données personnelles
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Notre Engagement
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    African Thinkers Network s'engage à protéger et respecter votre vie privée. 
                    Cette politique de confidentialité explique comment nous collectons, utilisons 
                    et protégeons vos informations personnelles lorsque vous utilisez notre site web.
                  </p>
                  <p>
                    Nous nous conformons au Règlement Général sur la Protection des Données (RGPD) 
                    et à toutes les législations applicables en matière de protection des données.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={200}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Données Collectées
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <h3 className="font-semibold text-atn-red">Informations que vous nous fournissez :</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nom et prénom lors de l'inscription à la newsletter</li>
                    <li>Adresse email pour les communications</li>
                    <li>Informations de contact dans les formulaires</li>
                    <li>Messages et commentaires que vous nous envoyez</li>
                  </ul>
                  
                  <h3 className="font-semibold text-atn-red">Informations collectées automatiquement :</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresse IP et données de localisation générale</li>
                    <li>Type de navigateur et système d'exploitation</li>
                    <li>Pages visitées et durée de visite</li>
                    <li>Données d'utilisation et de navigation</li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={400}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <UserCheck className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Utilisation des Données
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>Nous utilisons vos données personnelles pour :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Vous envoyer notre newsletter et nos communications</li>
                    <li>Répondre à vos questions et demandes</li>
                    <li>Améliorer notre site web et nos services</li>
                    <li>Analyser l'utilisation de notre site</li>
                    <li>Respecter nos obligations légales</li>
                    <li>Prévenir la fraude et assurer la sécurité</li>
                  </ul>
                  
                  <p className="font-semibold text-atn-red">
                    Nous ne vendons jamais vos données personnelles à des tiers.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={600}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Lock className="h-8 w-8 text-atn-green mr-3" />
                  <h2 className="text-2xl font-poppins font-bold text-atn-green">
                    Sécurité des Données
                  </h2>
                </div>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    Nous mettons en place des mesures techniques et organisationnelles appropriées 
                    pour protéger vos données personnelles contre :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>L'accès non autorisé</li>
                    <li>La divulgation accidentelle</li>
                    <li>La modification non autorisée</li>
                    <li>La destruction illégale</li>
                  </ul>
                  
                  <p>
                    Nos serveurs utilisent des protocoles de sécurité avancés, incluant le 
                    chiffrement SSL/TLS pour toutes les transmissions de données sensibles.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={800}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Vos Droits
                </h2>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-atn-gold/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-atn-green mb-2">Droit d'accès</h4>
                      <p className="text-sm">Demander une copie de vos données personnelles</p>
                    </div>
                    
                    <div className="bg-atn-gold/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-atn-green mb-2">Droit de rectification</h4>
                      <p className="text-sm">Corriger des données inexactes ou incomplètes</p>
                    </div>
                    
                    <div className="bg-atn-gold/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-atn-green mb-2">Droit d'effacement</h4>
                      <p className="text-sm">Demander la suppression de vos données</p>
                    </div>
                    
                    <div className="bg-atn-gold/10 p-4 rounded-lg">
                      <h4 className="font-semibold text-atn-green mb-2">Droit à la portabilité</h4>
                      <p className="text-sm">Recevoir vos données dans un format structuré</p>
                    </div>
                  </div>
                  
                  <p>
                    Pour exercer ces droits, contactez-nous à : <strong>privacy@africanthinkers.org</strong>
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={1000}>
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Cookies et Technologies Similaires
                </h2>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                    Les cookies sont de petits fichiers texte stockés sur votre appareil.
                  </p>
                  
                  <h4 className="font-semibold text-atn-red">Types de cookies utilisés :</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                    <li><strong>Cookies analytiques :</strong> Pour comprendre l'utilisation du site</li>
                    <li><strong>Cookies de préférences :</strong> Pour mémoriser vos choix</li>
                  </ul>
                  
                  <p>
                    Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-up" delay={1200}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-poppins font-bold text-atn-green mb-6">
                  Modifications et Contact
                </h2>
                <div className="space-y-4 text-atn-black/80 leading-relaxed">
                  <p>
                    Nous nous réservons le droit de modifier cette politique de confidentialité. 
                    Les modifications seront publiées sur cette page avec la date de mise à jour.
                  </p>
                  
                  <p><strong>Dernière mise à jour :</strong> Juillet 2025</p>
                  
                  <div className="bg-atn-green/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-atn-green mb-2">Contact</h4>
                    <p><strong>Email :</strong> privacy@africanthinkers.org</p>
                    <p><strong>Adresse :</strong> African Thinkers Network - [Adresse à complèter plutard ]</p>
                  </div>
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

export default Privacy;