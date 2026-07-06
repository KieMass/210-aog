import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { updateUser } from '@/app/actions/users';
import AdminPageHeader from '@/components/admin-page-header';
import UserForm from '@/components/forms/user-form';

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole('SUPER_ADMIN');
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    notFound();
  }

  return (
    <div>
      <AdminPageHeader title="Edit User" />
      <UserForm action={updateUser.bind(null, id)} user={user} />
    </div>
  );
}
