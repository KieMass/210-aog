import Link from 'next/link';
import { verifySession } from '@/lib/dal';

const SECTIONS = [
  { href: '/admin/sermons', title: 'Sermons', description: 'Manage sermons and sermon series' },
  { href: '/admin/events', title: 'Events', description: 'Manage church events' },
  { href: '/admin/announcements', title: 'Announcements', description: 'Post announcements and news' },
  { href: '/admin/pages', title: 'Pages', description: 'Create static pages' },
  { href: '/admin/ministries', title: 'Ministries', description: 'Manage ministries' },
  { href: '/admin/staff', title: 'Staff', description: 'Manage team members' },
  { href: '/admin/gallery', title: 'Gallery', description: 'Manage photo albums' },
  { href: '/admin/prayer-requests', title: 'Prayer Requests', description: 'View submitted prayer requests' },
];

export default async function AdminDashboard() {
  const session = await verifySession();

  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h2 className="mb-6 text-2xl font-bold">Welcome, {session.user?.name}!</h2>
      <div className="grid grid-cols-2 gap-6">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border p-6 transition-shadow hover:shadow-lg"
          >
            <h3 className="mb-2 font-bold">{section.title}</h3>
            <p className="text-sm text-gray-600">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
