import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function CustomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });

  if (!page || page.status !== 'PUBLISHED') {
    notFound();
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-950">{page.title}</h1>
        <div className="mt-8 whitespace-pre-wrap leading-7 text-brand-400">{page.content}</div>
      </div>
    </section>
  );
}
