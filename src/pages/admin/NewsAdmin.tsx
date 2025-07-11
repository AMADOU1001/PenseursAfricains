import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import ArticleForm from '@/components/ArticleForm';
import ArticleList from '@/components/ArticleList';
import { Plus } from 'lucide-react';
import { useAdminArticles } from '@/hooks/useSupabaseData';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
  featured_image_url?: string;
  category_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

const NewsAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const { articles, totalCount, loading, refetch } = useAdminArticles(currentPage, itemsPerPage);

  const handleAddNew = () => {
    setEditingArticle(null);
    setShowForm(true);
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingArticle(null);
    refetch();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingArticle(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-atn-gold">
        <div className="space-y-6 p-6">
        {showForm ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-atn-green">
                {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
              </h1>
            </div>
            
            <ArticleForm
              article={editingArticle ? {
                id: editingArticle.id,
                title: editingArticle.title,
                slug: editingArticle.slug,
                excerpt: editingArticle.excerpt || '',
                content: editingArticle.content,
                published: editingArticle.published,
                featured_image_url: editingArticle.featured_image_url,
                category_id: editingArticle.category_id
              } : undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-atn-green">Gestion des actualités</h1>
                <p className="text-gray-600 mt-2">Créer et gérer les articles d'actualité</p>
              </div>
              <Button onClick={handleAddNew} className="btn-primary bg-atn-green">
                <Plus className="h-4 w-4 mr-2" />
                Nouvel article
              </Button>
            </div>

            <ArticleList
              articles={articles || []}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={refetch}
              totalCount={totalCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsAdmin;