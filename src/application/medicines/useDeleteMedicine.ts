'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { medicinesApi } from '@/infrastructure/api/medicines.api';
import { medicineKeys } from './query-keys';
import type { AxiosError } from 'axios';

export function useDeleteMedicine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => medicinesApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: medicineKeys.lists() });
    },
    onError: (_err: AxiosError<{ message: string }>) => {
      // caller handles toast via mutate() options
    },
  });
}
