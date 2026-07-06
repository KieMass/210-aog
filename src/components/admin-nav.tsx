'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ExternalLink } from 'lucide-react';
import type { Session } from 'next-auth';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/sermons', label: 'Sermons' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/ministries', label: 'Ministries' },
  { href: '/admin/staff', label: 'Staff' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/prayer-requests', label: 'Prayer Requests' },
];

export default function AdminNav({ session }: { session: Session }) {
  const pathname = usePathname();
  const links =
    session.user?.role === 'SUPER_ADMIN'
      ? [...ADMIN_LINKS, { href: '/admin/users', label: 'Users' }]
      : ADMIN_LINKS;

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="text-xl font-bold">
            210 CGA Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 sm:flex"
            >
              View Site
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <div className="text-right text-sm">
              <p className="text-gray-600">{session.user?.email}</p>
              <p className="text-xs text-gray-500">{session.user?.role}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
              className="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="mt-4 flex flex-wrap gap-1 border-t pt-3">
          {links.map((link) => {
            const active = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-3 py-1.5 text-sm font-medium ${
                  active ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
