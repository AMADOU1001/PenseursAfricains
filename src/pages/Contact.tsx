import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useContactSubmission } from '@/hooks/useSupabaseData';
import { toast } from 'sonner';

const Contact = () => {
  const { submitMessage, loading } = useContactSubmission();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const result = await submitMessage(formData);
    
    if (result.success) {
      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      toast.error('Erreur lors de l\'envoi du message');
    }
  };
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
              text="Contact"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white"
            />
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Rejoignez notre mission de valorisation de la pensée africaine
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <AnimatedSection animation="slide-in-left">
                <div>
                  <BlurText 
                    text="Parlons ensemble"
                    delay={200}
                    animateBy="words"
                    direction="top"
                    className="text-3xl font-poppins font-bold text-atn-green mb-6"
                  />
                  <p className="text-lg text-atn-black/80 mb-8 leading-relaxed">
                    Vous avez des questions, des suggestions ou souhaitez contribuer à notre projet ? 
                    N'hésitez pas à nous contacter.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-atn-red rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-atn-green">Email</h3>
                        <p className="text-atn-black/80">contact@africanthinkers.net</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-atn-gold rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-atn-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-atn-green">Téléphone</h3>
                        <p className="text-atn-black/80">+221 70 905 00 50</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-atn-green rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-atn-green">Adresse</h3>
                        <p className="text-atn-black/80">123 Rue de l'Unité Africaine, Dakar, Sénégal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Contact Form */}
              <AnimatedSection animation="slide-in-right">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atn-red focus:border-transparent"
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atn-red focus:border-transparent"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atn-red focus:border-transparent"
                        placeholder="Sujet de votre message"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-atn-green mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atn-red focus:border-transparent resize-none"
                        placeholder="Votre message..."
                        required
                      ></textarea>
                    </div>

                    <Button type="submit" className="btn-primary w-full" disabled={loading}>
                      <Send className="mr-2 h-5 w-5" />
                      {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
