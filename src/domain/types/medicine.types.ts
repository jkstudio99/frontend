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

export interface MedicineFilter {
  page?: number;
  limit?: number;
  search?: string;
  status?: MedicineStatus;
  categoryId?: string;
}

export interface PaginatedMedicines {
  data: Medicine[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export interface Category {
  id: string;
  nameTh: string;
  nameEn: string;
}

export interface Unit {
  id: string;
  nameTh: string;
  nameEn: string;
  abbreviation: string;
}
