import type { MedicineFilter } from '@/domain/types/medicine.types';

export const medicineKeys = {
  all: ['medicines'] as const,
  lists: () => [...medicineKeys.all, 'list'] as const,
  list: (filter: MedicineFilter) => [...medicineKeys.lists(), filter] as const,
  details: () => [...medicineKeys.all, 'detail'] as const,
  detail: (id: string) => [...medicineKeys.details(), id] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
};

export const unitKeys = {
  all: ['units'] as const,
  list: () => [...unitKeys.all, 'list'] as const,
};
