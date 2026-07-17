import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteSermon } from '@/app/actions/sermons';
import { verifySession } from '@/lib/dal';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

export default async function AdminSermonsPage() {
  const session = await verifySession();
  const canDelete = session.user?.role === 'SUPER_ADMIN' || session.user?.role === 'EDITOR';
  const sermons = await prisma.sermon.findMany({ orderBy: { date: 'desc' } });

  return (
    <div>
      <AdminPageHeader title="Sermons" newHref="/admin/sermons/new" />

      {sermons.length === 0 ? (
        <p className="text-gray-500">No sermons yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Speaker</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sermons.map((sermon) => (
                <tr key={sermon.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{sermon.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sermon.speaker}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sermon.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sermon.status}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/sermons/${sermon.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      {canDelete && (
                        <form action={deleteSermon.bind(null, sermon.id)}>
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
