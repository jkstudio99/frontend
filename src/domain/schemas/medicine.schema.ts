import { z } from 'zod';

export const createMedicineSchema = z.object({
  code: z.string().min(2).max(50).toUpperCase().regex(/^[A-Z0-9][A-Z0-9-]{1,49}$/, 'Only uppercase letters, numbers and hyphens'),
  nameTh: z.string().min(1).max(255),
  nameEn: z.string().min(1).max(255),
  genericName: z.string().max(255).optional(),
  brandName: z.string().max(255).optional(),
  categoryId: z.string().uuid(),
  unitId: z.string().uuid(),
  dosageForm: z.enum(['tablet', 'capsule', 'syrup', 'injection', 'cream', 'other']),
  strength: z.string().max(100).optional(),
  manufacturer: z.string().max(255).optional(),
  descriptionTh: z.string().optional(),
  descriptionEn: z.string().optional(),
  imageUrl: z.string().url().nullable().optional(),
  status: z.enum(['active', 'inactive', 'discontinued']).default('active'),
});

export const updateMedicineSchema = createMedicineSchema.partial();

export type CreateMedicineInput = z.infer<typeof createMedicineSchema>;
export type UpdateMedicineInput = z.infer<typeof updateMedicineSchema>;
