'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/presentation/components/ui/button';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { MedicineForm } from '@/presentation/medicines/components/MedicineForm';
import { useMedicine } from '@/application/medicines/useMedicine';
import { useUpdateMedicine } from '@/application/medicines/useUpdateMedicine';
import type { CreateMedicineInput } from '@/domain/schemas/medicine.schema';

export default function EditMedicinePage() {
  const t = useTranslations('medicines');
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const router = useRouter();

  const { data: medicine, isLoading } = useMedicine(id);
  const { mutate: update, isPending } = useUpdateMedicine(id);

  function handleSubmit(data: CreateMedicineInput) {
    update(data, {
      onSuccess: () => {
        toast.success(t('messages.updateSuccess'));
        router.push(`/${locale}/medicines/${id}`);
      },
      onError: (err: Error) => toast.error(err.message || t('messages.unknownError')),
    });
  }

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {t('actions.edit')}
          </h1>
          {medicine && (
            <p className="text-sm text-[var(--text-secondary)]">{medicine.nameTh}</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : medicine ? (
          <MedicineForm
            defaultValues={medicine}
            onSubmit={handleSubmit}
            isPending={isPending}
            mode="edit"
          />
        ) : (
          <p className="text-center text-[var(--text-secondary)]">{t('messages.notFound')}</p>
        )}
      </div>
    </div>
  );
}
