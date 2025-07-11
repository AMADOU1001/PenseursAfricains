import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import BookForm from '@/components/BookForm';
import BookList from '@/components/BookList';
import { Plus } from 'lucide-react';
import { useBooks } from '@/hooks/useSupabaseData';

interface BookData {
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

const BooksAdmin = () => {
  const { books, loading, error, refetch } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<BookData | null>(null);

  const handleAddNew = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEdit = (book: BookData) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBook(null);
    refetch();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-atn-gold">
        <div className="space-y-6 p-6">
        {showForm ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-atn-green">
                {editingBook ? 'Modifier le livre' : 'Nouveau livre'}
              </h1>
            </div>
            
            <BookForm
              book={editingBook ? {
                id: editingBook.id,
                title: editingBook.title,
                author: editingBook.author,
                description: editingBook.description || '',
                cover_url: editingBook.cover_url,
                pdf_preview_url: editingBook.pdf_preview_url
              } : undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-atn-green">Gestion des livres</h1>
                <p className="text-gray-600 mt-2">Ajouter et gérer la bibliothèque</p>
              </div>
              <Button onClick={handleAddNew} className="btn-primary bg-atn-green">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau livre
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                Erreur: {error}
              </div>
            )}

            <BookList
              books={books || []}
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

export default BooksAdmin;