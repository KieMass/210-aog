import Link from 'next/link';
import {
  BookOpen,
  CalendarDays,
  Megaphone,
  FileText,
  HeartHandshake,
  Users,
  Images,
  HandHeart,
  ArrowRight,
} from 'lucide-react';
import { verifySession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const session = await verifySession();

  const [sermons, events, announcements, pages, ministries, staff, albums, prayerRequests] =
    await Promise.all([
      prisma.sermon.count(),
      prisma.event.count(),
      prisma.announcement.count(),
      prisma.page.count(),
      prisma.ministry.count(),
      prisma.staffMember.count(),
      prisma.galleryAlbum.count(),
      prisma.prayerRequest.count(),
    ]);

  const sections = [
    {
      href: '/admin/sermons',
      title: 'Sermons',
      description: 'Manage sermons and sermon series',
      icon: BookOpen,
      count: sermons,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      href: '/admin/events',
      title: 'Events',
      description: 'Manage church events',
      icon: CalendarDays,
      count: events,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      href: '/admin/announcements',
      title: 'Announcements',
      description: 'Post announcements and news',
      icon: Megaphone,
      count: announcements,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      href: '/admin/pages',
      title: 'Pages',
      description: 'Create static pages',
      icon: FileText,
      count: pages,
      color: 'bg-slate-100 text-slate-600',
    },
    {
      href: '/admin/ministries',
      title: 'Ministries',
      description: 'Manage ministries',
      icon: HeartHandshake,
      count: ministries,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      href: '/admin/staff',
      title: 'Staff',
      description: 'Manage team members',
      icon: Users,
      count: staff,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      href: '/admin/gallery',
      title: 'Gallery',
      description: 'Manage photo albums',
      icon: Images,
      count: albums,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      href: '/admin/prayer-requests',
      title: 'Prayer Requests',
      description: 'View submitted prayer requests',
      icon: HandHeart,
      count: prayerRequests,
      color: 'bg-pink-50 text-pink-600',
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Welcome, {session.user?.name}!
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${section.color}`}>
                <section.icon className="h-5 w-5" />
              </span>
              <span className="text-3xl font-bold text-gray-900">{section.count}</span>
            </div>
            <h3 className="mt-4 font-bold text-gray-900">{section.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{section.description}</p>
            <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  );
}
