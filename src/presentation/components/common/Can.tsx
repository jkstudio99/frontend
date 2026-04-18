'use client';

import { useAuthStore } from '@/persistence/auth.store';

interface CanProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ permission, children, fallback = null }: CanProps) {
  const user = useAuthStore((s) => s.user);
  const hasPermission = user?.permissions.includes(permission) ?? false;
  return <>{hasPermission ? children : fallback}</>;
}
