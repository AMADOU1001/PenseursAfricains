import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, BookOpen, GraduationCap, Briefcase, Target, Lightbulb, TrendingUp, ExternalLink, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WorksProjectsMedia {
  title: string;
  url: string;
  year?: string;
  type?: string;
}

interface Thinker {
  id: string;
  name: string;
  title: string;
  description: string;
  period?: string;
  category?: string;
  image_url?: string;
  education?: string;
  career?: string;
  contributions_impact?: string;
  vision?: string;
  practical_impact?: string;
  works_projects_media?: WorksProjectsMedia[];
  country?: string;
  birth_year?: number;
  death_year?: number;
}

const ThinkerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [thinker, setThinker] = useState<Thinker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThinker = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('thinkers')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Transform the data to match our interface
        const transformedData: Thinker = {
          ...data,
          works_projects_media: data.works_projects_media 
            ? (Array.isArray(data.works_projects_media) ? data.works_projects_media as unknown as WorksProjectsMedia[] : [])
            : []
        };
        
        setThinker(transformedData);
      } catch (error) {
        console.error('Erreur lors du chargement du penseur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThinker();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-atn-white">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <div className="text-atn-green">Chargement...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!thinker) {
    return (
      <div className="min-h-screen bg-atn-white">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-2xl text-atn-green mb-4">Penseur non trouvé</h1>
          <Button onClick={() => navigate('/penseurs')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux penseurs
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atn-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-[#006B3F] text-white relative overflow-hidden">
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
          <AnimatedSection>
            <Button 
              variant="outline" 
              className="bg-atn-gold text-atn-black border-white hover:bg-white hover:text-atn-green mb-6"
              onClick={() => navigate('/penseurs')}
            >
              <ArrowLeft className="mr-2 h-4 w-4 " />
              Retour aux penseurs
            </Button>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-1/3">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  {thinker.image_url ? (
                    <img
                      src={thinker.image_url}
                      alt={thinker.name}
                      className="w-full h-80 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/African-thinkers-uploads/cac2f267-5795-48f3-983e-0efbcea45d23.png";
                      }}
                    />
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-br from-atn-red to-atn-gold rounded-lg flex items-center justify-center">
                      <User className="h-20 w-20 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-white">
                  {thinker.name}
                </h1>
                <p className="text-xl text-atn-gold mb-4">{thinker.title}</p>
                
                 <div className="flex flex-wrap gap-4 mb-6">
                   {thinker.country && (
                     <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                       <MapPin className="mr-2 h-4 w-4" />
                       <span className="text-sm">{thinker.country}</span>
                     </div>
                   )}
                   {thinker.period && (
                     <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                       <Calendar className="mr-2 h-4 w-4" />
                       <span className="text-sm">{thinker.period}</span>
                     </div>
                   )}
                   {(thinker.birth_year || thinker.death_year) && (
                     <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                       <Calendar className="mr-2 h-4 w-4" />
                       <span className="text-sm">
                         {thinker.birth_year && thinker.death_year 
                           ? `${thinker.birth_year} - ${thinker.death_year}`
                           : thinker.birth_year 
                             ? `${thinker.birth_year} - Présent`
                             : `- ${thinker.death_year}`
                         }
                       </span>
                     </div>
                   )}
                   {thinker.category && (
                     <div className="flex items-center bg-atn-gold/20 rounded-full px-4 py-2">
                       <BookOpen className="mr-2 h-4 w-4" />
                       <span className="text-sm">{thinker.category}</span>
                     </div>
                   )}
                 </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-poppins font-bold text-atn-green mb-6">
                À propos de {thinker.name}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-atn-black/80 leading-relaxed text-lg">
                  {thinker.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Education Section */}
            {thinker.education && (
              <AnimatedSection className="slide-in-left">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-atn-green/10 p-3 rounded-full mr-4">
                      <GraduationCap className="h-6 w-6 text-atn-green" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-atn-green">Éducation</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-atn-black/80 leading-relaxed whitespace-pre-line">
                      {thinker.education}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Career Section */}
            {thinker.career && (
              <AnimatedSection className="slide-in-right">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-atn-gold/10 p-3 rounded-full mr-4">
                      <Briefcase className="h-6 w-6 text-atn-gold" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-atn-green">Carrière</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-atn-black/80 leading-relaxed whitespace-pre-line">
                      {thinker.career}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Contributions & Impact Section */}
            {thinker.contributions_impact && (
              <AnimatedSection className="slide-in-left">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-atn-red/10 p-3 rounded-full mr-4">
                      <Target className="h-6 w-6 text-atn-red" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-atn-green">Contributions & Impact</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-atn-black/80 leading-relaxed whitespace-pre-line">
                      {thinker.contributions_impact}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Vision Section */}
            {thinker.vision && (
              <AnimatedSection className="slide-in-right">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-500/10 p-3 rounded-full mr-4">
                      <Lightbulb className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-atn-green">Vision</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-atn-black/80 leading-relaxed whitespace-pre-line">
                      {thinker.vision}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Practical Impact Section */}
            {thinker.practical_impact && (
              <AnimatedSection className="slide-in-left">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-500/10 p-3 rounded-full mr-4">
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-atn-green">Impact Pratique</h3>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-atn-black/80 leading-relaxed whitespace-pre-line">
                      {thinker.practical_impact}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Works & Projects Section */}
            {thinker.works_projects_media && thinker.works_projects_media.length > 0 && (
              <AnimatedSection className="slide-in-right">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-500/10 p-3 rounded-full mr-4">
                      <BookOpen className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-poppins font-bold text-atn-green">Œuvres & Projets</h3>
                  </div>
                  <div className="space-y-4">
                    {thinker.works_projects_media.map((work, index) => (
                      <div key={index} className="border-l-4 border-atn-gold pl-6 py-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-atn-green mb-1">{work.title}</h4>
                            {work.year && (
                              <p className="text-sm text-atn-black/60 mb-2">Année: {work.year}</p>
                            )}
                            {work.type && (
                              <span className="inline-block bg-atn-gold/20 text-atn-gold text-xs px-2 py-1 rounded-full">
                                {work.type}
                              </span>
                            )}
                          </div>
                          {work.url && (
                            <a
                              href={work.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-atn-green hover:text-atn-green-dark transition-colors"
                            >
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThinkerDetail;