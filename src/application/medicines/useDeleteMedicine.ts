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
      toast.success('ลบยาสำเร็จ');
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data?.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่');
    },
  });
}
