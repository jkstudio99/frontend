import { useQuery } from '@tanstack/react-query';
import { medicinesApi } from '@/infrastructure/api/medicines.api';
import { medicineKeys } from './query-keys';

export function useMedicine(id: string) {
  return useQuery({
    queryKey: medicineKeys.detail(id),
    queryFn: () => medicinesApi.getById(id),
    enabled: !!id,
  });
}
