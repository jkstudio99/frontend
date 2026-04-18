export type MedicineStatus = 'active' | 'inactive' | 'discontinued';
export type DosageForm = 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'other';

export interface Medicine {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  genericName: string | null;
  brandName: string | null;
  categoryId: string;
  unitId: string;
  dosageForm: DosageForm;
  strength: string | null;
  manufacturer: string | null;
  descriptionTh: string | null;
  descriptionEn: string | null;
  imageUrl: string | null;
  status: MedicineStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MedicineListResponse {
  data: Medicine[];
  meta: { pagination: PaginationMeta };
}

export interface MedicineFilter {
  search?: string;
  status?: MedicineStatus;
  categoryId?: string;
  page?: number;
  limit?: number;
}
