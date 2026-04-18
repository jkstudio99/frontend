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
      toast.success('เพิ่มยาสำเร็จ');
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
    },
  });
}
