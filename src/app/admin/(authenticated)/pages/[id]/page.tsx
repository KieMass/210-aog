import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updatePage } from '@/app/actions/pages';
import AdminPageHeader from '@/components/admin-page-header';
import PageForm from '@/components/forms/page-form';

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });

  if (!page) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader title="Edit Page" />
      <PageForm action={updatePage.bind(null, id)} page={page} />
    </div>
  );
}
