
import { useState, useEffect } from 'react';

// Hook générique pour les appels API
export const useApi = <T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = async () => {
    await fetchData();
  };

  return { data, loading, error, refetch };
};

// Hook pour les données paginées
export const usePaginatedApi = <T>(
  apiCall: (page: number, limit: number) => Promise<T>,
  initialPage = 1,
  limit = 10
) => {
  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall(page, limit);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    nextPage: () => setPage(prev => prev + 1),
    prevPage: () => setPage(prev => Math.max(1, prev - 1)),
  };
};

export default useApi;
