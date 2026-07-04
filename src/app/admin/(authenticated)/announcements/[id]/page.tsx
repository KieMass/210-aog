import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateAnnouncement } from '@/app/actions/announcements';
import AdminPageHeader from '@/components/admin-page-header';
import AnnouncementForm from '@/components/forms/announcement-form';

export default async function EditAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader title="Edit Announcement" />
      <AnnouncementForm action={updateAnnouncement.bind(null, id)} announcement={announcement} />
    </div>
  );
}
