import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import MediaForm from '@/components/MediaForm';
import MediaList from '@/components/MediaList';
import { Plus } from 'lucide-react';
import { useMediaGallery } from '@/hooks/useSupabaseData';

interface MediaData {
  id: string;
  title: string;
  description?: string;
  media_url: string;
  type: 'image' | 'video' | 'event';
  event_date?: string;
  uploaded_at: string;
}

const GalleryAdmin = () => {
  const { media, loading, error, refetch } = useMediaGallery();
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaData | null>(null);

  const handleAddNew = () => {
    setEditingMedia(null);
    setShowForm(true);
  };

  const handleEdit = (media: MediaData) => {
    setEditingMedia(media);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingMedia(null);
    refetch();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingMedia(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-atn-gold">
        <div className="space-y-6 p-6">
        {showForm ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-atn-green">
                {editingMedia ? 'Modifier le média' : 'Nouveau média'}
              </h1>
            </div>
            
            <MediaForm
              media={editingMedia ? {
                id: editingMedia.id,
                title: editingMedia.title,
                description: editingMedia.description || '',
                type: editingMedia.type,
                media_url: editingMedia.media_url,
                event_date: editingMedia.event_date
              } : undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-atn-green">Gestion de la galerie</h1>
                <p className="text-gray-600 mt-2">Ajouter et gérer les médias</p>
              </div>
              <Button onClick={handleAddNew} className="btn-primary bg-atn-green">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau média
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                Erreur: {error}
              </div>
            )}

            <MediaList
              media={media || []}
              onEdit={handleEdit}
              onRefresh={refetch}
            />
          </div>
        )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default GalleryAdmin;