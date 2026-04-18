'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { medicinesApi } from '@/infrastructure/api/medicines.api';
import { medicineKeys } from './query-keys';
import type { UpdateMedicineInput } from '@/domain/schemas/medicine.schema';
import type { AxiosError } from 'axios';

export function useUpdateMedicine(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateMedicineInput) => medicinesApi.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: medicineKeys.lists() });
      qc.invalidateQueries({ queryKey: medicineKeys.detail(id) });
    },
    onError: (_err: AxiosError<{ message: string }>) => {
      // caller handles toast via mutate() options
    },
  });
}
