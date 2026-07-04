import PageHero from '@/components/page-hero';
import YoutubeCta from '@/components/youtube-cta';

export default function SermonsPage() {
  return (
    <>
      <PageHero
        kicker="Watch & Listen"
        title="Sermons"
        description="Explore messages from our recent services and sermon series."
      />
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <YoutubeCta />
          <p className="mt-6 text-center text-sm text-brand-400">
            A searchable sermon library with individual messages is coming to this page soon.
          </p>
        </div>
      </section>
    </>
  );
}
