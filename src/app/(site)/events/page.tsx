import { CalendarDays } from 'lucide-react';
import PageHero from '@/components/page-hero';
import { PROGRAMS } from '@/lib/programs';

export default function EventsPage() {
  return (
    <>
      <PageHero
        kicker="What's Happening"
        title="Programs & Community Events"
        description="See what's coming up and find ways to get involved."
      />
      <section className="py-20">
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
