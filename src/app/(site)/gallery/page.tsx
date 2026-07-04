import Image from 'next/image';
import Link from 'next/link';
import { Images } from 'lucide-react';
import PageHero from '@/components/page-hero';
import { GALLERY_IMAGES } from '@/lib/gallery';
import { prisma } from '@/lib/prisma';

export default async function GalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { photos: true } } },
  });

  return (
    <>
      <PageHero
        kicker="Moments"
        title="Gallery"
        description="Photos from our services, events, and community life."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((image) => (
              <a
                key={image.src}
                href={image.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-video overflow-hidden rounded-2xl border border-brand-100 shadow-sm transition-shadow hover:shadow-md"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm font-semibold text-white">
                  {image.caption}
                </span>
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-brand-400">
            See more photos on our{' '}
            <a
              href="https://www.facebook.com/210christiangospelassembly/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 hover:text-brand-950"
            >
              Facebook page
            </a>
            .
          </p>
        </div>
      </section>

      {albums.length > 0 && (
        <section className="bg-brand-50/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-950">Photo Albums</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/gallery/${album.id}`}
                  className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative flex aspect-video items-center justify-center bg-brand-100">
                    {album.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any host
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <Images className="h-10 w-10 text-brand-700" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-brand-950">{album.title}</h3>
                    <p className="mt-1 text-sm text-brand-400">{album._count.photos} photos</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
