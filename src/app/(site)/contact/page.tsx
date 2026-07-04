import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PageHero from '@/components/page-hero';

const INFO_CARDS = [
  {
    icon: MapPin,
    title: 'Location',
    lines: ['66 Joseph Pollydore Street', 'Lodge Housing Scheme', 'Georgetown, Guyana'],
  },
  {
    icon: Clock,
    title: 'Service Times',
    lines: ['Sunday Worship — 10:00 AM', 'Wednesday Bible Study — 7:00 PM', 'Friday Youth Night — 6:30 PM'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+592 223-2711'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@210cga.org'],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="We'd Love to Meet You"
        title="Plan Your Visit"
        description="Here's everything you need to know to join us this week."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INFO_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <card.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-brand-950">{card.title}</h3>
                <div className="mt-2 space-y-1 text-sm text-brand-400">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand-100 shadow-sm">
            <iframe
              title="Map to 210 Christian Gospel Assembly"
              src="https://www.google.com/maps?q=66+Joseph+Pollydore+Street,+Lodge+Housing+Scheme,+Georgetown,+Guyana&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
