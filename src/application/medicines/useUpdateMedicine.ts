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
      toast.success('แก้ไขยาสำเร็จ');
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
    },
  });
}
