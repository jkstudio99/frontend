import { apiClient } from './client';
import type { Medicine, MedicineFilter, PaginatedMedicines } from '@/domain/types/medicine.types';
import type { CreateMedicineInput, UpdateMedicineInput } from '@/domain/schemas/medicine.schema';

export const medicinesApi = {
  list: (filter: MedicineFilter) =>
    apiClient.get<PaginatedMedicines>('/medicines', { params: filter }).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<Medicine>(`/medicines/${id}`).then((r) => r.data),
  create: (body: CreateMedicineInput) =>
    apiClient.post<Medicine>('/medicines', body).then((r) => r.data),
  update: (id: string, body: UpdateMedicineInput) =>
    apiClient.patch<Medicine>(`/medicines/${id}`, body).then((r) => r.data),
  remove: (id: string) =>
    apiClient.delete(`/medicines/${id}`),
};
