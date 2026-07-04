'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import type { Session } from 'next-auth';

export default function AdminDashboardClient({ session }: { session: Session }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">210 CGA Admin</h1>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">{session.user?.email}</p>
              <p className="text-xs text-gray-500">{session.user?.role}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/admin/login' })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome, {session.user?.name}!</h2>

          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/admin/sermons"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Sermons</h3>
              <p className="text-gray-600 text-sm">Manage sermons and sermon series</p>
            </Link>

            <Link
              href="/admin/events"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Events</h3>
              <p className="text-gray-600 text-sm">Manage church events</p>
            </Link>

            <Link
              href="/admin/announcements"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Announcements</h3>
              <p className="text-gray-600 text-sm">Post announcements and news</p>
            </Link>

            <Link
              href="/admin/pages"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Pages</h3>
              <p className="text-gray-600 text-sm">Create static pages</p>
            </Link>

            <Link
              href="/admin/ministries"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Ministries</h3>
              <p className="text-gray-600 text-sm">Manage ministries</p>
            </Link>

            <Link
              href="/admin/staff"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Staff</h3>
              <p className="text-gray-600 text-sm">Manage team members</p>
            </Link>

            <Link
              href="/admin/gallery"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Gallery</h3>
              <p className="text-gray-600 text-sm">Manage photo galleries</p>
            </Link>

            <Link
              href="/admin/prayer-requests"
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold mb-2">Prayer Requests</h3>
              <p className="text-gray-600 text-sm">View submitted prayer requests</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
