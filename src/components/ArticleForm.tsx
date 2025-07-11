import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, X, Upload } from 'lucide-react';

interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
  featured_image_url?: string;
  category_id?: string | null;
}

interface ArticleFormProps {
  article?: Article;
  onSuccess: () => void;
  onCancel: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    published: article?.published || false,
    featured_image_url: article?.featured_image_url || '',
    category_id: article?.category_id || null
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        featured_image_url: data.publicUrl
      }));

      toast({
        title: "Succès",
        description: "Image téléchargée avec succès"
      });
    } catch (error) {
      console.error('Erreur upload image:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger l'image",
        variant: "destructive"
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!formData.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est requis",
        variant: "destructive"
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Erreur",
        description: "Le contenu est requis",
        variant: "destructive"
      });
      return;
    }

    if (!formData.slug.trim()) {
      toast({
        title: "Erreur", 
        description: "Le slug est requis",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Vérification de l'authentification utilisateur
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour créer un article",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    try {
      const articleData = {
        ...formData,
        // Nettoyer les données avant l'envoi
        category_id: formData.category_id || null,
        excerpt: formData.excerpt?.trim() || null,
        featured_image_url: formData.featured_image_url?.trim() || null,
        published_at: formData.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      // Sauvegarde de l'article (création ou mise à jour)
      if (article?.id) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id);
        
        if (error) throw error;
        
        toast({
          title: "Succès",
          description: "Article modifié avec succès"
        });
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);
        
        if (error) throw error;
        
        toast({
          title: "Succès",
          description: "Article créé avec succès"
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'article",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-atn-green">
            {article ? 'Modifier l\'article' : 'Nouvel article'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Titre de l'article"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug URL *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="slug-de-larticle"
              required
            />
            <p className="text-xs text-gray-500">
              L'URL de l'article sera : /actualites/{formData.slug || 'slug-de-larticle'}
            </p>
          </div>

          {/* Résumé */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Résumé</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Résumé de l'article"
              rows={3}
            />
          </div>

          {/* Image à la une */}
          <div className="space-y-2">
            <Label>Image à la une</Label>
            {formData.featured_image_url ? (
              <div className="relative">
                <img 
                  src={formData.featured_image_url} 
                  alt="Image à la une" 
                  className="w-full h-48 object-cover rounded-md border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setFormData(prev => ({ ...prev, featured_image_url: '' }))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  {imageUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                  ) : (
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  )}
                  <p className="mt-2 text-sm text-gray-600">
                    Cliquer pour télécharger une image
                  </p>
                </Label>
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="space-y-2">
            <Label htmlFor="content">Contenu *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Contenu de l'article"
              rows={10}
              className="resize-y"
              required
            />
          </div>

          {/* Statut de publication */}
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
            <Label htmlFor="published">
              Publier l'article
              {formData.published && (
                <Badge variant="default" className="ml-2 bg-green-100 text-green-800">
                  Publié
                </Badge>
              )}
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="btn-primary">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {article ? 'Modifier' : 'Créer'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default ArticleForm;