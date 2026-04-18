import { Pill } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-8">
      <div className="rounded-full bg-[var(--primary)]/10 p-6">
        <Pill className="h-12 w-12 text-[var(--primary)]" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">ระบบจัดการยา</h1>
        <p className="mt-2 text-[var(--text-secondary)]">ยินดีต้อนรับสู่ระบบจัดการยา</p>
      </div>
      <Link
        href={`/${locale}/medicines`}
        className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
      >
        <Pill className="h-4 w-4" />
        ดูรายการยา
      </Link>
    </div>
  );
}
