import PageHero from '@/components/page-hero';
import YoutubeCta from '@/components/youtube-cta';
import YoutubeVideoCard from '@/components/youtube-video-card';
import { prisma } from '@/lib/prisma';
import { sermonToVideo } from '@/lib/youtube';

export default async function SermonsPage() {
  const sermons = await prisma.sermon.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { date: 'desc' },
  });
  const videos = sermons.map(sermonToVideo).filter((v) => v !== null);

  return (
    <>
      <PageHero
        kicker="Watch & Listen"
        title="Sermons"
        description="Explore messages from our recent services and sermon series."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {videos.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {videos.map((video) => (
                <YoutubeVideoCard key={video.videoId} video={video} />
              ))}
            </div>
          ) : (
            <p className="text-center text-brand-400">
              No sermons have been posted yet — check back soon.
            </p>
          )}
          <div className="mx-auto mt-10 max-w-3xl">
            <YoutubeCta />
            <p className="mt-6 text-center text-sm text-brand-400">
              Browse our full library of past services and sermon series on YouTube.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
