import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteAlbum } from '@/app/actions/gallery';
import { verifySession } from '@/lib/dal';
import AdminPageHeader from '@/components/admin-page-header';
import DeleteButton from '@/components/delete-button';

export default async function AdminGalleryPage() {
  const session = await verifySession();
  const canDelete = session.user?.role === 'SUPER_ADMIN' || session.user?.role === 'EDITOR';
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { photos: true } } },
  });

  return (
    <div>
      <AdminPageHeader title="Gallery Albums" newHref="/admin/gallery/new" />

      {albums.length === 0 ? (
        <p className="text-gray-500">No albums yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Album</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Photos</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {albums.map((album) => (
                <tr key={album.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{album.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{album._count.photos}</td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <Link href={`/admin/gallery/${album.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        Manage
                      </Link>
                      {canDelete && (
                        <form action={deleteAlbum.bind(null, album.id)}>
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
