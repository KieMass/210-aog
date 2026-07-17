import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteAnnouncement } from '@/app/actions/announcements';
import { verifySession } from '@/lib/dal';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

export default async function AdminAnnouncementsPage() {
  const session = await verifySession();
  const canDelete = session.user?.role === 'SUPER_ADMIN' || session.user?.role === 'EDITOR';
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ priority: 'desc' }, { publishAt: 'desc' }],
  });

  return (
    <div>
      <AdminPageHeader title="Announcements" newHref="/admin/announcements/new" />

      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Publishes</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{a.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.publishAt.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.priority}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{a.status}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/announcements/${a.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      {canDelete && (
                        <form action={deleteAnnouncement.bind(null, a.id)}>
                          <DeleteButton />
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
