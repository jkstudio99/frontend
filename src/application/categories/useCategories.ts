import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/infrastructure/api/categories.api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.list,
    staleTime: 60_000,
  });
}
