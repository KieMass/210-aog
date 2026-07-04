import Image from 'next/image';
import Link from 'next/link';
import { Cross, Mic, HeartHandshake, User } from 'lucide-react';
import PageHero from '@/components/page-hero';
import { prisma } from '@/lib/prisma';

export default async function AboutPage() {
  const staff = await prisma.staffMember.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <>
      <PageHero
        kicker="Our Story"
        title="About 210 CGA"
        description="An active, local Pentecostal church community in the Lodge neighbourhood of Georgetown, Guyana."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">
              Who We Are
            </p>
            <h2 className="mt-2 text-3xl font-bold text-brand-950">
              A community church with the community at heart
            </h2>
            <p className="mt-4 leading-7 text-brand-400">
              210 Christian Gospel Assembly is an active, local Pentecostal church community
              located in the Lodge neighbourhood of Georgetown, Guyana. We are formally
              registered under Christian Education and local church ministries within the
              region, and our congregation is built on worship, biblical teaching, and serving
              our neighbors together.
            </p>
            <p className="mt-4 leading-7 text-brand-400">
              We place a heavy emphasis on family-oriented ministries, community outreach, and
              biblical education — bringing our neighbours together through recurring forums,
              workshops, and Sunday worship.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg lg:aspect-auto">
            <Image
              src="/images/church-logo.jpg"
              alt="210 Christian Gospel Assembly crest"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-50/50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-sm sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-accent-400">
              <Cross className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-brand-950 sm:text-3xl">
              In Loving Memory of Rev. Joseph Sydney Gittens
            </h2>
            <p className="mt-4 leading-7 text-brand-400">
              Our congregation&apos;s identity is deeply tied to the legacy of our long-standing,
              iconic senior leader, Rev. Joseph Sydney Gittens, who was highly revered within
              both our local community and the broader Assemblies of God network in Guyana.
            </p>
            <p className="mt-4 leading-7 text-brand-400">
              In March 2025, he celebrated his historic 104th birthday, marking the occasion
              with a well-publicised morning walk along the Georgetown seawall. He went home to
              be with the Lord later that year in December 2025. His faith, endurance, and love
              for this community continue to guide who we are today.
            </p>
          </div>
        </div>
      </section>

      {staff.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">
              Leadership
            </p>
            <h2 className="mt-2 text-3xl font-bold text-brand-950">Our Team</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {staff.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-brand-50">
                    {member.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any host, next/image requires an allowlist
                      <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-8 w-8 text-brand-700" />
                    )}
                  </div>
                  <h3 className="mt-4 font-bold text-brand-950">{member.name}</h3>
                  <p className="text-sm text-accent-600">{member.title}</p>
                  {member.bio && <p className="mt-2 text-sm text-brand-400">{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Mic className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-brand-950">Visiting & Supporting Ministers</h3>
              <p className="mt-3 leading-7 text-brand-400">
                We frequently host regional Christian speakers and leaders. Prominent ministers,
                such as Rev. Fitzroy Tyrrell, are routinely brought in to spearhead our major
                community workshops and educational seminars.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-brand-950">Community Focus</h3>
              <p className="mt-3 leading-7 text-brand-400">
                Our recurring{' '}
                <Link href="/events" className="font-semibold text-brand-700 hover:text-brand-950">
                  Family Matters forum
                </Link>{' '}
                focuses on building strong Christian foundations, marriage counseling, and
                leadership within the home — with free registration open to the general public.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
