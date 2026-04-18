import { apiClient } from './client';
import type { Category } from '@/domain/types/category.types';

export const categoriesApi = {
  list: () =>
    apiClient.get<{ data: Category[] }>('/categories').then((r) => r.data.data),
};
