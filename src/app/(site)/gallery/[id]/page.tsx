import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PageHero from '@/components/page-hero';

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { photos: { orderBy: { createdAt: 'desc' } } },
  });

  if (!album) {
    notFound();
  }

  return (
    <>
      <PageHero kicker="Gallery" title={album.title} description={album.description ?? undefined} />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {album.photos.length === 0 ? (
            <p className="text-center text-brand-400">No photos in this album yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {album.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="overflow-hidden rounded-2xl border border-brand-100 shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any host */}
                  <img src={photo.url} alt={photo.caption ?? ''} className="aspect-video w-full object-cover" />
                  {photo.caption && (
                    <p className="p-3 text-sm text-brand-400">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
