import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateSermon } from '@/app/actions/sermons';
import AdminPageHeader from '@/components/admin-page-header';
import SermonForm from '@/components/forms/sermon-form';

export default async function EditSermonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sermon = await prisma.sermon.findUnique({ where: { id } });

  if (!sermon) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader title="Edit Sermon" />
      <SermonForm action={updateSermon.bind(null, id)} sermon={sermon} />
    </div>
  );
}
