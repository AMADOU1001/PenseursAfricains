import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import BlurText from '@/components/BlurText';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Play, ExternalLink } from 'lucide-react';
import { useMediaGallery } from '@/hooks/useSupabaseData';

// Import historical images
import ghanaFlagGirl from '@/assets/ghana-flag-girl-1957.jpg';
import ghanaCrowd from '@/assets/ghana-independence-crowd-1957.jpg';
import mandelaRivonia from '@/assets/mandela-rivonia-trial-1964.jpg';
import mandelaLeaving from '@/assets/mandela-leaving-court-1964.jpg';
import haileSelassieCoronation from '@/assets/haile-selassie-coronation-1930.jpg';
import haileSelassieCrowd from '@/assets/haile-selassie-crowd-1930.jpg';
import haileSelassieDelegations from '@/assets/haile-selassie-delegations-1930.jpg';
import haileSelassieMilitary from '@/assets/haile-selassie-military-1930.jpg';

const MediaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { media, loading } = useMediaGallery();

  // Map local image paths to imported assets
  const getImageSrc = (mediaUrl: string) => {
    const imageMap: { [key: string]: string } = {
      '/src/assets/ghana-flag-girl-1957.jpg': ghanaFlagGirl,
      '/src/assets/ghana-independence-crowd-1957.jpg': ghanaCrowd,
      '/src/assets/mandela-rivonia-trial-1964.jpg': mandelaRivonia,
      '/src/assets/mandela-leaving-court-1964.jpg': mandelaLeaving,
      '/src/assets/haile-selassie-coronation-1930.jpg': haileSelassieCoronation,
      '/src/assets/haile-selassie-crowd-1930.jpg': haileSelassieCrowd,
      '/src/assets/haile-selassie-delegations-1930.jpg': haileSelassieDelegations,
      '/src/assets/haile-selassie-military-1930.jpg': haileSelassieMilitary,
    };
    
    return imageMap[mediaUrl] || mediaUrl;
  };

  const mediaItem = media.find(item => item.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-atn-white">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-atn-green">Chargement...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!mediaItem) {
    return (
      <div className="min-h-screen bg-atn-white">
        <Navbar />
        <div className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-atn-black mb-4">Média non trouvé</h1>
          <Button onClick={() => navigate('/galerie')} className="bg-atn-green hover:bg-atn-green-dark">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la galerie
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = mediaItem.type === 'video' ? getVideoId(mediaItem.media_url || '') : null;

  return (
    <div className="min-h-screen bg-atn-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-[#006B3F] text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Button 
              variant="outline"
              onClick={() => navigate('/galerie')}
              className="mb-6 border-white text-white hover:bg-white hover:text-atn-green"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la galerie
            </Button>
            
            <BlurText 
              text={mediaItem.title}
              delay={300}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-5xl font-poppins font-bold mb-4 text-white"
            />
            
            {mediaItem.event_date && (
              <div className="flex items-center text-white/90 mb-6">
                <Calendar className="mr-2 h-5 w-5" />
                <span className="text-lg">
                  {new Date(mediaItem.event_date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Media Display */}
            <AnimatedSection animation="scale-in" delay={200}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-atn-red to-atn-gold flex items-center justify-center relative">
                  {mediaItem.type === 'video' && videoId ? (
                    <div className="w-full h-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={mediaItem.title}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  ) : mediaItem.type === 'video' ? (
                    <div 
                      className="w-full h-full relative cursor-pointer group"
                      onClick={() => {
                        if (mediaItem.media_url) {
                          window.open(mediaItem.media_url, '_blank');
                        }
                      }}
                    >
                      <img 
                        src={videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ''}
                        alt={mediaItem.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-12 w-12 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={getImageSrc(mediaItem.media_url || '')} 
                      alt={mediaItem.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (mediaItem.media_url) {
                          e.currentTarget.src = mediaItem.media_url;
                        }
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Button 
                  className="w-full bg-atn-green hover:bg-atn-green-dark text-white"
                  onClick={() => {
                    if (mediaItem.media_url) {
                      window.open(mediaItem.media_url, '_blank');
                    }
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {mediaItem.type === 'video' ? 'Regarder sur YouTube' : 'Voir la source'}
                </Button>
              </div>
            </AnimatedSection>

            {/* Details */}
            <AnimatedSection animation="fade-in" delay={400}>
              <div className="space-y-8">
                
                {/* Type Badge */}
                <div className="flex items-center space-x-2">
                  <div className="bg-atn-green text-white px-4 py-2 rounded-full text-sm font-medium capitalize flex items-center space-x-2">
                    {mediaItem.type === 'video' ? <Play className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                    <span>{mediaItem.type === 'video' ? 'Vidéo' : 'Image'} historique</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-poppins font-bold text-atn-green mb-4">
                    Description
                  </h2>
                  <p className="text-atn-black leading-relaxed text-lg">
                    {mediaItem.description}
                  </p>
                </div>

                {/* Historical Context */}
                <div>
                  <h2 className="text-2xl font-poppins font-bold text-atn-green mb-4">
                    Contexte historique
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-atn-black leading-relaxed">
                      {mediaItem.event_date && mediaItem.title.includes('Ghana') && (
                        "L'indépendance du Ghana le 6 mars 1957 marque un tournant majeur dans l'histoire de l'Afrique. Sous la direction de Kwame Nkrumah, le Ghana devient le premier pays d'Afrique subsaharienne à obtenir son indépendance, inspirant de nombreux autres mouvements de libération à travers le continent."
                      )}
                      {mediaItem.title.includes('Mandela') && (
                        "Le procès de Rivonia (1963-1964) fut un moment décisif dans la lutte contre l'apartheid en Afrique du Sud. Nelson Mandela et ses co-accusés furent jugés pour sabotage et tentative de renversement violent du gouvernement. Le discours de Mandela 'I Am Prepared to Die' reste l'un des plus puissants témoignages de la lutte pour la liberté."
                      )}
                      {mediaItem.title.includes('Selassie') && (
                        "Le couronnement d'Haile Selassie Ier en 1930 fut un événement d'envergure internationale, attirant des dignitaires du monde entier. Cet événement symbolisait la modernisation de l'Éthiopie et son entrée sur la scène internationale, tout en préservant ses traditions anciennes."
                      )}
                      {mediaItem.title.includes('Cabral') && (
                        "Amílcar Cabral fut l'une des figures les plus importantes de la lutte anticoloniale en Afrique. Ses réflexions sur la culture, l'identité et la libération nationale ont profondément influencé les mouvements de libération à travers l'Afrique et au-delà."
                      )}
                      {mediaItem.title.includes('Senghor') && (
                        "Léopold Sédar Senghor, poète, intellectuel et homme d'État, fut l'un des principaux théoriciens de la négritude et de l'identité africaine. Ses discours à l'ONU et ailleurs ont contribué à façonner la vision de l'Afrique dans le monde post-colonial."
                      )}
                      {!mediaItem.title.includes('Ghana') && !mediaItem.title.includes('Mandela') && !mediaItem.title.includes('Selassie') && !mediaItem.title.includes('Cabral') && !mediaItem.title.includes('Senghor') && (
                        "Ce document historique témoigne des moments cruciaux de l'histoire africaine et de la lutte pour l'indépendance, la dignité et la liberté des peuples africains."
                      )}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div>
                  <h2 className="text-2xl font-poppins font-bold text-atn-green mb-4">
                    Informations
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-atn-black">Type :</span>
                      <span className="text-atn-black/70 capitalize">{mediaItem.type}</span>
                    </div>
                    {mediaItem.event_date && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-atn-black">Date de l'événement :</span>
                        <span className="text-atn-black/70">
                          {new Date(mediaItem.event_date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-atn-black">Ajouté le :</span>
                      <span className="text-atn-black/70">
                        {new Date(mediaItem.uploaded_at).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
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

export default MediaDetail;