import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { NAV_LINKS } from '@/lib/nav';

const SOCIALS = [
  { label: 'Facebook', initials: 'f', href: 'https://www.facebook.com/210christiangospelassembly/' },
  { label: 'YouTube', initials: 'YT', href: 'https://www.youtube.com/@210christiangospelassembly8' },
];

export default function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src="/images/church-logo.jpg" alt="210 CGA crest" fill className="object-cover" />
              </span>
              <span className="text-lg font-bold text-white">210 CGA</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-brand-100/80">
              210 Christian Gospel Assembly is a vibrant, Christ-centered community church in
              Georgetown, Guyana — devoted to worship, growth, and serving our neighbors together.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold transition-colors hover:bg-white/20"
                >
                  {social.initials}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-100/80">
              {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Service Times
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-100/80">
              <li>Sunday Worship — 10:00 AM</li>
              <li>Wednesday Bible Study — 7:00 PM</li>
              <li>Friday Youth Night — 6:30 PM</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <span>66 Joseph Pollydore Street, Lodge Housing Scheme, Georgetown, Guyana</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                <span>+592 223-2711</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent-400" />
                <span>info@210cga.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-brand-100/60">
          © {new Date().getFullYear()} 210 Christian Gospel Assembly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
