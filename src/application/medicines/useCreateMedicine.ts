'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { medicinesApi } from '@/infrastructure/api/medicines.api';
import { medicineKeys } from './query-keys';
import type { CreateMedicineInput } from '@/domain/schemas/medicine.schema';
import type { AxiosError } from 'axios';

export function useCreateMedicine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateMedicineInput) => medicinesApi.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: medicineKeys.lists() });
    },
    onError: (_err: AxiosError<{ message: string }>) => {
      // caller handles toast via mutate() options
    },
  });
}
