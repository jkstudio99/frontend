'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/presentation/components/ui/input';
import { Button } from '@/presentation/components/ui/button';
import { createMedicineSchema } from '@/domain/schemas/medicine.schema';
import type { CreateMedicineInput } from '@/domain/schemas/medicine.schema';
import type { Medicine } from '@/domain/types/medicine.types';
import { useCategories } from '@/application/categories/useCategories';
import { useUnits } from '@/application/units/useUnits';

interface Props {
  defaultValues?: Partial<Medicine>;
  onSubmit: (data: CreateMedicineInput) => void;
  isPending: boolean;
  mode: 'create' | 'edit';
}

const DOSAGE_FORMS = ['tablet', 'capsule', 'syrup', 'injection', 'cream', 'other'] as const;
const STATUSES = ['active', 'inactive', 'discontinued'] as const;

const selectClass =
  'flex h-9 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]';

export function MedicineForm({ defaultValues, onSubmit, isPending, mode }: Props) {
  const t = useTranslations('medicines');
  const { data: categories = [] } = useCategories();
  const { data: units = [] } = useUnits();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMedicineInput>({
    resolver: zodResolver(createMedicineSchema),
    defaultValues: {
      code: defaultValues?.code ?? '',
      nameTh: defaultValues?.nameTh ?? '',
      nameEn: defaultValues?.nameEn ?? '',
      genericName: defaultValues?.genericName ?? '',
      brandName: defaultValues?.brandName ?? '',
      categoryId: defaultValues?.categoryId ?? '',
      unitId: defaultValues?.unitId ?? '',
      dosageForm: defaultValues?.dosageForm ?? 'tablet',
      strength: defaultValues?.strength ?? '',
      manufacturer: defaultValues?.manufacturer ?? '',
      descriptionTh: defaultValues?.descriptionTh ?? '',
      descriptionEn: defaultValues?.descriptionEn ?? '',
      imageUrl: defaultValues?.imageUrl ?? undefined,
      status: defaultValues?.status ?? 'active',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
      {/* code */}
      <div className="col-span-full flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.code')}</label>
        <Input {...register('code')} placeholder="MED-001" disabled={mode === 'edit'} />
        {errors.code && <p className="text-xs text-[var(--error)]">{errors.code.message}</p>}
      </div>

      {/* nameTh / nameEn */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.nameTh')}</label>
        <Input {...register('nameTh')} />
        {errors.nameTh && <p className="text-xs text-[var(--error)]">{errors.nameTh.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.nameEn')}</label>
        <Input {...register('nameEn')} />
        {errors.nameEn && <p className="text-xs text-[var(--error)]">{errors.nameEn.message}</p>}
      </div>

      {/* genericName / brandName */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.genericName')}</label>
        <Input {...register('genericName')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.brandName')}</label>
        <Input {...register('brandName')} />
      </div>

      {/* categoryId / unitId */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.category')}</label>
        <select {...register('categoryId')} className={selectClass}>
          <option value="">— เลือกหมวดหมู่ —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.nameTh}</option>
          ))}
        </select>
        {errors.categoryId && <p className="text-xs text-[var(--error)]">{errors.categoryId.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.unit')}</label>
        <select {...register('unitId')} className={selectClass}>
          <option value="">— เลือกหน่วย —</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>{u.nameTh}</option>
          ))}
        </select>
        {errors.unitId && <p className="text-xs text-[var(--error)]">{errors.unitId.message}</p>}
      </div>

      {/* dosageForm / strength */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.dosageForm')}</label>
        <select {...register('dosageForm')} className={selectClass}>
          {DOSAGE_FORMS.map((f) => (
            <option key={f} value={f}>{t(`dosageForm.${f}`)}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.strength')}</label>
        <Input {...register('strength')} placeholder="500mg" />
      </div>

      {/* manufacturer */}
      <div className="col-span-full flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.manufacturer')}</label>
        <Input {...register('manufacturer')} />
      </div>

      {/* descriptionTh / descriptionEn */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.descriptionTh')}</label>
        <textarea {...register('descriptionTh')} rows={3} className={`${selectClass} h-auto py-2`} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.descriptionEn')}</label>
        <textarea {...register('descriptionEn')} rows={3} className={`${selectClass} h-auto py-2`} />
      </div>

      {/* status */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.status')}</label>
        <select {...register('status')} className={selectClass}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{t(`status.${s}`)}</option>
          ))}
        </select>
      </div>

      {/* imageUrl */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.imageUrl')}</label>
        <Input {...register('imageUrl')} type="url" placeholder="https://..." />
        {errors.imageUrl && <p className="text-xs text-[var(--error)]">{errors.imageUrl.message}</p>}
      </div>

      {/* submit */}
      <div className="col-span-full flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? '...' : t('actions.save')}
        </Button>
      </div>
    </form>
  );
}
