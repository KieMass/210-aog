import { CalendarDays, Clock, MapPin } from 'lucide-react';
import PageHero from '@/components/page-hero';
import { PROGRAMS } from '@/lib/programs';
import { prisma } from '@/lib/prisma';

export default async function EventsPage() {
  const upcomingEvents = await prisma.event.findMany({
    where: { status: 'PUBLISHED', startAt: { gte: new Date() } },
    orderBy: { startAt: 'asc' },
  });

  return (
    <>
      <PageHero
        kicker="What's Happening"
        title="Programs & Community Events"
        description="See what's coming up and find ways to get involved."
      />

      {upcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-950">Upcoming Events</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-brand-950">{event.title}</h3>
                  <div className="mt-3 space-y-1.5 text-sm text-brand-400">
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.startAt.toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                    {event.location && (
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </p>
                    )}
                  </div>
                  {event.description && (
                    <p className="mt-3 text-sm text-brand-400">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={upcomingEvents.length > 0 ? 'bg-brand-50/50 py-20' : 'py-20'}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <p className="mt-10 text-center text-sm text-brand-400">
            Specific dates and times for upcoming workshops and seminars are announced on our{' '}
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
    </>
  );
}
