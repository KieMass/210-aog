import { Megaphone } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AnnouncementBanner() {
  const now = new Date();
  const announcement = await prisma.announcement.findFirst({
    where: {
      status: 'PUBLISHED',
      publishAt: { lte: now },
      OR: [{ expireAt: null }, { expireAt: { gt: now } }],
    },
    orderBy: [{ priority: 'desc' }, { publishAt: 'desc' }],
  });

  if (!announcement) return null;

  return (
    <div className="bg-accent-500 text-brand-950">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
        <Megaphone className="h-4 w-4 shrink-0" />
        <p>
          <span className="font-semibold">{announcement.title}</span>
          {' — '}
          {announcement.body}
        </p>
      </div>
    </div>
  );
}
