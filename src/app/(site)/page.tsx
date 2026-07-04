import Link from 'next/link';
import { CalendarDays, Clock, MapPin, CirclePlay, HeartHandshake } from 'lucide-react';
import HeroSlider, { type HeroSlide } from '@/components/hero-slider';
import SectionHeading from '@/components/section-heading';
import YoutubeCta from '@/components/youtube-cta';
import YoutubeVideoCard from '@/components/youtube-video-card';
import { prisma } from '@/lib/prisma';
import { sermonToVideo } from '@/lib/youtube';
import { PROGRAMS } from '@/lib/programs';

const SLIDES: HeroSlide[] = [
  {
    kicker: 'Welcome Home',
    title: 'A place to belong, grow, and worship together.',
    description:
      '210 Christian Gospel Assembly is a vibrant, Christ-centered community church in the Lodge neighbourhood of Georgetown, Guyana. Join us this Sunday.',
    ctaLabel: 'Plan Your Visit',
    ctaHref: '/contact',
    gradient: 'bg-gradient-to-br from-brand-950 via-brand-700 to-brand-900',
  },
  {
    kicker: 'Sunday Worship',
    title: 'Join us every Sunday at 10:00 AM.',
    description: 'Uplifting worship, practical teaching, and a warm welcome for every generation.',
    ctaLabel: 'See Service Times',
    ctaHref: '/about',
    gradient: 'bg-gradient-to-br from-brand-900 via-brand-600 to-brand-950',
  },
  {
    kicker: 'Get Connected',
    title: 'Find your place in one of our ministries.',
    description: 'From family life to community outreach, there is a place for you to serve and grow.',
    ctaLabel: 'Explore Ministries',
    ctaHref: '/ministries',
    gradient: 'bg-gradient-to-br from-brand-950 via-brand-400 to-brand-700',
  },
];

const QUICK_INFO = [
  { icon: Clock, label: 'Sunday Service', value: '10:00 AM' },
  { icon: MapPin, label: 'Location', value: 'Lodge, Georgetown' },
  { icon: CirclePlay, label: 'Watch Online', value: 'Recent services below' },
];

export default async function HomePage() {
  const sermons = await prisma.sermon.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { date: 'desc' },
    take: 3,
  });
  const videos = sermons.map(sermonToVideo).filter((v) => v !== null);
  const ministries = await prisma.ministry.findMany({ orderBy: { name: 'asc' }, take: 4 });

  return (
    <>
      <HeroSlider slides={SLIDES} />

      <section className="border-b border-brand-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {QUICK_INFO.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-brand-400">{item.label}</p>
                <p className="font-semibold text-brand-950">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Latest Messages"
            title="Recent Sermons"
            description="Catch up on what God has been teaching us together."
            linkHref="/sermons"
            linkLabel="View all sermons"
          />
          {videos.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <YoutubeVideoCard key={video.videoId} video={video} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-brand-400">
              No sermons have been posted yet — check back soon.
            </p>
          )}
          <div className="mt-6">
            <YoutubeCta />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="What's Happening"
            title="Programs & Community Events"
            description="There's always something happening at 210 CGA — come be a part of it."
            linkHref="/events"
            linkLabel="Learn more"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program) => (
              <div
                key={program.title}
                className="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-950">{program.title}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-400">
                  {program.frequency}
                </p>
                <p className="mt-2 text-sm text-brand-400">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Get Involved"
            title="Find Your Ministry"
            description="Community happens when we serve and grow together."
            linkHref="/ministries"
            linkLabel="View all ministries"
          />
          {ministries.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ministries.map((ministry) => (
                <div
                  key={ministry.id}
                  className="rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-accent-400">
                    <HeartHandshake className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-brand-950">{ministry.name}</h3>
                  {ministry.description && (
                    <p className="mt-2 text-sm text-brand-400">{ministry.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-brand-400">Ministry details are coming soon.</p>
          )}
        </div>
      </section>

      <section className="bg-brand-950 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            We&apos;d love to have you join us this Sunday.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100/80">
            No matter where you are on your journey of faith, there is a seat for you at 210 CGA.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-brand-950 shadow-lg transition-colors hover:bg-accent-400"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
