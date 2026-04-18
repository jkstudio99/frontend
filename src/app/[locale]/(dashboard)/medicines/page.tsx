'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { MedicineTable } from '@/presentation/medicines/components/MedicineTable';
import { useMedicines } from '@/application/medicines/useMedicines';
import type { MedicineFilter, MedicineStatus } from '@/domain/types/medicine.types';

export default function MedicinesPage() {
  const t = useTranslations('medicines');
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const [filter, setFilter] = useState<MedicineFilter>({ page: 1, limit: 20 });
  const { data, isLoading, isError } = useMedicines(filter);

  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const handleSearch = useCallback((search: string) => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setFilter((f) => ({ ...f, search: search || undefined, page: 1 }));
    }, 300);
  }, []);

  const handleStatusFilter = useCallback((status: string) => {
    setFilter((f) => ({
      ...f,
      status: status ? (status as MedicineStatus) : undefined,
      page: 1,
    }));
  }, []);

  const medicines = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>
        <Button onClick={() => router.push(`/${locale}/medicines/new`)}>
          <Plus className="size-4" />
          {t('actions.create')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder={t('search.placeholder')}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <select
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="h-9 rounded-[var(--radius)] border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label={t('filter.status')}
        >
          <option value="">{t('filter.all')}</option>
          <option value="active">{t('status.active')}</option>
          <option value="inactive">{t('status.inactive')}</option>
          <option value="discontinued">{t('status.discontinued')}</option>
        </select>
      </div>

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {t('messages.unknownError')}
        </div>
      )}

      {/* Table */}
      <MedicineTable medicines={medicines} isLoading={isLoading} locale={locale} />

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {t('pagination.showing', {
              from: (filter.page! - 1) * filter.limit! + 1,
              to: Math.min(filter.page! * filter.limit!, meta.total),
              total: meta.total,
            })}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={filter.page === 1}
              onClick={() => setFilter((f) => ({ ...f, page: f.page! - 1 }))}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={filter.page === meta.totalPages}
              onClick={() => setFilter((f) => ({ ...f, page: f.page! + 1 }))}
            >
              →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
