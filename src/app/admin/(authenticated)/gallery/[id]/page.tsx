import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateAlbum, addPhoto, deletePhoto } from '@/app/actions/gallery';
import AdminPageHeader from '@/components/admin-page-header';
import AlbumForm from '@/components/forms/album-form';
import DeleteButton from '@/components/delete-button';

export default async function EditAlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { photos: { orderBy: { createdAt: 'desc' } } },
  });

  if (!album) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <AdminPageHeader title={`Edit Album: ${album.title}`} />
        <AlbumForm action={updateAlbum.bind(null, id)} album={album} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">Photos ({album.photos.length})</h2>

        <form action={addPhoto.bind(null, id)} className="mb-6 flex gap-3 rounded-lg bg-white p-4 shadow">
          <input
            type="url"
            name="url"
            required
            placeholder="Photo URL"
            className="flex-1 rounded border border-gray-300 px-3 py-2"
          />
          <input
            type="text"
            name="caption"
            placeholder="Caption (optional)"
            className="flex-1 rounded border border-gray-300 px-3 py-2"
          />
          <button
            type="submit"
            className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
          >
            Add Photo
          </button>
        </form>

        {album.photos.length === 0 ? (
          <p className="text-gray-500">No photos in this album yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {album.photos.map((photo) => (
              <div key={photo.id} className="overflow-hidden rounded-lg bg-white shadow">
                {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any host */}
                <img src={photo.url} alt={photo.caption ?? ''} className="h-40 w-full object-cover" />
                <div className="flex items-center justify-between p-3">
                  <span className="truncate text-sm text-gray-600">{photo.caption || '—'}</span>
                  <form action={deletePhoto.bind(null, id, photo.id)}>
                    <DeleteButton />
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
