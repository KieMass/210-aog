import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateMinistry } from '@/app/actions/ministries';
import AdminPageHeader from '@/components/admin-page-header';
import MinistryForm from '@/components/forms/ministry-form';

export default async function EditMinistryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ministry = await prisma.ministry.findUnique({ where: { id } });

  if (!ministry) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader title="Edit Ministry" />
      <MinistryForm action={updateMinistry.bind(null, id)} ministry={ministry} />
    </div>
  );
}
