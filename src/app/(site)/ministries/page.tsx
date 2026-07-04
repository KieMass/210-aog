import PageHero from '@/components/page-hero';
import { MINISTRIES } from '@/lib/ministries';

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        kicker="Get Involved"
        title="Ministries"
        description="Find where you belong and how you can serve."
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MINISTRIES.map((ministry) => (
              <div
                key={ministry.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-accent-400">
                  <ministry.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-brand-950">{ministry.title}</h3>
                <p className="mt-2 text-sm text-brand-400">{ministry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
