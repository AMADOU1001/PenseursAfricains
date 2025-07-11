import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, User } from 'lucide-react';
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

interface Thinker {
  id: string;
  name: string;
  title: string;
  period?: string;
  category?: string;
  category_name?: string;
  category_domain?: string;
  description: string;
  image_url?: string;
  country?: string;
  birth_year?: number;
  death_year?: number;
  education?: string;
  career?: string;
  contributions_impact?: string;
  vision?: string;
  practical_impact?: string;
  works_projects_media?: any[];
  created_at: string;
}

interface ThinkerListProps {
  thinkers: Thinker[];
  onEdit: (thinker: Thinker) => void;
  onRefresh: () => void;
}

const ThinkerList: React.FC<ThinkerListProps> = ({ thinkers, onEdit, onRefresh }) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('thinkers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `${name} a été supprimé avec succès`
      });

      onRefresh();
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le penseur",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (thinkers.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun penseur enregistré pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-atn-green mb-6">
        Penseurs Enregistrés ({thinkers.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {thinkers.map((thinker) => (
          <Card key={thinker.id} className="hover:shadow-lg transition-shadow">
             <CardHeader className="pb-3">
               <div className="flex items-start space-x-4">
                 <div className="flex-shrink-0">
                   {thinker.image_url ? (
                     <img
                       src={thinker.image_url}
                       alt={thinker.name}
                       className="w-16 h-16 rounded-full object-cover border-2 border-atn-gold"
                     />
                   ) : (
                     <div className="w-16 h-16 rounded-full bg-atn-green/10 flex items-center justify-center">
                       <User className="h-8 w-8 text-atn-green" />
                     </div>
                   )}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                   <CardTitle className="text-lg text-atn-green truncate">
                     {thinker.name}
                   </CardTitle>
                   
                   {/* Pays et période */}
                   <div className="flex flex-wrap gap-2 items-center mt-1">
                     {thinker.country && (
                       <Badge variant="outline" className="text-xs">
                         {thinker.country}
                       </Badge>
                     )}
                     {(thinker.birth_year || thinker.death_year) && (
                       <span className="text-xs text-atn-gold font-medium">
                         {thinker.birth_year && thinker.death_year 
                           ? `${thinker.birth_year} - ${thinker.death_year}`
                           : thinker.birth_year 
                             ? `${thinker.birth_year} - Présent`
                             : `- ${thinker.death_year}`
                         }
                       </span>
                     )}
                     {thinker.period && !thinker.birth_year && !thinker.death_year && (
                       <span className="text-xs text-atn-gold font-medium">
                         {thinker.period}
                       </span>
                     )}
                   </div>
                   
                   {/* Catégorie */}
                   {(thinker.category_name || thinker.category) && (
                     <div className="mt-2">
                       <Badge variant="secondary" className="text-xs">
                         {thinker.category_name || thinker.category}
                       </Badge>
                       {thinker.category_domain && (
                         <div className="text-xs text-gray-500 mt-1">
                           {thinker.category_domain}
                         </div>
                       )}
                     </div>
                   )}
                 </div>
               </div>
             </CardHeader>
             
             <CardContent className="pt-0">
               <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                 {thinker.description}
               </p>
               
               {/* Informations supplémentaires si disponibles */}
               <div className="space-y-2 mb-4">
                 {thinker.education && (
                   <div className="text-xs">
                     <span className="font-medium text-atn-green">Éducation:</span>
                     <span className="text-gray-600 ml-1 line-clamp-1">{thinker.education}</span>
                   </div>
                 )}
                 {thinker.career && (
                   <div className="text-xs">
                     <span className="font-medium text-atn-green">Carrière:</span>
                     <span className="text-gray-600 ml-1 line-clamp-1">{thinker.career}</span>
                   </div>
                 )}
                 {thinker.works_projects_media && thinker.works_projects_media.length > 0 && (
                   <div className="text-xs">
                     <span className="font-medium text-atn-green">Œuvres:</span>
                     <span className="text-gray-600 ml-1">{thinker.works_projects_media.length} enregistrée(s)</span>
                   </div>
                 )}
               </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(thinker)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === thinker.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer <strong>{thinker.name}</strong> ?
                        Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(thinker.id, thinker.name)}
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

export default ThinkerList;