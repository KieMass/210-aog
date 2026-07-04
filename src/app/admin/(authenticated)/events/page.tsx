import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteEvent } from '@/app/actions/events';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { startAt: 'desc' } });

  return (
    <div>
      <AdminPageHeader title="Events" newHref="/admin/events/new" />

      {events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Starts</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{event.startAt.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{event.location ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{event.status}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/events/${event.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      <form action={deleteEvent.bind(null, event.id)}>
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
