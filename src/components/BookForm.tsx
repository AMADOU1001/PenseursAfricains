import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Upload, X } from 'lucide-react';

interface BookFormData {
  id?: string;
  title: string;
  author: string;
  description: string;
  cover_url?: string;
  pdf_preview_url?: string;
}

interface BookFormProps {
  book?: BookFormData;
  onSuccess: () => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(book?.cover_url || null);
  
  const [formData, setFormData] = useState<BookFormData>({
    title: book?.title || '',
    author: book?.author || '',
    description: book?.description || '',
    cover_url: book?.cover_url || '',
    pdf_preview_url: book?.pdf_preview_url || ''
  });

  const handleInputChange = (field: keyof BookFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${timestamp}-${randomString}.${file.name.split('.').pop()}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (error) {
      console.error('Erreur upload:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let coverUrl = formData.cover_url;
      let pdfUrl = formData.pdf_preview_url;

      // Upload cover image if provided
      if (coverFile) {
        const uploadedCoverUrl = await uploadFile(coverFile, 'book-covers');
        if (uploadedCoverUrl) {
          coverUrl = uploadedCoverUrl;
        }
      }

      // Upload PDF if provided
      if (pdfFile) {
        const uploadedPdfUrl = await uploadFile(pdfFile, 'book-previews');
        if (uploadedPdfUrl) {
          pdfUrl = uploadedPdfUrl;
        }
      }

      const bookData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        cover_url: coverUrl,
        pdf_preview_url: pdfUrl,
        available: true
      };

      let error;

      if (book?.id) {
        // Update existing book
        const result = await supabase
          .from('books')
          .update(bookData)
          .eq('id', book.id);
        error = result.error;
      } else {
        // Create new book
        const result = await supabase
          .from('books')
          .insert([bookData]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Le livre a été ${book?.id ? 'modifié' : 'ajouté'} avec succès`
      });

      onSuccess();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: `Impossible de ${book?.id ? 'modifier' : 'ajouter'} le livre`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-atn-green">
          <BookOpen className="h-5 w-5" />
          {book?.id ? 'Modifier le livre' : 'Ajouter un livre'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="author">Auteur *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                />
              </div>


              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cover">Image de couverture</Label>
                <div className="space-y-2">
                  <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                  {coverPreview && (
                    <div className="relative w-32 h-40 border rounded-lg overflow-hidden">
                      <img
                        src={coverPreview}
                        alt="Aperçu couverture"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="pdf">Aperçu PDF</Label>
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                />
                {pdfFile && (
                  <p className="text-sm text-atn-green mt-1">
                    Fichier sélectionné: {pdfFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  {book?.id ? 'Modification...' : 'Ajout...'}
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  {book?.id ? 'Modifier' : 'Ajouter'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;