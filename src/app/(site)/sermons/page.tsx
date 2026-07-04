import PageHero from '@/components/page-hero';
import YoutubeCta from '@/components/youtube-cta';
import YoutubeVideoCard from '@/components/youtube-video-card';
import { SERMON_VIDEOS } from '@/lib/sermons';

export default function SermonsPage() {
  return (
    <>
      <PageHero
        kicker="Watch & Listen"
        title="Sermons"
        description="Explore messages from our recent services and sermon series."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {SERMON_VIDEOS.map((video) => (
              <YoutubeVideoCard key={video.videoId} video={video} />
            ))}
          </div>
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
