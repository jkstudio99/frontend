import { useQuery } from '@tanstack/react-query';
import { medicinesApi } from '@/infrastructure/api/medicines.api';
import { medicineKeys } from './query-keys';
import type { MedicineFilter } from '@/domain/types/medicine.types';

export function useMedicines(filter: MedicineFilter) {
  return useQuery({
    queryKey: medicineKeys.list(filter),
    queryFn: () => medicinesApi.list(filter),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}
