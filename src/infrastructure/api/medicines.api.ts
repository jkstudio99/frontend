import { apiClient } from './client';
import type {
  Medicine,
  MedicineFilter,
  PaginatedMedicines,
} from '@/domain/types/medicine.types';
import type { CreateMedicineInput, UpdateMedicineInput } from '@/domain/schemas/medicine.schema';

export const medicinesApi = {
  list: (filter: MedicineFilter) =>
    apiClient
      .get<{ data: Medicine[]; meta: { pagination: { page: number; limit: number; total: number; totalPages: number } } }>('/medicines', { params: filter })
      .then((r) => ({ data: r.data.data, meta: r.data.meta.pagination } satisfies PaginatedMedicines)),
  getById: (id: string) =>
    apiClient.get<{ data: Medicine }>(`/medicines/${id}`).then((r) => r.data.data),
  create: (body: CreateMedicineInput) =>
    apiClient.post<{ data: Medicine }>('/medicines', body).then((r) => r.data.data),
  update: (id: string, body: UpdateMedicineInput) =>
    apiClient.patch<{ data: Medicine }>(`/medicines/${id}`, body).then((r) => r.data.data),
  remove: (id: string) =>
    apiClient.delete(`/medicines/${id}`),
};
