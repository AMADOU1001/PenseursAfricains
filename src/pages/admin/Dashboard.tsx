import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Image, Newspaper, TrendingUp, Eye } from 'lucide-react';
import { useThinkers, useBooks, useMediaGallery, useAdminArticles } from '@/hooks/useSupabaseData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { thinkers } = useThinkers();
  const { books } = useBooks();
  const { media } = useMediaGallery();
  const { articles, totalCount: articlesCount } = useAdminArticles(1, 5);

  const stats = [
    {
      title: 'Penseurs',
      value: thinkers?.length || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Livres',
      value: books?.length || 0,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Médias',
      value: media?.length || 0,
      icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Articles',
      value: articlesCount || 0,
      icon: Newspaper,
      color: 'text-atn-red',
      bgColor: 'bg-blue-50'
    }
  ];

  const publishedArticles = articles?.filter(article => article.published) || [];
  const draftArticles = articles?.filter(article => !article.published) || [];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-atn-gold">
        <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-atn-gold">Dashboard</h1>
          <p className="text-atn-gold-600 mt-2">Vue d'ensemble de votre plateforme</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6 ">
                <div className="flex items-center justify-between ">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-atn-green">
                <Newspaper className="h-5 w-5" />
                Articles récents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles?.slice(0, 5).map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-3 bg-atn-gold/10 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{article.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(article.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Badge variant={article.published ? "default" : "secondary"}>
                      {article.published ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </div>
                )) || (
                  <p className="text-gray-500 text-sm">Aucun article pour le moment</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-atn-green">
                <TrendingUp className="h-5 w-5" />
                Résumé des contenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-atn-gold/10 rounded-lg">
                  <span className="text-sm font-medium">Articles publiés</span>
                  <Badge className="bg-atn-gold text-atn-green">
                    {publishedArticles.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-atn-gold/20 rounded-lg">
                  <span className="text-sm font-medium">Brouillons</span>
                  <Badge variant="secondary" className="bg-atn-gold/30 text-atn-green">
                    {draftArticles.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-atn-gold/10 rounded-lg">
                  <span className="text-sm font-medium">Penseurs actifs</span>
                  <Badge className="bg-atn-gold text-atn-green">
                    {thinkers?.length || 0}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-atn-gold/15 rounded-lg">
                  <span className="text-sm font-medium">Livres disponibles</span>
                  <Badge className="bg-atn-gold text-atn-green">
                    {books?.length || 0}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-atn-green">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="p-6 h-auto flex flex-col items-start gap-3 hover:bg-atn-gold/10 border-atn-gold/20"
                  onClick={() => navigate('/admin/thinkers')}
                >
                  <Users className="h-8 w-8 text-sm font-medium" />
                  <div className="text-left">
                    <h3 className="font-medium">Ajouter un penseur</h3>
                    <p className="text-sm font-medium">Enrichir la base de données des penseurs africains</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-6 h-auto flex flex-col items-start gap-3 hover:bg-atn-gold/10 border-atn-gold/20"
                  onClick={() => navigate('/admin/news')}
                >
                  <Newspaper className="h-8 w-8 text-sm font-medium" />
                  <div className="text-left">
                    <h3 className="font-medium">Publier un article</h3>
                    <p className="text-sm font-medium">Partager les dernières actualités</p>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="p-6 h-auto flex flex-col items-start gap-3 hover:bg-atn-gold/10 border-atn-gold/20"
                  onClick={() => navigate('/admin/books')}
                >
                  <BookOpen className="h-8 w-8 text-sm font-medium" />
                  <div className="text-left">
                    <h3 className="font-medium">Ajouter un livre</h3>
                    <p className="text-sm font-medium">Compléter la bibliothèque</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;