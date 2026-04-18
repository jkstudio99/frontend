import Link from 'next/link';
import { Pill, Home, LayoutDashboard } from 'lucide-react';

const navItems = [
  { href: '/(dashboard)', icon: Home, label: 'หน้าหลัก', match: /^\/[a-z]{2}$/ },
  { href: '/medicines', icon: Pill, label: 'รายการยา', match: /\/medicines/ },
];

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Sidebar */}
      <nav className="hidden md:flex w-16 lg:w-56 flex-col shrink-0 border-r border-[var(--border)] bg-[var(--surface)] py-4 px-2 lg:px-4">
        <div className="mb-6 flex items-center gap-2 px-2">
          <LayoutDashboard className="h-6 w-6 text-[var(--primary)] shrink-0" />
          <span className="hidden lg:block font-semibold text-[var(--text-primary)] truncate">ระบบยา</span>
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/th"
              className="flex items-center gap-3 rounded-[var(--radius)] px-2 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Home className="h-5 w-5 shrink-0" />
              <span className="hidden lg:block">หน้าหลัก</span>
            </Link>
          </li>
          <li>
            <Link
              href="/th/medicines"
              className="flex items-center gap-3 rounded-[var(--radius)] px-2 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Pill className="h-5 w-5 shrink-0" />
              <span className="hidden lg:block">รายการยา</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
