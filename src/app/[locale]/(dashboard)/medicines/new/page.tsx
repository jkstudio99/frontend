'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/presentation/components/ui/button';
import { MedicineForm } from '@/presentation/medicines/components/MedicineForm';
import { useCreateMedicine } from '@/application/medicines/useCreateMedicine';
import type { CreateMedicineInput } from '@/domain/schemas/medicine.schema';

export default function NewMedicinePage() {
  const t = useTranslations('medicines');
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const { mutate, isPending } = useCreateMedicine();

  function handleSubmit(data: CreateMedicineInput) {
    mutate(data, {
      onSuccess: () => {
        toast.success(t('messages.createSuccess'));
        router.push(`/${locale}/medicines`);
      },
      onError: (err: Error) => {
        if (err.message.includes('code') || err.message.includes('CONFLICT')) {
          toast.error(t('messages.codeExists'));
        } else {
          toast.error(err.message || t('messages.unknownError'));
        }
      },
    });
  }

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          aria-label={t('common.back')}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('actions.create')}</h1>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <MedicineForm onSubmit={handleSubmit} isPending={isPending} mode="create" />
      </div>
    </div>
  );
}
