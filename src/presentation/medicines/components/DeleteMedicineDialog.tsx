'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/presentation/components/ui/alert-dialog';
import { Button } from '@/presentation/components/ui/button';
import { useDeleteMedicine } from '@/application/medicines/useDeleteMedicine';
import type { Medicine } from '@/domain/types/medicine.types';

export function DeleteMedicineDialog({ medicine }: { medicine: Medicine }) {
  const t = useTranslations('medicines');
  const { mutate, isPending } = useDeleteMedicine();

  function handleDelete() {
    mutate(medicine.id, {
      onSuccess: () => toast.success(t('messages.deleteSuccess')),
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('actions.delete')}>
          <Trash2 className="size-4 text-error" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('confirm.deleteTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('confirm.deleteDescription', { name: medicine.nameTh })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('actions.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? '...' : t('actions.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
