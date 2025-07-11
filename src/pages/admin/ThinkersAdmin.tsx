import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import ThinkerForm from '@/components/ThinkerForm';
import ThinkerList from '@/components/ThinkerList';
import { Plus } from 'lucide-react';
import { useThinkers } from '@/hooks/useSupabaseData';

interface ThinkerData {
  id: string;
  name: string;
  title: string;
  period?: string;
  category?: string;
  category_name?: string;
  category_domain?: string;
  category_id?: string;
  description: string;
  image_url?: string;
  education?: string;
  career?: string;
  contributions_impact?: string;
  vision?: string;
  practical_impact?: string;
  works_projects_media?: any[];
  country?: string;
  birth_year?: number;
  death_year?: number;
  created_at: string;
}

const ThinkersAdmin = () => {
  const { thinkers, loading, error, refetch } = useThinkers();
  const [showForm, setShowForm] = useState(false);
  const [editingThinker, setEditingThinker] = useState<ThinkerData | null>(null);

  const handleAddNew = () => {
    setEditingThinker(null);
    setShowForm(true);
  };

  const handleEdit = (thinker: ThinkerData) => {
    setEditingThinker(thinker);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingThinker(null);
    refetch();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingThinker(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-atn-gold">
        <div className="space-y-6 p-6">
        {showForm ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-atn-green">
                {editingThinker ? 'Modifier le penseur' : 'Nouveau penseur'}
              </h1>
            </div>
            
            <ThinkerForm
              thinker={editingThinker ? {
                id: editingThinker.id,
                name: editingThinker.name,
                period: editingThinker.period || '',
                description: editingThinker.description,
                category: editingThinker.category || editingThinker.category_name || '',
                category_id: editingThinker.category_id,
                image_url: editingThinker.image_url,
                education: editingThinker.education || '',
                career: editingThinker.career || '',
                contributions_impact: editingThinker.contributions_impact || '',
                vision: editingThinker.vision || '',
                practical_impact: editingThinker.practical_impact || '',
                works_projects_media: editingThinker.works_projects_media ? 
                  Array.isArray(editingThinker.works_projects_media) 
                    ? editingThinker.works_projects_media 
                    : Object.entries(editingThinker.works_projects_media).map(([title, url]) => ({ title, url: url as string }))
                  : [],
                country: editingThinker.country || '',
                birth_year: editingThinker.birth_year,
                death_year: editingThinker.death_year
              } : undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-atn-green">Gestion des penseurs</h1>
                <p className="text-gray-600 mt-2">Ajouter et gérer les penseurs africains</p>
              </div>
              <Button onClick={handleAddNew} className="btn-primary bg-atn-green">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau penseur
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                Erreur: {error}
              </div>
            )}

            <ThinkerList
              thinkers={thinkers || []}
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

export default ThinkersAdmin;