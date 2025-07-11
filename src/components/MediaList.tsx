import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Image, Video, Calendar, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Media {
  id: string;
  title: string;
  description?: string;
  media_url: string;
  type: 'image' | 'video' | 'event';
  event_date?: string;
  uploaded_at: string;
}

interface MediaListProps {
  media: Media[];
  onEdit: (media: Media) => void;
  onRefresh: () => void;
}

const MediaList: React.FC<MediaListProps> = ({ media, onEdit, onRefresh }) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('media_gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `"${title}" a été supprimé avec succès`
      });

      onRefresh();
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le média",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'image':
        return 'Image';
      case 'video':
        return 'Vidéo';
      case 'event':
        return 'Événement';
      default:
        return 'Média';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (media.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun média enregistré pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-atn-green mb-6">
        Galerie Média ({media.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                  {item.type === 'image' ? (
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : item.type === 'video' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Video className="h-12 w-12 text-gray-400" />
                      <span className="ml-2 text-gray-600">Vidéo</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-atn-green/10">
                      <Calendar className="h-12 w-12 text-atn-green" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-atn-green truncate">
                    {item.title}
                  </CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getTypeIcon(item.type)}
                    {getTypeLabel(item.type)}
                  </Badge>
                </div>
                
                {item.event_date && (
                  <p className="text-sm text-atn-gold">
                    📅 {formatDate(item.event_date)}
                  </p>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {item.description}
                </p>
              )}
              
              <p className="text-xs text-gray-400 mb-4">
                Ajouté le {formatDate(item.uploaded_at)}
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(item.media_url, '_blank')}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === item.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer <strong>"{item.title}"</strong> ?
                        Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(item.id, item.title)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaList;