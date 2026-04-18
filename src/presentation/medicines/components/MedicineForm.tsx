'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/presentation/components/ui/input';
import { Button } from '@/presentation/components/ui/button';
import { createMedicineSchema, type CreateMedicineInput } from '@/domain/schemas/medicine.schema';
import type { Medicine } from '@/domain/types/medicine.types';

interface Props {
  defaultValues?: Partial<Medicine>;
  onSubmit: (data: CreateMedicineInput) => void;
  isPending: boolean;
  mode: 'create' | 'edit';
}

const DOSAGE_FORMS = ['tablet', 'capsule', 'syrup', 'injection', 'cream', 'other'] as const;
const STATUSES = ['active', 'inactive', 'discontinued'] as const;

export function MedicineForm({ defaultValues, onSubmit, isPending, mode }: Props) {
  const t = useTranslations('medicines');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMedicineInput>({
    resolver: zodResolver(createMedicineSchema),
    defaultValues: defaultValues
      ? {
          code: defaultValues.code,
          name_th: defaultValues.name_th,
          name_en: defaultValues.name_en,
          generic_name: defaultValues.generic_name ?? undefined,
          brand_name: defaultValues.brand_name ?? undefined,
          category_id: defaultValues.category_id,
          unit_id: defaultValues.unit_id,
          dosage_form: defaultValues.dosage_form,
          strength: defaultValues.strength ?? undefined,
          manufacturer: defaultValues.manufacturer ?? undefined,
          description_th: defaultValues.description_th ?? '',
          description_en: defaultValues.description_en ?? '',
          image_url: defaultValues.image_url ?? undefined,
          status: defaultValues.status ?? 'active',
        }
      : { status: 'active' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
      {/* Code */}
      <div className="col-span-full flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.code')}</label>
        <Input {...register('code')} placeholder="e.g. MED-001" disabled={mode === 'edit'} />
        {errors.code && <p className="text-xs text-[var(--error)]">{errors.code.message}</p>}
      </div>

      {/* name_th / name_en */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.nameTh')}</label>
        <Input {...register('name_th')} />
        {errors.name_th && <p className="text-xs text-[var(--error)]">{errors.name_th.message}</p>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.nameEn')}</label>
        <Input {...register('name_en')} />
        {errors.name_en && <p className="text-xs text-[var(--error)]">{errors.name_en.message}</p>}
      </div>

      {/* generic_name / brand_name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.genericName')}</label>
        <Input {...register('generic_name')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.brandName')}</label>
        <Input {...register('brand_name')} />
      </div>

      {/* dosage_form */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.dosageForm')}</label>
        <select
          {...register('dosage_form')}
          className="flex h-9 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
        >
          <option value="">—</option>
          {DOSAGE_FORMS.map((f) => (
            <option key={f} value={f}>{t(`dosageForm.${f}`)}</option>
          ))}
        </select>
        {errors.dosage_form && <p className="text-xs text-[var(--error)]">{errors.dosage_form.message}</p>}
      </div>

      {/* strength */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.strength')}</label>
        <Input {...register('strength')} placeholder="e.g. 500mg" />
      </div>

      {/* manufacturer */}
      <div className="col-span-full flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.manufacturer')}</label>
        <Input {...register('manufacturer')} />
      </div>

      {/* status (edit only) */}
      {mode === 'edit' && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">{t('form.status')}</label>
          <select
            {...register('status')}
            className="flex h-9 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{t(`status.${s}`)}</option>
            ))}
          </select>
        </div>
      )}

      {/* image_url */}
      <div className="col-span-full flex flex-col gap-1.5">
        <label className="text-sm font-medium">{t('form.imageUrl')}</label>
        <Input {...register('image_url')} type="url" placeholder="https://..." />
        {errors.image_url && <p className="text-xs text-[var(--error)]">{errors.image_url.message}</p>}
      </div>

      {/* submit */}
      <div className="col-span-full flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? t('common.loading', { ns: 'common' }) : t('actions.save')}
        </Button>
      </div>
    </form>
  );
}
