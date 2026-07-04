import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({
  kicker,
  title,
  description,
  linkHref,
  linkLabel,
}: {
  kicker: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">{kicker}</p>
        <h2 className="mt-2 text-3xl font-bold text-brand-950 sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-2xl text-brand-400">{description}</p>}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-950"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
