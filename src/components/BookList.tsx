import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, BookOpen, Eye, EyeOff } from 'lucide-react';
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

interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  cover_url?: string;
  pdf_preview_url?: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onRefresh: () => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onRefresh }) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('books')
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
        description: "Impossible de supprimer le livre",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const { error } = await supabase
        .from('books')
        .update({ available: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Livre ${!currentStatus ? 'publié' : 'masqué'} avec succès`
      });

      onRefresh();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive"
      });
    } finally {
      setTogglingId(null);
    }
  };

  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun livre enregistré pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-atn-green mb-6">
        Livres Enregistrés ({books.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-16 h-20 rounded object-cover border-2 border-atn-gold"
                    />
                  ) : (
                    <div className="w-16 h-20 rounded bg-atn-green/10 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-atn-green" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-atn-green truncate">
                    {book.title}
                  </CardTitle>
                  <p className="text-sm text-atn-gold font-medium">
                    {book.author}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={book.available ? "default" : "secondary"}>
                      {book.available ? "Disponible" : "Masqué"}
                    </Badge>
                    {book.pdf_preview_url && (
                      <Badge variant="outline" className="text-xs">
                        PDF
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {book.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {book.description}
                </p>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(book)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleAvailability(book.id, book.available)}
                  disabled={togglingId === book.id}
                >
                  {book.available ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === book.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer <strong>"{book.title}"</strong> ?
                        Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(book.id, book.title)}
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

export default BookList;