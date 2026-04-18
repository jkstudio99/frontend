'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { MedicineStatusBadge } from './MedicineStatusBadge';
import { DeleteMedicineDialog } from './DeleteMedicineDialog';
import type { Medicine } from '@/domain/types/medicine.types';

interface Props {
  medicines: Medicine[];
  isLoading: boolean;
  locale: string;
}

export function MedicineTable({ medicines, isLoading, locale }: Props) {
  const t = useTranslations('medicines');
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-h4 text-text-primary font-semibold">{t('empty.title')}</p>
        <p className="text-body text-text-secondary mt-1">{t('empty.description')}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--surface)]">
          <tr>
            {(['code', 'name', 'status', 'dosageForm', 'manufacturer', 'actions'] as const).map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]"
              >
                {t(`table.${col}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {medicines.map((med) => (
            <tr key={med.id} className="bg-[var(--bg)] hover:bg-[var(--surface)] transition-colors">
              <td className="px-4 py-3 font-mono text-xs font-medium">{med.code}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-[var(--text-primary)]">{med.name_th}</p>
                <p className="text-xs text-[var(--text-secondary)]">{med.name_en}</p>
              </td>
              <td className="px-4 py-3">
                <MedicineStatusBadge status={med.status} />
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">
                {t(`dosageForm.${med.dosage_form}`)}
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">{med.manufacturer ?? '—'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t('actions.view')}
                    onClick={() => router.push(`/${locale}/medicines/${med.id}`)}
                  >
                    <Eye className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t('actions.edit')}
                    onClick={() => router.push(`/${locale}/medicines/${med.id}?edit=1`)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <DeleteMedicineDialog medicine={med} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
