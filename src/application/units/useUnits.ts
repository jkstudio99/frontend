import { useQuery } from '@tanstack/react-query';
import { unitsApi } from '@/infrastructure/api/units.api';

export function useUnits() {
  return useQuery({
    queryKey: ['units'],
    queryFn: unitsApi.list,
    staleTime: 60_000,
  });
}
