import { useTranslations } from 'next-intl';
import { Badge } from '@/presentation/components/ui/badge';
import { cn } from '@/shared/lib/utils';
import type { MedicineStatus } from '@/domain/types/medicine.types';

const classMap: Record<MedicineStatus, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-transparent',
  inactive: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-transparent',
  discontinued: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-transparent',
};

export function MedicineStatusBadge({ status }: { status: MedicineStatus }) {
  const t = useTranslations('medicines.status');
  return (
    <Badge variant="outline" className={cn(classMap[status])}>
      {t(status)}
    </Badge>
  );
}
