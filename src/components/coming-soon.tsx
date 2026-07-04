import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function ComingSoon({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <Sparkles className="h-6 w-6" />
      </span>
      <h2 className="mt-6 text-2xl font-bold text-brand-950">This page is on its way</h2>
      <p className="mx-auto mt-3 max-w-xl text-brand-400">{message}</p>
      <div className="mt-8">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
