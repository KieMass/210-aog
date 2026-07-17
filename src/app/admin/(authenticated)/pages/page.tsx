import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deletePage } from '@/app/actions/pages';
import { verifySession } from '@/lib/dal';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

export default async function AdminPagesPage() {
  const session = await verifySession();
  const canDelete = session.user?.role === 'SUPER_ADMIN' || session.user?.role === 'EDITOR';
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <div>
      <AdminPageHeader title="Pages" newHref="/admin/pages/new" />

      {pages.length === 0 ? (
        <p className="text-gray-500">No pages yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">/p/{page.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{page.status}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/pages/${page.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      {canDelete && (
                        <form action={deletePage.bind(null, page.id)}>
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
