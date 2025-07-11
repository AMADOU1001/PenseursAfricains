import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, X, User, Plus, Trash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCategories } from '@/hooks/useSupabaseData';

interface ThinkerData {
  id?: string;
  name: string;
  title?: string;
  period: string;
  description: string;
  category: string;
  category_id?: string;
  image_url?: string;
  education?: string;
  career?: string;
  contributions_impact?: string;
  vision?: string;
  practical_impact?: string;
  works_projects_media?: Array<{
    title: string;
    url: string;
    year?: string;
    type?: string;
  }>;
  country?: string;
  birth_year?: number;
  death_year?: number;
}

interface ThinkerFormProps {
  thinker?: ThinkerData;
  onSuccess: () => void;
  onCancel?: () => void;
}

const ThinkerForm: React.FC<ThinkerFormProps> = ({ thinker, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const { categories } = useCategories();
  
  const [formData, setFormData] = useState<ThinkerData>({
    name: thinker?.name || '',
    period: thinker?.period || '',
    description: thinker?.description || '',
    category: thinker?.category || '',
    category_id: thinker?.category_id || '',
    image_url: thinker?.image_url || '',
    education: thinker?.education || '',
    career: thinker?.career || '',
    contributions_impact: thinker?.contributions_impact || '',
    vision: thinker?.vision || '',
    practical_impact: thinker?.practical_impact || '',
    works_projects_media: thinker?.works_projects_media || [],
    country: thinker?.country || '',
    birth_year: thinker?.birth_year,
    death_year: thinker?.death_year
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(thinker?.image_url || '');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Organiser les catégories par domaines
  const categoriesByDomain = React.useMemo(() => {
    const domains: Record<string, any[]> = {};
    categories.forEach(category => {
      if (!domains[category.domain]) {
        domains[category.domain] = [];
      }
      domains[category.domain].push(category);
    });
    return domains;
  }, [categories]);

  const handleInputChange = (field: keyof ThinkerData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = categories.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      setFormData(prev => ({ 
        ...prev, 
        category_id: categoryId,
        category: selectedCategory.name 
      }));
    }
  };

  const addWork = () => {
    setFormData(prev => ({
      ...prev,
      works_projects_media: [
        ...(prev.works_projects_media || []),
        { title: '', url: '', year: '', type: '' }
      ]
    }));
  };

  const removeWork = (index: number) => {
    setFormData(prev => ({
      ...prev,
      works_projects_media: prev.works_projects_media?.filter((_, i) => i !== index) || []
    }));
  };

  const updateWork = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      works_projects_media: prev.works_projects_media?.map((work, i) => 
        i === index ? { ...work, [field]: value } : work
      ) || []
    }));
  };

  const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      setImageFile(imageFile);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(imageFile);
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image_url || null;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `thinkers/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: "Erreur d'upload",
        description: error instanceof Error ? error.message : "Impossible d'uploader l'image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category_id) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage();
      
      const thinkerData = {
        name: formData.name,
        title: formData.category,
        period: formData.period,
        description: formData.description,
        category_id: formData.category_id,
        image_url: imageUrl,
        education: formData.education,
        career: formData.career,
        contributions_impact: formData.contributions_impact,
        vision: formData.vision,
        practical_impact: formData.practical_impact,
        works_projects_media: formData.works_projects_media,
        country: formData.country,
        birth_year: formData.birth_year,
        death_year: formData.death_year
      };

      let error;
      if (thinker?.id) {
        const { error: updateError } = await supabase
          .from('thinkers')
          .update(thinkerData)
          .eq('id', thinker.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('thinkers')
          .insert([thinkerData]);
        error = insertError;
      }

      if (error) {
        console.error('Erreur base de données:', error);
        throw error;
      }

      toast({
        title: "Succès",
        description: `Penseur ${thinker?.id ? 'modifié' : 'ajouté'} avec succès`
      });

      onSuccess();
    } catch (error) {
      console.error('Erreur complète:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-atn-green">
          {thinker?.id ? 'Modifier le penseur' : 'Ajouter un penseur'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="!text-atn-green data-[state=active]:!text-atn-green">Général</TabsTrigger>
              <TabsTrigger value="academic" className="!text-atn-green data-[state=active]:!text-atn-green">Académique</TabsTrigger>
              <TabsTrigger value="impact" className="!text-atn-green data-[state=active]:!text-atn-green">Impact</TabsTrigger>
              <TabsTrigger value="works" className="!text-atn-green data-[state=active]:!text-atn-green">Œuvres</TabsTrigger>
            </TabsList>
            
            {/* Onglet Général */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Nom complet du penseur"
                    className="placeholder:text-atn-green"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Pays d'origine"
                    className="placeholder:text-atn-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birth_year">Année de naissance</Label>
                  <Input
                    id="birth_year"
                    type="number"
                    value={formData.birth_year || ''}
                    onChange={(e) => handleInputChange('birth_year', parseInt(e.target.value) || undefined)}
                    placeholder="1920"
                    className="placeholder:text-atn-green"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="death_year">Année de décès</Label>
                  <Input
                    id="death_year"
                    type="number"
                    value={formData.death_year || ''}
                    onChange={(e) => handleInputChange('death_year', parseInt(e.target.value) || undefined)}
                    placeholder="1990"
                    className="placeholder:text-atn-green"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="period">Période</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) => handleInputChange('period', e.target.value)}
                    placeholder="Ex: 1920-1990"
                    className="placeholder:text-atn-green"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={formData.category_id} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="placeholder:text-atn-green">
                    <SelectValue placeholder="Sélectionner une catégorie" className="text-atn-green" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {Object.entries(categoriesByDomain).map(([domain, domainCategories]) => (
                      <div key={domain}>
                        <div className="px-2 py-1 text-sm font-semibold text-atn-green bg-gray-50">
                          {domain}
                        </div>
                        {domainCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Biographie générale *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Biographie générale du penseur..."
                  className="placeholder:text-atn-green"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Photo</Label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-atn-green transition-colors cursor-pointer"
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('image-input')?.click()}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-atn-green">
                        Glissez une photo ici ou cliquez pour sélectionner
                      </p>
                    </div>
                  )}
                </div>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            </TabsContent>
            
            {/* Onglet Académique */}
            <TabsContent value="academic" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="education">Éducation</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="Formation académique, diplômes, institutions..."
                  className="placeholder:text-atn-green"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="career">Carrière</Label>
                <Textarea
                  id="career"
                  value={formData.career}
                  onChange={(e) => handleInputChange('career', e.target.value)}
                  placeholder="Parcours professionnel, postes occupés..."
                  className="placeholder:text-atn-green"
                  rows={4}
                />
              </div>
            </TabsContent>
            
            {/* Onglet Impact */}
            <TabsContent value="impact" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contributions_impact">Contributions & Impact</Label>
                <Textarea
                  id="contributions_impact"
                  value={formData.contributions_impact}
                  onChange={(e) => handleInputChange('contributions_impact', e.target.value)}
                  placeholder="Principales contributions et leur impact sur la société..."
                  className="placeholder:text-atn-green"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vision">Vision</Label>
                <Textarea
                  id="vision"
                  value={formData.vision}
                  onChange={(e) => handleInputChange('vision', e.target.value)}
                  placeholder="Vision et philosophie du penseur..."
                  className="placeholder:text-atn-green"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="practical_impact">Impact Pratique</Label>
                <Textarea
                  id="practical_impact"
                  value={formData.practical_impact}
                  onChange={(e) => handleInputChange('practical_impact', e.target.value)}
                  placeholder="Impact concret et applications pratiques de ses idées..."
                  className="placeholder:text-atn-green"
                  rows={4}
                />
              </div>
            </TabsContent>
            
            {/* Onglet Œuvres */}
            <TabsContent value="works" className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Œuvres & Projets</Label>
                <Button type="button" onClick={addWork} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une œuvre
                </Button>
              </div>
              
              {formData.works_projects_media?.map((work, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Œuvre #{index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removeWork(index)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Titre *</Label>
                      <Input
                        value={work.title}
                        onChange={(e) => updateWork(index, 'title', e.target.value)}
                        placeholder="Titre de l'œuvre"
                        className="placeholder:text-atn-green"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Année</Label>
                      <Input
                        value={work.year || ''}
                        onChange={(e) => updateWork(index, 'year', e.target.value)}
                        placeholder="2020"
                        className="placeholder:text-atn-green"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input
                        value={work.type || ''}
                        onChange={(e) => updateWork(index, 'type', e.target.value)}
                        placeholder="Livre, Article, Documentaire..."
                        className="placeholder:text-atn-green"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={work.url}
                        onChange={(e) => updateWork(index, 'url', e.target.value)}
                        placeholder="https://..."
                        className="placeholder:text-atn-green"
                        type="url"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {(!formData.works_projects_media || formData.works_projects_media.length === 0) && (
                <div className="text-center py-8 text-atn-green">
                  Aucune œuvre ajoutée. Cliquez sur "Ajouter une œuvre" pour commencer.
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 pt-4 border-t">
            <Button
              type="submit"
              disabled={loading || uploading}
              className="btn-primary flex-1"
            >
              {loading || uploading ? 'Enregistrement...' : (thinker?.id ? 'Modifier' : 'Ajouter')}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading || uploading}
              >
                Annuler
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ThinkerForm;