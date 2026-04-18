import { apiClient } from './client';
import type { Unit } from '@/domain/types/unit.types';

export const unitsApi = {
  list: () =>
    apiClient.get<{ data: Unit[] }>('/units').then((r) => r.data.data),
};
