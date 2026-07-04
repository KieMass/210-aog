import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteMinistry } from '@/app/actions/ministries';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

export default async function AdminMinistriesPage() {
  const ministries = await prisma.ministry.findMany({ orderBy: { name: 'asc' } });

  return (
    <div>
      <AdminPageHeader title="Ministries" newHref="/admin/ministries/new" />

      {ministries.length === 0 ? (
        <p className="text-gray-500">No ministries yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Leader</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Meeting Time</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ministries.map((ministry) => (
                <tr key={ministry.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ministry.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ministry.leaderName ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ministry.meetingTime ?? '—'}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/ministries/${ministry.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      <form action={deleteMinistry.bind(null, ministry.id)}>
                        <DeleteButton />
                      </form>
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
