'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { MedicineStatusBadge } from '@/presentation/medicines/components/MedicineStatusBadge';
import { DeleteMedicineDialog } from '@/presentation/medicines/components/DeleteMedicineDialog';
import { useMedicine } from '@/application/medicines/useMedicine';

export default function MedicineDetailPage() {
  const t = useTranslations('medicines');
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();
  const { data: medicine, isLoading } = useMedicine(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl p-4 sm:p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-center">
        <p className="text-[var(--text-secondary)]">{t('messages.notFound')}</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.back()}>
          ย้อนกลับ
        </Button>
      </div>
    );
  }

  const dosageFormLabel: Record<string, string> = {
    tablet: 'ยาเม็ด', capsule: 'ยาแคปซูล', syrup: 'ยาน้ำเชื่อม',
    injection: 'ยาฉีด', cream: 'ยาครีม', other: 'อื่นๆ',
  };

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-start gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">{medicine.nameTh}</h1>
            <MedicineStatusBadge status={medicine.status} />
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{medicine.nameEn} · {medicine.code}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/${locale}/medicines/${id}/edit`)}>
            <Pencil className="size-4 mr-1" />
            {t('actions.edit')}
          </Button>
          <DeleteMedicineDialog medicine={medicine} />
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          {([
            [t('form.code'), medicine.code],
            [t('form.nameTh'), medicine.nameTh],
            [t('form.nameEn'), medicine.nameEn],
            [t('form.genericName'), medicine.genericName],
            [t('form.brandName'), medicine.brandName],
            [t('form.dosageForm'), dosageFormLabel[medicine.dosageForm]],
            [t('form.strength'), medicine.strength],
            [t('form.manufacturer'), medicine.manufacturer],
            [t('form.status'), t(`status.${medicine.status}`)],
          ] as [string, string | null][]).map(([label, value]) => (
            <div key={label}>
              <dt className="text-[var(--text-secondary)]">{label}</dt>
              <dd className="font-medium text-[var(--text-primary)]">{value ?? '—'}</dd>
            </div>
          ))}
          {medicine.descriptionTh && (
            <div className="col-span-2">
              <dt className="text-[var(--text-secondary)]">{t('form.descriptionTh')}</dt>
              <dd className="mt-1 font-medium text-[var(--text-primary)]">{medicine.descriptionTh}</dd>
            </div>
          )}
          {medicine.descriptionEn && (
            <div className="col-span-2">
              <dt className="text-[var(--text-secondary)]">{t('form.descriptionEn')}</dt>
              <dd className="mt-1 font-medium text-[var(--text-primary)]">{medicine.descriptionEn}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
