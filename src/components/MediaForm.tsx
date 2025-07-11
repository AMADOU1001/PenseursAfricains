import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Image, Upload, X, Calendar } from 'lucide-react';

interface MediaFormData {
  id?: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'event';
  media_url?: string;
  event_date?: string;
}

interface MediaFormProps {
  media?: MediaFormData;
  onSuccess: () => void;
  onCancel: () => void;
}

const MediaForm: React.FC<MediaFormProps> = ({ media, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(media?.media_url || null);
  
  const [formData, setFormData] = useState<MediaFormData>({
    title: media?.title || '',
    description: media?.description || '',
    type: media?.type || 'image',
    media_url: media?.media_url || '',
    event_date: media?.event_date || ''
  });

  const handleInputChange = (field: keyof MediaFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => setMediaPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setMediaPreview(null);
      }
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${timestamp}-${randomString}.${file.name.split('.').pop()}`;
    const filePath = `gallery/${fileName}`;

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
      let mediaUrl = formData.media_url;

      // Upload file if provided
      if (mediaFile) {
        const uploadedUrl = await uploadFile(mediaFile);
        if (uploadedUrl) {
          mediaUrl = uploadedUrl;
        }
      }

      const mediaData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        media_url: mediaUrl,
        event_date: formData.event_date || null
      };

      let error;

      if (media?.id) {
        // Update existing media
        const result = await supabase
          .from('media_gallery')
          .update(mediaData)
          .eq('id', media.id);
        error = result.error;
      } else {
        // Create new media
        const result = await supabase
          .from('media_gallery')
          .insert([mediaData]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Le média a été ${media?.id ? 'modifié' : 'ajouté'} avec succès`
      });

      onSuccess();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: `Impossible de ${media?.id ? 'modifier' : 'ajouter'} le média`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileAccept = () => {
    switch (formData.type) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      default:
        return 'image/*,video/*';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-atn-green">
          <Image className="h-5 w-5" />
          {media?.id ? 'Modifier le média' : 'Ajouter un média'}
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
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'image' | 'video' | 'event') => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Vidéo</SelectItem>
                    <SelectItem value="event">Événement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.type === 'event' && (
                <div>
                  <Label htmlFor="event_date">Date de l'événement</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => handleInputChange('event_date', e.target.value)}
                  />
                </div>
              )}

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
                <Label htmlFor="media">Fichier média *</Label>
                <div className="space-y-2">
                  <Input
                    id="media"
                    type="file"
                    accept={getFileAccept()}
                    onChange={handleFileChange}
                  />
                  {mediaPreview && formData.type === 'image' && (
                    <div className="relative w-full max-w-sm border rounded-lg overflow-hidden">
                      <img
                        src={mediaPreview}
                        alt="Aperçu"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  {mediaFile && formData.type === 'video' && (
                    <p className="text-sm text-atn-green">
                      Vidéo sélectionnée: {mediaFile.name}
                    </p>
                  )}
                </div>
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
                  {media?.id ? 'Modification...' : 'Ajout...'}
                </>
              ) : (
                <>
                  <Image className="h-4 w-4 mr-2" />
                  {media?.id ? 'Modifier' : 'Ajouter'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MediaForm;