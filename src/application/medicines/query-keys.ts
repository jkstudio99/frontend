import type { MedicineFilter } from '@/domain/types/medicine.types';

export const medicineKeys = {
  all: ['medicines'] as const,
  lists: () => ['medicines', 'list'] as const,
  list: (filter: MedicineFilter) => ['medicines', 'list', filter] as const,
  detail: (id: string) => ['medicines', 'detail', id] as const,
};
