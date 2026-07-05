'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LayoutDashboard } from 'lucide-react';

export default function AdminToolbar() {
  const { data: session, status } = useSession();

  if (status !== 'authenticated' || !session.user) return null;

  return (
    <div className="bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm sm:px-6 lg:px-8">
        <span className="text-gray-300">
          Viewing as <span className="font-medium text-white">{session.user.name}</span>
        </span>
        <Link href="/admin" className="flex items-center gap-1.5 font-medium text-white hover:text-gray-200">
          <LayoutDashboard className="h-3.5 w-3.5" />
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
