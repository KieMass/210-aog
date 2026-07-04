import { HeartHandshake } from 'lucide-react';
import PageHero from '@/components/page-hero';
import { prisma } from '@/lib/prisma';

export default async function MinistriesPage() {
  const ministries = await prisma.ministry.findMany({ orderBy: { name: 'asc' } });

  return (
    <>
      <PageHero
        kicker="Get Involved"
        title="Ministries"
        description="Find where you belong and how you can serve."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {ministries.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  {ministry.meetingTime && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent-600">
                      {ministry.meetingTime}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-brand-400">Ministry details are coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
